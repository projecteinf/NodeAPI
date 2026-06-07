import { getAllTracks, createTrack, updateTrack, deleteTrack, findTrackById } from "../services/trackService";
import { Request, Response } from "express";

export async function getTracksController(
  _req: Request,
  res: Response
): Promise<Response> {
  try {
    const tracks = await getAllTracks();

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
  try {
    const  id : string = req.params.id as string;

    const track = await findTrackById(id);

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
  try {
    const createdTrack = await createTrack(req.body);

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
  try {
    const  id : string = req.params.id as string;

    const updatedTrack = await updateTrack(id, req.body);

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
  try {
    const  id : string = req.params.id as string;

    const deleted = await deleteTrack(id);

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