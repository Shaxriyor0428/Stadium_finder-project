import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: "John",
    description: "Admin login name",
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: "https://t.me/john_doe",
    description: "Telegram link of the admin",
  })
  @IsString()
  tg_link: string;

  @ApiProperty({
    example: "https://example.com/photo.jpg",
    description: "Photo URL of the admin",
  })
  @IsString()
  photo: string;

  @ApiProperty({
    example: "securePassword123",
    description: "Password of the admin",
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: "securePassword123",
    description: "Confirmation of the admin's password",
  })
  @IsString()
  confirm_password: string;
}
