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
    const eventId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const event = await eventService.getEventById(eventId);

    res.status(event ? HTTP_STATUS.OK : HTTP_STATUS.NOT_FOUND).json(
      event
        ? { message: "Event retrieved", data: event }
        : { message: "Event not found" }
    );
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

export const updateEventHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const updatedEvent = await eventService.updateEvent(eventId, req.body);

    res.status(updatedEvent ? HTTP_STATUS.OK : HTTP_STATUS.NOT_FOUND).json(
      updatedEvent
        ? { message: "Event updated", data: updatedEvent }
        : { message: "Event not found" }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const isValidationError = message.includes("registrationCount") ? true : false;

    res.status(isValidationError ? HTTP_STATUS.BAD_REQUEST : HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: isValidationError ? `Validation error: ${message}` : message
    });
  }
};

export const deleteEventHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deleted = await eventService.deleteEvent(eventId);

    res.status(deleted ? HTTP_STATUS.OK : HTTP_STATUS.NOT_FOUND).json(
      deleted
        ? { message: "Event deleted" }
        : { message: "Event not found" }
    );
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};