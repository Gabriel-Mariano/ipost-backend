import { randomUUID } from 'node:crypto'

export class User {
    readonly id:string;

    name:string;
    email:string;
    password:string;
    avatar?:string;

    constructor(props:Omit<User, 'id'>, id?:string){
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.avatar = props.avatar;

        if(!id) {
            this.id = randomUUID();
        }
    }
}
