import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateComfortDto {
  @ApiProperty({
    example: "Air Conditioning",
    description: "Name of the comfort feature",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: "Unikal stadium id ",
  })
  @IsNumber()
  stadiumId: number;
}
