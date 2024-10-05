import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Media } from "./models/media.model";

@ApiTags("Medias")
@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({ summary: "Create new media photo" })
  @ApiResponse({
    status: 201,
    description: "Created successfully",
    type: Media,
  })
  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @ApiOperation({ summary: "Get all medias" })
  @ApiResponse({
    status: 200,
    description: "List of medias",
    type: [Media],
  })
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @ApiOperation({ summary: "Get a media by ID" })
  @ApiResponse({
    status: 200,
    description: "Returns a media by ID",
    type: Media,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.mediaService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a media by ID" })
  @ApiResponse({
    status: 200,
    description: "Media updated successfully",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @ApiOperation({ summary: "Delete a media by ID" })
  @ApiResponse({
    status: 200,
    description: "Media deleted successfully",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.mediaService.remove(+id);
  }
}
