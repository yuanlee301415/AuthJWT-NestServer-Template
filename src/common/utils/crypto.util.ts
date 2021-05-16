import {createHash} from "crypto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class CryptoUtil {
  encryptPassword(password: string): string {
    return createHash("sha256").update(password).digest("hex");
  }

  checkPassword(password: string, encryptedPassword: string): boolean {
    return this.encryptPassword(password) === encryptedPassword;
  }
}
