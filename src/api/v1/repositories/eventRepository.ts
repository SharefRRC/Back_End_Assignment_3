import { db } from "../../../../config/firebaseConfig";
import { Event } from "../models/eventModel";

const collectionName = "events";

export const createEventDocument = async (event: Event): Promise<Event> => {
  await db.collection(collectionName).doc(event.id).set(event);
  return event;
};

export const getAllEventDocuments = async (): Promise<Event[]> => {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc) => doc.data() as Event);
};

export const getEventDocumentById = async (id: string): Promise<Event | null> => {
  const doc = await db.collection(collectionName).doc(id).get();
  return doc.exists ? (doc.data() as Event) : null;
};

export const updateEventDocument = async (id: string, payload: Partial<Event>): Promise<Event | null> => {
  const ref = db.collection(collectionName).doc(id);
  const existing = await ref.get();

  if (!existing.exists) {
    return null;
  }

  await ref.update(payload);
  const updated = await ref.get();
  return updated.data() as Event;
};

export const deleteEventDocument = async (id: string): Promise<boolean> => {
  const ref = db.collection(collectionName).doc(id);
  const existing = await ref.get();

  if (!existing.exists) {
    return false;
  }

  await ref.delete();
  return true;
};