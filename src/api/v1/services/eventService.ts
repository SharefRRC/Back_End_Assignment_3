import {
  createEventDocument,
  deleteEventDocument,
  getAllEventDocuments,
  getEventDocumentById,
  updateEventDocument
} from "../repositories/eventRepository";
import { CreateEventInput, Event, UpdateEventInput } from "../models/eventModel";

let eventCounter = 1;

const generateEventId = (): string => `evt_${String(eventCounter++).padStart(6, "0")}`;

export const createEvent = async (payload: CreateEventInput): Promise<Event> => {
  const timestamp = new Date().toISOString();

  const event: Event = {
    id: generateEventId(),
    name: payload.name,
    date: new Date(payload.date).toISOString(),
    capacity: payload.capacity,
    registrationCount: payload.registrationCount ?? 0,
    status: payload.status ?? "active",
    category: payload.category ?? "general",
    createdAt: timestamp,
    updatedAt: timestamp
  };

  return createEventDocument(event);
};

export const getAllEvents = async (): Promise<Event[]> => getAllEventDocuments();

export const getEventById = async (id: string): Promise<Event | null> => getEventDocumentById(id);

export const updateEvent = async (id: string, payload: UpdateEventInput): Promise<Event | null> => {
  const existing = await getEventDocumentById(id);

  if (!existing) {
    return null;
  }

  const capacity = payload.capacity ?? existing.capacity;
  const registrationCount = payload.registrationCount ?? existing.registrationCount;
  const invalidCount = registrationCount > capacity ? true : false;

  if (invalidCount) {
    throw new Error('"registrationCount" must be less than or equal to ref:capacity');
  }

  const updatedPayload: Partial<Event> = {
    ...payload,
    date: payload.date ? new Date(payload.date).toISOString() : existing.date,
    updatedAt: new Date().toISOString()
  };

  return updateEventDocument(id, updatedPayload);
};

export const deleteEvent = async (id: string): Promise<boolean> => deleteEventDocument(id);