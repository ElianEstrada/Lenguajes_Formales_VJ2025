import { Token, Type } from "./Token";

class LexicalAnalyzer {

    private row: number;
    private column: number;
    private auxChar: string;
    private state: number;
    private tokenList: Token[];
    private errorList: Token[];

    constructor() {
        this.row = 1;
        this.column = 1;
        this.auxChar = '';
        this.state = 0;
        this.tokenList = [];
        this.errorList = [];
    }

    scanner(input: string) {

        input += '#';
        let char: string;

        for (let i: number = 0; i < input.length; i++) {

            char = input[i];

            switch(this.state) {
                case 0:
                    switch(char) {
                        case '(':
                            this.state = 1;
                            this.addCharacter(char);
                            break;
                        case ')':
                            this.state = 2;
                            this.addCharacter(char);
                            break;
                        case ';':
                            this.state = 3;
                            this.addCharacter(char);
                            break;
                        case '=':
                            this.state = 4;
                            this.addCharacter(char);
                            break;
                        case 'p':
                            this.state = 5;
                            this.addCharacter(char);
                            break;
                        case 'i':
                            this.state = 10;
                            this.addCharacter(char);
                            break;
                        case '"':
                            this.state = 14;
                            this.addCharacter(char);
                            break;
                        case ':':
                            this.state = 16;
                            this.addCharacter(char);
                            break;
                        case ' ':
                            this.column++;
                            break;
                        case '\n':
                        case '\r':
                            this.row++;
                            this.column = 1;
                            break;
                        case '\t':
                            this.column += 4;
                            break;
                        default:
                            if (/\d/.test(char)) {
                                // es un dígito
                                this.state = 13;
                                this.addCharacter(char);
                            } else if (char == '#' && i == input.length - 1) {
                                // Se termino el analisis
                                console.log("Analyze Finished");
                            } else {
                                // Error Léxico
                                this.addError(Type.UNKNOW, char, this.row, this.column);
                                this.column++;
                            }
                            break;
                    }

                    break;
                case 1:
                    // Aceptación
                    this.addToken(Type.PAR_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 2:
                    // Aceptación
                    this.addToken(Type.PAR_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 3:
                    // Aceptación
                    this.addToken(Type.SEMICOLON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 4:
                    // Aceptacion
                    this.addToken(Type.EQUAL, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 5:
                    if (char != 'r') {
                        // Error Léxico
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 6;
                    break;
                case 6:
                    if (char != 'i') {
                        // Error Léxico
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 7;
                    break;
                case 7:
                    if (char != 'n') {
                        // Error Léxico
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 8;
                    break;
                case 8:
                    if (char != 't') {
                        // Error Léxico
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 9;
                    break;
                case 9:
                    // Aceptación
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 10:
                    if (char != 'n') {
                        // Error Léxico
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 11;
                    break;
                case 11:
                    if (char != 't') {
                        // Error Léxico
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 12;
                    break;
                case 12:
                    // Aceptación
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 13: 
                    // Aceptación
                    if (/\d/.test(char)) {
                        this.addCharacter(char);
                        continue;
                    }

                    this.addToken(Type.NUMBER, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 14:
                    if (char == '"'){
                        this.state = 15;
                        this.addCharacter(char);
                        continue;
                    }

                    this.addCharacter(char);
                    break;
                case 15:
                    // Aceptación
                    this.addToken(Type.STRING, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 16:
                    // Aceptación

                    if (char == '=') {
                        this.state = 17;
                        this.addCharacter(char);
                        continue;
                    }

                    this.addToken(Type.COLON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 17:
                    // Aceptación
                    this.addToken(Type.ASSIGN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
            }
        }

        return this.tokenList;
    }

    private addCharacter(char: string) {
        this.auxChar += char;
        this.column++;
    }

    // Función de Retorno
    private clean() {
        this.state = 0;
        this.auxChar = '';
    }

    private addToken(type: Type, lexeme: string, row: number, column: number) {
        this.tokenList.push(new Token(type, lexeme, row, column));
    }

    private addError(type: Type, lexeme: string, row: number, column: number) {
        this.errorList.push(new Token(type, lexeme, row, column));
    }

    getErroList() {
        return this.errorList;
    }

}

export { LexicalAnalyzer };