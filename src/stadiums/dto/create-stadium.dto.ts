import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsDate,
} from "class-validator";

export class CreateStadiumDto {
  @ApiProperty({
    example: "John Doe",
    description: "Contact person or entity",
  })
  @IsString()
  @IsNotEmpty()
  contact_with: string;

  @ApiProperty({
    example: "Olympic Stadium",
    description: "Name of the stadium",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "50000",
    description: "Stadium capacity or volume",
  })
  @IsString()
  @IsNotEmpty()
  volume: string;

  @ApiProperty({
    example: "Chilonzor 21",
    description: "Address of the stadium",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: "41.2995, 69.2401",
    description: "Geographical location of the stadium",
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: "2023-09-15",
    description: "Date when the stadium was built",
  })
  @IsDateString()
  @IsNotEmpty()
  buildAt: string;

  @ApiProperty({
    example: "08:00",
    description: "Opening time of the stadium",
  })
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({
    example: "22:00",
    description: "Closing time of the stadium",
  })
  @IsString()
  @IsNotEmpty()
  end_time: string;

  @ApiProperty({
    example: 1,
    description: "ID of the associated region",
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty({
    example: 2,
    description: "ID of the associated category",
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
