export class MessageDTO {
    id: any;
    message: string;
    constructor({id,message}: {id: any, message: string}){
        this.id = id
        this.message = message
    }
}