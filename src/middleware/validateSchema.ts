import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ApiError } from "../utils/ApiErrors";
import { IUser } from "../type/Models/IUser";
import { ITimesheet } from "../type/Models/ITimesheet";
export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let message = "";
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      message = err.details[0].message;
      // console.log();
      // res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message });
      next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, message));
    }
  };
};

export const Schema = {
  user: {
    create: Joi.object<IUser>({
      userName: Joi.string().required(),
      name: Joi.string().required(),
      emailAddress: Joi.string().required(),
      surname: Joi.string().required(),
      userCode: Joi.string().required(),
      password: Joi.string().required(),
    }).options({ allowUnknown: true }),
    update: Joi.object<IUser>({
      name: Joi.string().required(),
      emailAddress: Joi.string().required(),
      userCode: Joi.string().required(),
    }).options({ allowUnknown: true }),
  },
  timeSheet: {
    create: Joi.object<ITimesheet>({
      workingTime: Joi.number()
        .max(8 * 60)
        .required(),
    }).options({ allowUnknown: true }),
  },
};
