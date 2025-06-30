enum Type {
    UNKWON,
    RESERVED_WORD,
    NUMBER,
    STRING,
    KEY_OPEN,
    KEY_CLOSE,
    PAR_OPEN,
    PAR_CLOSE,
    BRACKETS_OPEN,
    BRACKETS_CLOSE,
    STATS,
    COLON,
    EQUAL,
    SEMICOLON
}

class Token {

    private row: number;
    private column: number;
    private lexeme: string;
    private typeToken: Type;
    private typeTokenName: string;

    constructor(typeToken: Type, lexeme: string, row: number, column: number) {
        this.typeToken = typeToken;
        this.typeTokenName = Type[typeToken];
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }

    getLexeme(): string {
        return this.lexeme;
    }

    getNumberType(): Type {
        return this.typeToken;
    }

    getType(): string {
        return this.typeTokenName;
    }

    getRow(): number {
        return this.row;
    }

    getColumn(): number {
        return this.column;
    }
}

export {Token, Type}