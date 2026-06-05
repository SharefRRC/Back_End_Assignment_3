import { createEventSchema } from "../../src/api/v1/validation/eventValidation";

describe("createEventSchema", () => {
  it('should fail when "name" is missing', () => {
    const { error } = createEventSchema.validate({
      date: "2027-12-25T09:00:00.000Z",
      capacity: 200
    });

    expect(error?.details[0].message).toBe('"name" is required');
  });

  it('should fail when "name" is shorter than 3 characters', () => {
    const { error } = createEventSchema.validate({
      name: "AB",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 100
    });

    expect(error?.details[0].message).toBe('"name" length must be at least 3 characters long');
  });

  it('should fail when "capacity" is below 5', () => {
    const { error } = createEventSchema.validate({
      name: "Small Event",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 4
    });

    expect(error?.details[0].message).toBe('"capacity" must be greater than or equal to 5');
  });

  it('should apply default values for omitted optional fields', () => {
    const { error, value } = createEventSchema.validate({
      name: "ABC",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 100
    });

    expect(error).toBeUndefined();
    expect(value.registrationCount).toBe(0);
    expect(value.status).toBe("active");
    expect(value.category).toBe("general");
  });
});