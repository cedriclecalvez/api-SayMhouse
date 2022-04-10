export default class RoomDTO {
    id: any;
    name: string;
    constructor({id,name}: {id: any, name: string}){
        this.id = id
        this.name = name
    }
}