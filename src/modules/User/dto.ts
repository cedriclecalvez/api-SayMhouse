
class UserDTO {
    
    public id;
    public email;

    constructor({id, email} : {id: number, email: string}) {
        this.id = id;
        this.email = email;
       
    }

}

export default UserDTO;