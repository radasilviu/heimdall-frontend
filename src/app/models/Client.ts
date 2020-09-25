export interface IClient {
    clientName:string
}
export class Client implements IClient{
    public constructor(
        public clientName: string
      ){}
}
