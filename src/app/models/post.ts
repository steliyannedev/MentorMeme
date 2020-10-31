export interface IPost {
    author_id: string;
    author_name: string;
    created_on: string;
    img_url: string;
    number_of_comments: number;
    post_dislikes: number;
    post_id: number;
    post_likes: number;
    post_title: string;
    sections: string;
}

export class Post implements IPost {
    author_id: string;
    author_name: string;
    created_on: string;
    img_url: string;
    number_of_comments: number;
    post_dislikes: number;
    post_id: number;
    post_likes: number;
    post_title: string;
    sections: string;

    constructor(params: IPost) {
        this.author_id = params.author_id
        this.author_name = params.author_name
        this.created_on = params.created_on
        this.img_url = params.img_url
        this.number_of_comments = params.number_of_comments
        this.post_dislikes = params.post_dislikes
        this.post_likes = params.post_likes
        this.post_id = params.post_id
        this.post_title = params.post_title
        this.sections = params.sections
    }
}