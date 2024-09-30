import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StadiumsService } from "./stadiums.service";
import { CreateStadiumDto } from "./dto/create-stadium.dto";
import { UpdateStadiumDto } from "./dto/update-stadium.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Stadium } from "./models/stadium.model";

@ApiTags("Stadiums")
@Controller("stadiums")
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @ApiOperation({ summary: "Create new Stadium" })
  @ApiResponse({
    status: 201,
    description: "Created new stadium",
    type: Stadium,
  })
  @Post()
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumsService.create(createStadiumDto);
  }

  @ApiOperation({ summary: "Get all Stadiums" })
  @ApiResponse({
    status: 200,
    description: "List of stadiums",
    type: [Stadium],
  })
  @Get()
  findAll() {
    return this.stadiumsService.findAll();
  }

  @ApiOperation({ summary: "Get stadium by Id" })
  @ApiResponse({
    status: 200,
    description: "Stadium retrieved",
    type: Stadium,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.stadiumsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update stadium by Id" })
  @ApiResponse({
    status: 200,
    description: "Stadium updated",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumsService.update(+id, updateStadiumDto);
  }

  @ApiOperation({ summary: "Delete stadium by Id" })
  @ApiResponse({
    status: 200,
    description: "Stadium Deleted",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.stadiumsService.remove(+id);
  }
}
