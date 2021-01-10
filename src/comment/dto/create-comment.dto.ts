import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(2 ** 10)
  readonly content: string;
}
