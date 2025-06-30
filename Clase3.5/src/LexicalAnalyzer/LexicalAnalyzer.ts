import { Token, Type } from "./Token";

export class LexicalAnalyzer {
    private row: number;
    private column: number;
    private auxChar: string;
    private state: number;
    private tokenList: Token[];
    private errorList: Token[];
    private colors: string;

    constructor(){
        this.row = 1;
        this.column = 1;
        this.auxChar = '';
        this.state = 0;
        this.tokenList = [];
        this.errorList = [];
        this.colors = ``;
    }

    scanner(input: string): Token[] {

        input += "#";
        let char: string;

        for (let i: number = 0; i < input.length; i++) {

            char = input[i];

            switch(this.state) {
                case 0:
                    switch(char) {
                        case ':':
                            this.state = 1;
                            this.addCharacter(char);
                            break;
                        case '=':
                            this.state = 3;
                            this.addCharacter(char);
                            break;
                        case '{':
                            this.state = 4;
                            this.addCharacter(char);
                            break;
                        case '}':
                            this.state = 5;
                            this.addCharacter(char);
                            break;
                        case '[':
                            this.state = 6;
                            this.addCharacter(char);
                            break;
                        case ']':
                            this.state = 7;
                            this.addCharacter(char);
                            break;
                        case '(':
                            this.state = 8;
                            this.addCharacter(char);
                            break;
                        case ')':
                            this.state = 9;
                            this.addCharacter(char);
                            break;
                        case ';':
                            this.state = 10;
                            this.addCharacter(char);
                            break;
                        case '"':
                            this.state = 11;
                            this.addCharacter(char);
                            break;
                        case 'J':
                            this.state = 14;
                            this.addCharacter(char);
                            break;
                        case 'a':
                            this.state = 21;
                            this.addCharacter(char);
                            break;
                        case 'f':
                            this.state = 30;
                            this.addCharacter(char);
                            break;
                        case 'd':
                            this.state = 35;
                            this.addCharacter(char);
                            break;
                        case 's':
                            this.state = 47;
                            this.addCharacter(char);
                            break;
                        case 'n':
                            this.state = 52;
                            this.addCharacter(char);
                            break;
                        case 'p':
                            this.state = 58;
                            this.addCharacter(char);
                            break;
                        case ' ':
                            this.column++;
                            this.colors += `${char}`;
                            break;
                        case '\n':
                        case '\r':
                            this.row++;
                            this.column = 1;
                            this.colors += `${char}`;
                            break;
                        case '\t':
                            this.column += 4;
                            this.colors += `${char}`;
                            break;
                        default:
                            if (/\d/.test(char)) {
                                // dígito
                                this.state = 13;
                                this.addCharacter(char);
                            } else if (char == '#' && i == input.length - 1) {
                                // Finalizo de leer la cadena
                                console.log("Analyze Finished");
                            } else {
                                // Error Léxico
                                this.addError(Type.UNKWON, char, this.row, this.column);
                                this.column++;
                            }
                    }
                    break;
                case 1:
                    // Estado de Aceptación
                    if (char != '=') {
                        this.addToken(Type.COLON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `${this.auxChar}`;
                        this.auxChar = '';
                        this.state = 0; // Regresamos al estado inicial
                        i--; // regresamos para volver a leer este caracter que no coincidio

                        continue;
                    } 

                    this.state = 2;
                    this.addCharacter(char);
                    break;
                case 2: 
                    // Estado de Aceptación
                    this.addToken(Type.STATS, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 3:
                    // Estado de Aceptación
                    this.addToken(Type.EQUAL, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 4:
                    // Estado de Aceptación
                    this.addToken(Type.KEY_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 5:
                    // Estado de Aceptación
                    this.addToken(Type.KEY_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 6:
                    // Estado de Aceptación
                    this.addToken(Type.BRACKETS_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 7:
                    // Estado de Aceptación
                    this.addToken(Type.BRACKETS_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 8:
                    // Estado de Aceptación
                    this.addToken(Type.PAR_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 9:
                    // Estado de Aceptación
                    this.addToken(Type.PAR_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 10:
                    // Estado de Aceptación
                    this.addToken(Type.SEMICOLON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 11:
                    if (char == '"') {
                        this.state = 12;
                        this.addCharacter(char);
                        continue;
                    }

                    if (char == '\n') {
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--; // retrocedemos para recuperar el caracter \n
                        continue;
                    }

                    this.addCharacter(char);
                    break;
                case 12:
                    // Estado de Aceptación
                    this.addToken(Type.STRING, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="string">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 13:
                    // Estado de Aceptación
                    if (/\d/.test(char)) {
                        this.addCharacter(char);
                        continue;
                    }

                    this.addToken(Type.NUMBER, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="number">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 14:
                    if (char != 'u') {
                        // Error léxico
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 15;
                    break;
                case 15:
                    if (char != 'g') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 16;
                    break;
                case 16:
                    if (char != 'a') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 17;
                    break;
                case 17:
                    if (char != 'd') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 18;
                    break;
                case 18:
                    if (char != 'o') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 19;
                    break;
                case 19:
                    if (char != 'r') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 20;
                    break;
                case 20:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 21:
                    if (char == 't') {
                        this.addCharacter(char);
                        this.state = 22;
                        continue;
                    }

                    if (char == 'g') {
                        this.addCharacter(char);
                        this.state = 27;
                        continue;
                    }

                    // Error léxico 
                    this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 22:
                    if (char != 'a') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 23;
                    break;
                case 23:
                    if (char != 'q') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 24;
                    break;
                case 24:
                    if (char != 'u') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 25;
                    break;
                case 25:
                    if (char != 'e') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 26;
                    break;
                case 26:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 27:
                    if (char != 'u') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 28;
                    break;
                case 28:
                    if (char != 'a') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 29;
                    break;
                case 29:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 30:
                    if (char != 'u') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 31;
                    break;
                case 31:
                    if (char != 'e') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 32;
                    break;
                case 32:
                    if (char != 'g') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 33;
                    break;
                case 33:
                    if (char != 'o') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 34;
                    break;
                case 34:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 35:
                    if (char == 'e') {
                        this.addCharacter(char);
                        this.state = 36;
                        continue;
                    }

                    if (char == 'r') {
                        this.addCharacter(char);
                        this.state = 42;
                        continue;
                    }

                    // Error léxico 
                    this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 36:
                    if (char != 'f') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 37;
                    break;
                case 37:
                    if (char != 'e') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 38;
                    break;
                case 38:
                    if (char != 'n') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 39;
                    break;
                case 39:
                    if (char != 's') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 40;
                    break;
                case 40:
                    if (char != 'a') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 41;
                    break;
                case 41:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 42:
                    if (char != 'a') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 43;
                    break;
                case 43:
                    if (char != 'g') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 44;
                    break;
                case 44:
                    if (char != 'o') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 45;
                    break;
                case 45:
                    if (char != 'n') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 46;
                    break;
                case 46:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 47:
                    if (char != 'a') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 48;
                    break;
                case 48:
                    if (char != 'l') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 49;
                    break;
                case 49:
                    if (char != 'u') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 50;
                    break;
                case 50:
                    if (char != 'd') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 51;
                    break;
                case 51:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 52:
                    if (char != 'o') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 53;
                    break;
                case 53:
                    if (char != 'r') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 54;
                    break;
                case 54:
                    if (char != 'm') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 55;
                    break;
                case 55:
                    if (char != 'a') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 56;
                    break;
                case 56:
                    if (char != 'l') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 57;
                    break;
                case 57:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 58:
                    if (char == 's') {
                        this.addCharacter(char);
                        this.state = 59;
                        continue;
                    }

                    if (char == 'l') {
                        this.addCharacter(char);
                        this.state = 66;
                        continue;
                    }

                    // Error léxico 
                    this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 59:
                    if (char != 'i') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 60;
                    break;
                case 60:
                    if (char != 'q') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 61;
                    break;
                case 61:
                    if (char != 'u') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 62;
                    break;
                case 62:
                    if (char != 'i') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 63;
                    break;
                case 63:
                    if (char != 'c') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 64;
                    break;
                case 64:
                    if (char != 'o') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 65;
                    break;
                case 65:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
                    i--;
                    break;
                case 66:
                    if (char != 'a') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 67;
                    break;
                case 67:
                    if (char != 'n') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 68;
                    break;
                case 68:
                    if (char != 't') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 69;
                    break;
                case 69:
                    if (char != 'a') {
                        // Error léxico 
                        this.addError(Type.UNKWON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.auxChar = '';
                        this.state = 0;
                        i--;
                        continue;
                    }

                    this.addCharacter(char);
                    this.state = 70;
                    break;
                case 70:
                    // Estado de Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="keyword">${this.auxChar}</span>`;
                    this.auxChar = '';
                    this.state = 0;
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

    private addToken(type: Type, lexeme: string, row: number, column: number) {
        this.tokenList.push(new Token(type, lexeme, row, column));
    }

    private addError(type: Type, lexeme: string, row: number, column: number) {
        this.errorList.push(new Token(type, lexeme, row, column));
    }

    getErrorList() {
        return this.errorList;
    }

    getColors() {
        return this.colors;
    }
}