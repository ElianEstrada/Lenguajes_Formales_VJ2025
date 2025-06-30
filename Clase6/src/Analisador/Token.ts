export enum Type {
    UNKWON,
    COMMENT,
    COMMENT_MULTILINE,
    DIVISION
}

export class Token {

    private typeToken: Type;
    private lexeme: string;
    private row: number;
    private column: number;
    private typeTokenString: string;

    constructor(typeToke: Type, lexeme: string, row: number, column: number) {
        this.typeToken = typeToke;
        this.typeTokenString = Type[typeToke];
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }
}