import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateComfortDto {
  @ApiProperty({
    example: "Air Conditioning",
    description: "Name of the comfort feature",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
