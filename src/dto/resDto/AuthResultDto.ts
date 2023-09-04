import { IAuthResultDto } from "../../type/IAuthResultDto";
import { TOKEN_EXPIRE } from "../../constants/index";

export const AuthResultDto: IAuthResultDto = {
  accessToken: null,
  encryptedAccessToken: "thisisomerandomtext",
  expireInSeconds: TOKEN_EXPIRE,
  userId: null,
};
