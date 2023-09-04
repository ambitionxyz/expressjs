import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "../type/Repositories/IUseRepository";
import { BaseResDto } from "../dto/resDto/BaseResDto";
import UserRepository from "../repositories/UserRepository";
import { AuthResultDto } from "../dto/resDto/AuthResultDto";
import { ApiError } from "../utils/ApiErrors";
import httpStatus from "http-status";

class AuthenService {
  private _repository: IUserRepository = UserRepository;

  public authen = async (userLogin) => {
    // const { userNameOrEmailAddress, password } = req.body;
    // try {
    //   const exitstedUser = await this._repository.findOne({
    //     userName: userNameOrEmailAddress,
    //   });
    //   console.log({ exitstedUser });
    //   if (!exitstedUser) return res.status(500).json(LOGIN_FAILED);
    //   const checkPass = await this._repository.comparePassword(
    //     userNameOrEmailAddress as string,
    //     password as string
    //   );
    //   if (!checkPass) return res.status(500).json(LOGIN_FAILED);
    //   const accessToken = await this._repository.generateToken(
    //     userNameOrEmailAddress as string
    //   );
    //   return res.status(200).json({
    //     ...BaseResDto,
    //     result: {
    //       ...AuthResultDto,  
    //       accessToken,
    //       userId: exitstedUser.id,
    //     },
    //   });
    // } catch (error) {
    //   console.log("authen AuthenService error: ", error.message);
    //   next(error);
    // }
    // console.log({ userLogin });
    const { userNameOrEmailAddress, password } = userLogin;
    const exitstedUser = await this._repository.findOne({
      userName: userNameOrEmailAddress,
    });
    const checkPass = await this._repository.comparePassword(
      userNameOrEmailAddress as string,
      password as string
    );
    if (!exitstedUser || !checkPass) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password"
      );
    }
    const accessToken = await this._repository.generateToken(
      userNameOrEmailAddress as string
    );
    return {
      ...BaseResDto,
      result: {
        ...AuthResultDto,
        accessToken,
        userId: exitstedUser.id,
      },
    };
  };
}

export = new AuthenService();
