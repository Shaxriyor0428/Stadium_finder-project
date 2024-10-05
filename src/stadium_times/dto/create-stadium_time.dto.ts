import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateStadiumTimeDto {
  @ApiProperty({
    example: "12:02:30",
    description: "Stadium start time (HH:MM:SS format)",
  })
  @IsString()
  start_time: string;

  @ApiProperty({
    example: "14:02:30",
    description: "Stadium end time (HH:MM:SS format)",
  })
  @IsString()
  end_time: string;

  @ApiProperty({
    example: 145,
    description: "Stadium price in the local currency",
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 1,
    description: "Day of the week (1 for Monday, 7 for Sunday)",
  })
  @IsNumber()
  day: number;

  @ApiProperty({
    example: 1,
    description: "Unique ID of the stadium",
  })
  @IsNumber()
  stadiumId: number;
}
