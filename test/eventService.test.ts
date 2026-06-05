import * as repository from "../src/api/v1/repositories/eventRepository";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent
} from "../src/api/v1/services/eventService";

jest.mock("../src/api/v1/repositories/eventRepository");

describe("eventService", () => {
  it("should create an event using repository", async () => {
    const mockEvent = {
      id: "evt_000001",
      name: "Tech Conference 2025",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 200,
      registrationCount: 50,
      status: "active",
      category: "conference",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z"
    };

    (repository.createEventDocument as jest.Mock).mockResolvedValue(mockEvent);

    const result = await createEvent({
      name: "Tech Conference 2025",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 200,
      registrationCount: 50,
      status: "active",
      category: "conference"
    });

    expect(repository.createEventDocument).toHaveBeenCalled();
    expect(result.name).toBe("Tech Conference 2025");
  });

  it("should get all events from repository", async () => {
    (repository.getAllEventDocuments as jest.Mock).mockResolvedValue([{ id: "evt_000001" }]);

    const result = await getAllEvents();

    expect(repository.getAllEventDocuments).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it("should get one event by id from repository", async () => {
    (repository.getEventDocumentById as jest.Mock).mockResolvedValue({ id: "evt_000001" });

    const result = await getEventById("evt_000001");

    expect(repository.getEventDocumentById).toHaveBeenCalledWith("evt_000001");
    expect(result).toEqual({ id: "evt_000001" });
  });

  it("should update an event using repository", async () => {
    (repository.getEventDocumentById as jest.Mock).mockResolvedValue({
      id: "evt_000001",
      capacity: 100,
      registrationCount: 10,
      date: "2027-12-25T09:00:00.000Z"
    });

    (repository.updateEventDocument as jest.Mock).mockResolvedValue({
      id: "evt_000001",
      name: "Updated Event"
    });

    const result = await updateEvent("evt_000001", { name: "Updated Event" });

    expect(repository.updateEventDocument).toHaveBeenCalled();
    expect(result).toEqual({ id: "evt_000001", name: "Updated Event" });
  });

  it("should delete an event using repository", async () => {
    (repository.deleteEventDocument as jest.Mock).mockResolvedValue(true);

    const result = await deleteEvent("evt_000001");

    expect(repository.deleteEventDocument).toHaveBeenCalledWith("evt_000001");
    expect(result).toBe(true);
  });
});