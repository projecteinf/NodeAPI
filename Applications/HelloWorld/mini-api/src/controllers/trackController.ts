import { getAllTracks, createTrack, updateTrack, deleteTrack, findTrackById } from "../services/trackService";
import { Request, Response } from "express";
import { TrackDto } from "../types/track/trackDTO";
import { trackIdParamsSchema } from "../validators/paramId";
import { createTrackSchema } from "../validators/track";


export async function getTracksController(
  _req: Request,
  res: Response
): Promise<Response> {
  try {
    const tracks:TrackDto[] = await getAllTracks();

    return res.status(200).json(tracks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function getTrackByIdController(
  req: Request,
  res: Response
): Promise<Response> {
  
    const paramsValidation = trackIdParamsSchema.safeParse(req.params);

    if (!paramsValidation.success) {
      return res.status(400).json({
        message: "Invalid track id"
      });
    }

    
    const  id : string = paramsValidation.data.id;
    try {
      const track:TrackDto | null = await findTrackById(id);

      if (!track) {
        return res.status(404).json({
          message: "Track not found"
        });
      }

      return res.status(200).json(track);
      
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Internal server error"
      });
  }
}

export async function createTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  const bodyValidation = createTrackSchema.safeParse(req.body);
	
	if (!bodyValidation.success) {
	  return res.status(400).json({
		message: "Invalid track data"
	  });
	}
	try {
	    const createdTrack: TrackDto = await createTrack(bodyValidation.data);
	
	    return res.status(201).json(createdTrack);
	  } catch (error) {
	    console.error(error);
	
	    return res.status(500).json({
	      message: "Internal server error"
	    });
	  }
}

export async function updateTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  
  const paramsValidation = trackIdParamsSchema.safeParse(req.params);

  if (!paramsValidation.success) {
    return res.status(400).json({
      message: "Invalid track id"
    });
  }

  const  id : string = paramsValidation.data.id;
  
  const bodyValidation = createTrackSchema.safeParse(req.body);
	
	if (!bodyValidation.success) {
	  return res.status(400).json({
		message: "Invalid track data"
	  });
	}
 
  try {

    const updatedTrack:TrackDto | null = await updateTrack(id, bodyValidation.data);

    if (!updatedTrack) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(200).json(updatedTrack);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

export async function deleteTrackController(
  req: Request,
  res: Response
): Promise<Response> {
  
    
  const paramsValidation = trackIdParamsSchema.safeParse(req.params);

  if (!paramsValidation.success) {
    return res.status(400).json({
      message: "Invalid track id"
    });
  }

  const  id : string = paramsValidation.data.id;

  try {
    const deleted:boolean = await deleteTrack(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Track not found"
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}