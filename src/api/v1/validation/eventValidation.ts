import Joi from "joi";

const statusValues = ["active", "cancelled", "completed"];
const categoryValues = ["conference", "workshop", "meetup", "seminar", "general"];

export const createEventSchema = Joi.object({
  name: Joi.string().min(3).required(),
  date: Joi.date().iso().greater("now").required(),
  capacity: Joi.number().integer().min(5).required(),
  registrationCount: Joi.number().integer().min(0).max(Joi.ref("capacity")).default(0),
  status: Joi.string().valid(...statusValues).default("active"),
  category: Joi.string().valid(...categoryValues).default("general")
});

export const updateEventSchema = Joi.object({
  name: Joi.string().min(3),
  date: Joi.date().iso().greater("now"),
  capacity: Joi.number().integer().min(5),
  registrationCount: Joi.number().integer().min(0),
  status: Joi.string().valid(...statusValues),
  category: Joi.string().valid(...categoryValues)
})
  .custom((value, helpers) => {
    const hasCapacity = value.capacity !== undefined;
    const hasRegistrationCount = value.registrationCount !== undefined;
    const invalid = hasCapacity && hasRegistrationCount && value.registrationCount > value.capacity ? true : false;

    return invalid
      ? helpers.error("any.invalid", {
          message: '"registrationCount" must be less than or equal to ref:capacity'
        })
      : value;
  })
  .messages({
    "any.invalid": "{{#message}}"
  });

export const eventIdSchema = Joi.object({
  id: Joi.string().trim().min(3).required()
});