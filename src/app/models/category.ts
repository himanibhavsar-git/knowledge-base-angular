export class Content {
    text: string;
    categoryId: number;
}

export class ContentAttachment {
    attachment: string;
    categoryId: number;
}

export class CategoryList {
    attachments: string[];
    id: number;
    text: string;
    name: string;
}
