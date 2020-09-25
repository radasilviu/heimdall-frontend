export interface ICode {
  code: string;
}

export class Code implements ICode {
  public constructor(
    public code: string
  ){}
}
