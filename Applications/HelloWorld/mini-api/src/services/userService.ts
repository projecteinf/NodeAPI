import { getConnectionPool, sql } from "../config/database";
import { ConnectionPool, IResult } from "mssql";
import bcrypt from "bcrypt";
import { CreateUserInput } from "../types/user/createUser";
import { UserDto } from "../types/user/userDTO";
import { BadRequestError } from "../types/error/custom/notFoundError";
import { LoginUserInput } from "../types/user/loginUser";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../types/error/custom/unauthorizedError";



export async function registerUser(input: CreateUserInput): Promise<UserDto> {
  const pool: ConnectionPool = await getConnectionPool();

  // Comprovar si l'username ja existeix
    const userCheckUsername: IResult<{ id: string }> = await pool
    .request()
    .input("username", sql.NVarChar(256), input.username)
    .query<{ id: string }>("SELECT id FROM Users WHERE username = @username");

  if (userCheckUsername.recordset.length > 0) {
    throw new BadRequestError("An account with this username already exists");
  }

  const userCheckEmail: IResult<{ id: string }> = await pool
    .request()
    .input("email", sql.NVarChar(256), input.email)
    .query<{ id: string }>("SELECT id FROM Users WHERE email = @email");

  if (userCheckEmail.recordset.length > 0) {
    throw new BadRequestError("An account with this email already exists");
  }

  // 2. Generar el Hash de la contrasenya de forma asíncrona
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(input.password, saltRounds);

  // 3. Insertar l'usuari a la Base de Dades
  const insertResult: IResult<{ id: string, email: string }> = await pool
    .request()
    .input("username", sql.NVarChar(100), input.username)
    .input("email", sql.NVarChar(255), input.email)
    .input("passwordHash", sql.NVarChar(60), hashedPassword)
    .query<{ id: string, email: string }>(`
      INSERT INTO Users (username, email, password)
      OUTPUT CONVERT(NVARCHAR(36), INSERTED.id) AS id, INSERTED.email
      VALUES (@username, @email, @passwordHash);
    `);


  const createdId:string = insertResult.recordset[0].id;

  const createdUser:UserDto | null = await findUserById(createdId);

  if (!createdUser) {
    throw new Error("User was created but could not be retrieved.");
  }

  return createdUser;
}


export async function loginUser(input: LoginUserInput): Promise<{ token: string, user: UserDto }> {
  const pool = await getConnectionPool();
  
  // 1. Obtenir l'usuari i el seu password xifrat
  const result = await pool
    .request()
    .input("email", sql.NVarChar(256), input.email)
    .query(`SELECT id, username, email, password AS passwordHash FROM Users WHERE email = @email`);
    
  const userRow = result.recordset[0];
  if (!userRow) {
    throw new UnauthorizedError("Invalid credentials"); // Error genèric per seguretat
  }

  // 2. Comparar contrasenyes (No xifrada vs Xifrada en BD)
  const isPasswordValid = await bcrypt.compare(input.password, userRow.passwordHash);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  // 3. Generar el Token utilitzant les variables d'entorn
  const jwtSecret:string | undefined = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET missing");

  const expiresIn: string = process.env.JWT_EXPIRES_IN || "1h"; // Si no s'especifica JWT_EXPIRES_IN, s'estableix la caducitat en 1 hora

  const payload: JwtPayload = { id: userRow.id as string, username: userRow.username as string,  email: userRow.email as string };
  
  // La funció jwt.sign() s'encarrega d'ajuntar el payload, el secret i les opcions
  const token = jwt.sign(
    payload, jwtSecret as string, { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }
  );

  const user:UserDto = await findUserById(userRow.id as string) as UserDto;

  return { token, user: user };
}



export async function findUserById(
  id: string
): Promise<UserDto | null> {
  const pool:ConnectionPool = await getConnectionPool();

  const result:IResult<UserDto> = await pool
    .request()
    .input("id", sql.UniqueIdentifier, id)
    .query<UserDto>(`
      SELECT
        Users.id,
        Users.username,
        Users.email
      FROM Users
      WHERE Users.id = @id;
    `);

  return result.recordset[0] ?? null;
}