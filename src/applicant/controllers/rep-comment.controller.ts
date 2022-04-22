import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RestAuthGuard } from 'src/auth/guards/local.guard';
import { ReqWithUser } from 'src/typings';
import { CreateRepCommentDTO, UpdateRepCommentDTO } from '../dto/report.dto';
import { RepCommentService } from '../services/rep-comment.service';

@Controller('api/v3/rep-comment')
export class RepCommentController {
  constructor(private readonly commentService: RepCommentService) {}
  @UseGuards(RestAuthGuard)
  @Post()
  create(@Body() data: CreateRepCommentDTO, @Req() req: ReqWithUser) {
    return this.commentService.create(data, req.user);
  }
  @UseGuards(RestAuthGuard)
  @Put()
  update(data: UpdateRepCommentDTO) {
    return this.commentService.update(data);
  }
  @Get()
  findAll() {
    return this.commentService.findAll();
  }
  @Get('report/:id')
  findByReport(@Param('id') id: string) {
    return this.commentService.findByReport(id);
  }
  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }
  @Delete('single/:id')
  delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
  @Post('seed')
  async seed() {
    return await this.commentService.seedRepComment();
  }
}
