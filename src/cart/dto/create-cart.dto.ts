import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
  @ApiProperty({ description: "Cart creation date", example: "2024-10-04" })
  @IsString()
  date: string;

  @ApiProperty({
    description: "Current status of the cart",
    example: "pending",
  })
  @IsString()
  status: string;

  @ApiProperty({ description: "User ID", example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: "Order ID", example: 1 })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: "User wallet ID", example: 1 })
  @IsNumber()
  user_walletId: number;
}
