export enum Type {
    UNKNOW,
    PAR_OPEN,
    PAR_CLOSE,
    KEY_OPEN,
    KEY_CLOSE,
    BRA_OPEN,
    BRA_CLOSE,
    COLON,
    SEMICOLON,
    COMMA,
    STRING,
    NUMBER,
    RESERVERD_WORD
}

export class Token {

    private row: number;
    private column: number;
    private lexeme: string;
    private typeToken: Type;
    private typeTokenString: string;

    constructor(typeToken: Type, lexeme: string, row: number, column: number) {
        this.typeToken = typeToken;
        this.typeTokenString = Type[typeToken];
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }

    getLexeme(): string {
        return this.lexeme
    }

    getTypeToken(): Type {
        return this.typeToken;
    }

    getRow(): number {
        return this.row;
    }

    getColumn(): number {
        return this.column;
    }
}