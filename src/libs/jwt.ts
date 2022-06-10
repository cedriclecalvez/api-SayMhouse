import { UserEntity } from "../modules/User/entity";


export class JwtService {
    private jwt;
    private secret;
    constructor(jwt: any, secret: string) {
        this.jwt = jwt;
        this.secret = secret;
    }

    async decodeToken(token: string) {
        return await this.jwt.verify(token, this.secret);
    }

    async generateAccessToken(user: UserEntity) {
        return await this.jwt.sign({...user}, this.secret, {expiresIn:'5m'});
    }
    
    async generateRefreshToken(userId:any) {
        return await this.jwt.sign({id:userId}, this.secret, {expiresIn:'30d'});
    }
}

