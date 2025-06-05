enum Type {
    UNKNOW,
    PAR_OPEN,
    PAR_CLOSE,
    SEMICOLON,
    EQUAL,
    RESERVERD_WORD,
    NUMBER,
    STRING
}

class Token {

    private row: number;
    private column: number;
    private lexeme: string;
    private typeToken: Type;

    constructor(typeToken: Type, lexeme: string, row: number, column: number){
        this.typeToken = typeToken;
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }
}

export { Token, Type }