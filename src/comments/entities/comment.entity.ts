import { randomUUID } from "crypto";

export class Comment {
    readonly id:string;

    comment:string;   
    createdAt?:Date;

    constructor(props:Omit<Comment, 'id'>, id?:string ) {
        this.comment = props.comment;
        this.createdAt = props.createdAt;

        if(!id) {
            this.id = randomUUID();
        }
    }
}
