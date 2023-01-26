import { randomUUID } from "crypto";

export class Comment {
    readonly id:string;

    comment:string;   
    createdAt?:Date;

    authorId:string;
    postId:string;

    constructor(props:Omit<Comment, 'id'>, id?:string) {
        this.comment = props.comment;
        this.createdAt = props.createdAt;
        this.authorId = props.authorId;
        this.postId = props.postId;

        if(!id) {
            this.id = randomUUID();
        }
    }
}
