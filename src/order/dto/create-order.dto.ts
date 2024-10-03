import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({
    example: "This is a sample order description",
    description: "Description of the order",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1,
    description: "ID of the user placing the order",
  })
  @IsNumber()
  userId: number;
}
