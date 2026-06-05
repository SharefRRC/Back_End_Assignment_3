import request from "supertest";
import app from "../../src/app";

jest.mock("../../src/api/v1/services/eventService", () => ({
  createEvent: jest.fn().mockResolvedValue({
    id: "evt_000001",
    name: "Tech Conference 2025",
    date: "2027-12-25T09:00:00.000Z",
    capacity: 200,
    registrationCount: 50,
    status: "active",
    category: "conference",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  }),
  getAllEvents: jest.fn().mockResolvedValue([]),
  getEventById: jest.fn().mockResolvedValue(null),
  updateEvent: jest.fn().mockResolvedValue(null),
  deleteEvent: jest.fn().mockResolvedValue(false)
}));

describe("app routes", () => {
  it("should return health response", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
  });

  it("should create an event", async () => {
    const response = await request(app).post("/api/v1/events").send({
      name: "Tech Conference 2025",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 200,
      registrationCount: 50,
      status: "active",
      category: "conference"
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Event created");
  });
});