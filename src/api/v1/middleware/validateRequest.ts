import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export const validateRequest =
  (schema: ObjectSchema, source: "body" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: true,
      stripUnknown: true
    });

    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: `Validation error: ${error.details[0].message}`
      });
      return;
    }

    req[source] = value;
    next();
  };