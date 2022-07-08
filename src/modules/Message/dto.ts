export class MessageDTO {
    id: any;
    contain: string;
    constructor({id,contain}: {id: any, contain: string}){
        this.id = id
        this.contain = contain
    }
}