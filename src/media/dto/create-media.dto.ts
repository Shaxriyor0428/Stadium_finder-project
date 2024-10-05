import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateMediaDto {
  @ApiProperty({
    example: "static/stadium.jpg",
    description: "Stadium photo ",
  })
  @IsString()
  photo: string;

  @ApiProperty({
    example: "This is a photo of the main stadium.",
    description: "Description of the stadium photo",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 1,
    description: "Unique ID of the stadium",
  })
  @IsNumber()
  stadiumId: number;
}
