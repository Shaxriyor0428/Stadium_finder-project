import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ComfortService } from "./comfort.service";
import { CreateComfortDto } from "./dto/create-comfort.dto";
import { UpdateComfortDto } from "./dto/update-comfort.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Comfort")
@Controller("comfort")
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @ApiOperation({ summary: "Create new Comfort" })
  @ApiResponse({
    status: 201,
    description: "Created comfort",
  })
  @Post()
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }

  @ApiOperation({ summary: "Get all Comforts" })
  @ApiResponse({
    status: 200,
    description: "List of all comforts",
  })
  @Get()
  findAll() {
    return this.comfortService.findAll();
  }

  @ApiOperation({ summary: "Get Comfort by ID" })
  @ApiResponse({
    status: 200,
    description: "Comfort found",
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.comfortService.findOne(id);
  }

  @ApiOperation({ summary: "Update Comfort by ID" })
  @ApiResponse({
    status: 200,
    description: "Comfort updated",
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateComfortDto: UpdateComfortDto
  ) {
    return this.comfortService.update(id, updateComfortDto);
  }

  @ApiOperation({ summary: "Delete Comfort by ID" })
  @ApiResponse({
    status: 200,
    description: "Comfort deleted",
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.comfortService.remove(id);
  }
}
