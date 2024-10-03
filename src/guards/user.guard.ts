import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const autHeader = req.headers.authorization;

    if (!autHeader) {
      throw new UnauthorizedException("Unauthorized user");
    }
    const [bearer, token] = autHeader.split(" ");
    // console.log(token);

    if (bearer != "Bearer" || !token) {
      throw new UnauthorizedException("Unauthorized user");
    }
    let payload: any;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException({
        message: "Token not passed verification",
        error,
      });
    }
    console.log(payload);

    req.user = payload;

    return true;
  }
}
