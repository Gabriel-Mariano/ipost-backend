import { randomUUID } from "crypto";
import { User } from "src/users/entities/user.entity";

export class Post {
    readonly id:string;

    title:string;
    content?:string;
    createdAt?:Date;
    file?:string;

    authorId:string;

    constructor(props:Omit<Post, 'id'>, id?:string){
        this.title = props.title;
        this.content = props.content;
        this.createdAt = props.createdAt;
        this.authorId = props.authorId;
        this.file = props.file;

        if(!id) {
            this.id = randomUUID();
        }
    }
}
