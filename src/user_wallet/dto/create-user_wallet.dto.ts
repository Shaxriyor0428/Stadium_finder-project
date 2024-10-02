import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserWalletDto {
  @ApiProperty({
    example: "stadium card",
    description: "User wallet name",
  })
  @IsString()
  @IsNotEmpty()
  wallet: string;

  @ApiProperty({
    example: 1,
    description: "User ID which is connected to the user",
  })
  @IsNumber()
  userId: number;
}
