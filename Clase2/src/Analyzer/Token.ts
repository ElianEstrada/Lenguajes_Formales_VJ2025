enum Type {
    UNKNOW,
    PAR_OPEN,
    PAR_CLOSE,
    SEMICOLON,
    EQUAL,
    RESERVERD_WORD,
    NUMBER,
    STRING,
    COLON,
    ASSIGN
}

class Token {

    private row: number;
    private column: number;
    private lexeme: string;
    private typeToken: Type;
    private typeTokenString: string;

    constructor(typeToken: Type, lexeme: string, row: number, column: number){
        this.typeToken = typeToken;
        this.typeTokenString = Type[typeToken];
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }
}

export { Token, Type }