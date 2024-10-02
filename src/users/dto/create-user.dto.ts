import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Jon Doe",
    description: "User full name",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "Jon@gmail.com",
    description: "User email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "+9989316363636",
    description: "User phone number",
  })
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: "https://t.me/bobur_eshmatov",
    description: "User Telegram link",
  })
  @IsOptional()
  @IsString()
  tg_link: string;

  @ApiProperty({
    example: "said1234",
    description: "User password",
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "said1234",
    description: "User confirm password",
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: "static/user1.jpg",
    description: "User photo",
  })
  @IsOptional()
  @IsString()
  photo: string;
}
