import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: "sport",
    description: "Category name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsInt()
  parentId?: number;
}
