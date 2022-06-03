import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { stat } from 'fs';
import { BoardStatusValidationPipe } from './board-status-vaildation.pipe';
import { BoardDTO } from './board.dto';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
@ApiTags('board')
@Controller('boards')
export class BoardsController {
  constructor(private boraderService: BoardsService) {}
  @Get()
  getAllBoard(): Board[] {
    return this.boraderService.getAllBoards();
  }
  @Get('/:id')
  getBoadByID(@Param('id') id: string) {
    return this.boraderService.getBoardByID(id);
  }

  @Post()
  crateBoard(@Body() createBoardDto: BoardDTO.Request.createBoarde): Board {
    return this.boraderService.createBoard(createBoardDto);
  }
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boraderService.updateBoardStatus(id, status);
  }
  @Delete('/:id')
  deleteBoard(@Param('id') id: string) {
    this.boraderService.deleteBoard(id);
  }
}
