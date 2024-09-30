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
import { DistrictService } from "./district.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { District } from "./models/district.model";

@ApiTags("District")
@Controller("district")
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: "Create new District" })
  @ApiResponse({
    status: 201,
    description: "Created district",
    type: District,
  })
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: "Get all districts" })
  @ApiResponse({
    status: 200,
    description: "All districts have been retrieved",
    type: [District],
  })
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: "Retrieve a District by ID" })
  @ApiResponse({
    status: 200,
    description: "District details retrieved successfully.",
    type: District,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a District by ID" })
  @ApiResponse({
    status: 200,
    description: "The district has been successfully updated.",
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateDistrictDto: UpdateDistrictDto
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: "Delete a District by ID" })
  @ApiResponse({
    status: 200,
    description: "District has been successfully deleted.",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.districtService.remove(+id);
  }
}
