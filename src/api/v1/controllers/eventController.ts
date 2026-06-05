import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import * as eventService from "../services/eventService";

export const createEventHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Event created",
      data: event
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

export const getAllEventsHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json({
      message: "Events retrieved",
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

export const getEventByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await eventService.getEventById(req.params.id);
    const statusCode = event ? HTTP_STATUS.OK : HTTP_STATUS.NOT_FOUND;
    const payload = event
      ? { message: "Event retrieved", data: event }
      : { message: "Event not found" };

    res.status(statusCode).json(payload);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

export const updateEventHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
    const statusCode = updatedEvent ? HTTP_STATUS.OK : HTTP_STATUS.NOT_FOUND;
    const payload = updatedEvent
      ? { message: "Event updated", data: updatedEvent }
      : { message: "Event not found" };

    res.status(statusCode).json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const statusCode = message.includes("registrationCount")
      ? HTTP_STATUS.BAD_REQUEST
      : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
      message: statusCode === HTTP_STATUS.BAD_REQUEST ? `Validation error: ${message}` : message
    });
  }
};

export const deleteEventHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await eventService.deleteEvent(req.params.id);
    const statusCode = deleted ? HTTP_STATUS.OK : HTTP_STATUS.NOT_FOUND;
    const payload = deleted
      ? { message: "Event deleted" }
      : { message: "Event not found" };

    res.status(statusCode).json(payload);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};