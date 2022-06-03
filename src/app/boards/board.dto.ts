/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export namespace BoardDTO {
  export namespace Request {
    export class createBoarde {
      @IsNotEmpty({ message: '제목을 입력해 주세요.' })
      title: string;
      @IsNotEmpty({ message: '내용을 입력해 주세요.' })
      description: string;
    }
  }
  export namespace Response {}
}
