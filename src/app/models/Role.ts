export interface IRole {
    name:string
}
export class Role implements IRole{
    public constructor(
        public name: string
      ){}
}
