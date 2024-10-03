import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const autHeader = req.headers.authorization;

    if (!autHeader) {
      throw new UnauthorizedException("Unauthorized: No token provided");
    }

    const [bearer, token] = autHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException("Unauthorized: Invalid token format");
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException({
        message: "Unauthorized: Token verification failed",
        error,
      });
    }

    if (!payload.is_creator) {
      throw new BadRequestException("Access denied: Only creators are allowed");
    }

    console.log("Creator payload: ", payload);
    req.admin = payload;

    return true;
  }
}
