import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StadiumTimesService } from "./stadium_times.service";
import { CreateStadiumTimeDto } from "./dto/create-stadium_time.dto";
import { UpdateStadiumTimeDto } from "./dto/update-stadium_time.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StadiumTime } from "./models/stadium_time.model";

@ApiTags("Stadium-times")
@Controller("stadium-times")
export class StadiumTimesController {
  constructor(private readonly stadiumTimesService: StadiumTimesService) {}

  @ApiOperation({ summary: "Create new stadium time" })
  @ApiResponse({
    status: 201,
    description: "Created new stadium time",
    type: StadiumTime,
  })
  @Post()
  create(@Body() createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimesService.create(createStadiumTimeDto);
  }

  @ApiOperation({ summary: "Get all stadium times" })
  @ApiResponse({
    status: 200,
    description: "List of stadium times",
    type: [StadiumTime],
  })
  @Get()
  findAll() {
    return this.stadiumTimesService.findAll();
  }

  @ApiOperation({ summary: "Get a stadium by Id" })
  @ApiResponse({
    status: 200,
    description: "Returns a stadium time by Id",
    type: StadiumTime,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.stadiumTimesService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a stadium by Id" })
  @ApiResponse({
    status: 200,
    description: "successfully updated",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateStadiumTimeDto: UpdateStadiumTimeDto
  ) {
    return this.stadiumTimesService.update(+id, updateStadiumTimeDto);
  }

  @ApiOperation({ summary: "Delete a stadium by Id" })
  @ApiResponse({
    status: 200,
    description: "successfully deleted",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.stadiumTimesService.remove(+id);
  }
}
