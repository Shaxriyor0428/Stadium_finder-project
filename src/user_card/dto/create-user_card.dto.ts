import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateUserCardDto {
  @ApiProperty({
    example: "HUMO",
    description: "Name of card",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "+998969696655",
    description: "Phone number connected to your card",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: "9860 3221 5566 3365",
    description: "Card number",
  })
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @ApiProperty({
    example: "2025",
    description: "Card expiration year",
  })
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty({
    example: "02",
    description: "Card expiration month",
  })
  @IsString()
  @IsNotEmpty()
  month: string;

  @ApiProperty({
    example: false,
    description: "Is the card active?",
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "Is this the main card?",
  })
  @IsOptional()
  @IsBoolean()
  is_main: boolean;

  @IsNumber()
  userId: number;
}
