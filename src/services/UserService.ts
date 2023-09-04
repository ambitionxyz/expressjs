import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "../type/Repositories/IUseRepository";
import { IUserDecodeToken } from "../type/IUserDecodeToken";
import UserRepository from "../repositories/UserRepository";
import ProjectRepository from "../repositories/ProjectRepository";
import { UserResDTO } from "../dto/resDto/UserResDto";
import dotenv from "dotenv";
import { IUser } from "../type/Models/IUser";
import { INVALID_TOKEN, baseError } from "../dto/resDto/BaseError";
import User from "../model/user";
import { BaseResDto } from "../dto/resDto/BaseResDto";
import { ApiError } from "../utils/ApiErrors";
import httpStatus from "http-status";
import RoleRepository from "../repositories/RoleRepository";
import { UNIQUE_TEXT_FIELD_USER } from "../constants";
dotenv.config();

class UserService {
  private _repository: IUserRepository = UserRepository;
  public create = async (userInput) => {
    const existingUser = await this._repository.findByUserNameEmail(
      userInput.userName,
      userInput.emailAddress
    );
    if (existingUser) {
      let message = "is already taken.";
      if (Object.keys(existingUser)[0] === "userName")
        message = `User name '${existingUser.userName}' ` + message;
      else message = `Email address '${existingUser.emailAddress}' ` + message;
      throw new ApiError(httpStatus.CONFLICT, message);
    }
    const newUser = new User(userInput);
    const result = await this._repository.create(newUser);
    return {
      ...BaseResDto,
      result,
    };
  };

  public getUserLoginInfo = async (req) => {
    if (req.headers["authorization"] === undefined) return UserResDTO;
    const token = req.headers["authorization"].split(" ")[1];
    const { id }: any = await jwt.verify(token, process.env.JWT_SECRET);
    const user: IUser = await this._repository.findOne({ id: id });

    if (!user)
      throw new ApiError(httpStatus.BAD_REQUEST, "Your request is not valid!");
    return {
      ...UserResDTO,
      result: {
        ...UserResDTO.result,
        user,
      },
    };
  };

  public getAllPagging = async (filter) => {
    const { filterItems, maxResultCount, skipCount, searchText } = filter;
    const result = await this._repository.filterUserPagging(
      filterItems,
      maxResultCount,
      skipCount,
      searchText
    );
    return {
      ...BaseResDto,
      result,
    };
  };

  public allUserNotPagging = async () => {
    const result = await this._repository.allUserNotPagging();
    return {
      ...BaseResDto,
      result,
    };
  };
  public getAllManager = async () => {
    const result = await this._repository.getAllManager();
    return {
      ...BaseResDto,
      result,
    };
  };

  public get = async (query) => {
    const userId: number = query.Id;
    const result = await this._repository.getUserById(userId);
    return {
      ...BaseResDto,
      result,
    };
  };
  public updateUser = async (query) => {
    const { id, ...update } = query;
    // if (
    //   this._repository.checkDuplicate(
    //     { emailAddress: update.emailAddress },
    //     id
    //   ) !== null
    // ) {
    //   throw new ApiError(httpStatus.CONFLICT, "user id exist");
    // }
    const result = await this._repository.update(id, update);
    return {
      ...BaseResDto,
      result,
    };
  };
  public findAll = async () => {
    const result = await this.findAll();
    return {
      ...BaseResDto,
      result,
    };
  };
  public deactiveUser = async (idQuery) => {};
  public deleteUser = async (idQuery): Promise<void> => {
    const checkUserIsInProject = await ProjectRepository.checkInProject({
      "users.userId": idQuery.Id,
    });
    if (checkUserIsInProject) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Can't delete user is in project"
      );
    }

    await this._repository.deleteUser(idQuery);
  };
  public getRoles = async () => {
    const result = await RoleRepository.getAll();
    return {
      ...BaseResDto,
      result: {
        items: result,
      },
    };
  };
}

export = new UserService();
