import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RegionService } from "./region.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Region } from "./models/region.model";

@ApiTags("Regions")
@Controller("region")
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: "Create new Regions" })
  @ApiResponse({
    status: 201,
    description: "Created new region",
    type: Region,
  })
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: "Get all regions" })
  @ApiResponse({
    status: 200,
    description: "List of regions",
    type: [Region],
  })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: "Get region by Id" })
  @ApiResponse({
    status: 200,
    description: "Found region",
    type: Region,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: "Update region by Id" })
  @ApiResponse({
    status: 200,
    description: "Region updated",
    type: Region,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: "Delete region by Id" })
  @ApiResponse({
    status: 200,
    description: "Region deleted",
    type: Region,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.regionService.remove(+id);
  }
}
