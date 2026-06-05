import { Router } from "express";
import {
  createEventHandler,
  deleteEventHandler,
  getAllEventsHandler,
  getEventByIdHandler,
  updateEventHandler
} from "../controllers/eventController";
import { validateRequest } from "../middleware/validateRequest";
import { createEventSchema, eventIdSchema, updateEventSchema } from "../validation/eventValidation";

const router = Router();

router.post("/", validateRequest(createEventSchema), createEventHandler);
router.get("/", getAllEventsHandler);
router.get("/:id", validateRequest(eventIdSchema, "params"), getEventByIdHandler);
router.put("/:id", validateRequest(eventIdSchema, "params"), validateRequest(updateEventSchema), updateEventHandler);
router.delete("/:id", validateRequest(eventIdSchema, "params"), deleteEventHandler);

export default router;