import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { BoardDTO } from './board.dto';
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }
  getBoardByID(id: string): Board {
    const found = this.boards.find((board) => board.id === id);
    if (!found) {
      throw new NotFoundException(`cnat find bord with id ${id}`);
    }
    return found;
  }

  createBoard(createBoardDto: BoardDTO.Request.createBoarde) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardByID(id);
    board.status = status;
    return board;
  }
  deleteBoard(id: string): void {
    const found = this.getBoardByID(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }
}
