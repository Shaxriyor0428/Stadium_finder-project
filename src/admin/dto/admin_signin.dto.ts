import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AdminSignInDto {
  @ApiProperty({
    example: "John",
    description: "Admin login name",
  })
  @IsString()
  login: string;

  @ApiProperty({
    example: "1234",
    description: "Admin password",
  })
  @IsString()
  password: string;
}
