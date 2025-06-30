import { Token, Type } from "./Token";

type ReserverWords = {
    lexeme: string;
    token: Type;
}

export class LexicalAnalyzer {

    private state: number;
    private auxChar: string;
    private row: number;
    private column: number;
    private tokenList: Token[];
    private errorList: Token[];
    private colors: string;
    private reservedWords: ReserverWords[];

    constructor() {
        this.state = 0;
        this.column = 1;
        this.row = 1;
        this.auxChar = '';
        this.tokenList = [];
        this.errorList = [];
        this.reservedWords = [
            { lexeme: 'using',      token: Type.R_USING       },
            { lexeme: 'System',     token: Type.R_SYSTEM      },
            { lexeme: 'public',     token: Type.R_PUBLIC      },
            { lexeme: 'class',      token: Type.R_CLASS       },
            { lexeme: 'static',     token: Type.R_STATIC      },
            { lexeme: 'void',       token: Type.R_VOID        },
            { lexeme: 'Main',       token: Type.R_MAIN        },
            { lexeme: 'string',     token: Type.R_STRING      },
            { lexeme: 'int',        token: Type.R_INT         },
            { lexeme: 'float',      token: Type.R_FLOAT       },
            { lexeme: 'char',       token: Type.R_CHAR        },
            { lexeme: 'bool',       token: Type.R_BOOL        },
            { lexeme: 'false',      token: Type.R_FALSE       },
            { lexeme: 'true',       token: Type.R_TRUE        },
            { lexeme: 'Console',    token: Type.R_CONSOLE     },
            { lexeme: 'WriteLine',  token: Type.R_WRITELINE   },
            { lexeme: 'if',         token: Type.R_IF          },
            { lexeme: 'else',       token: Type.R_ELSE        },
            { lexeme: 'for',        token: Type.R_FOR         }
        ];
        this.colors = '';
    }

    scanner(input: string): Token[] {

        input += '#';

        let char: string;

        for (let i = 0; i < input.length; i++) {
            char = input[i];
            
            switch(this.state) {
                case 0:
                    switch(char) {
                        case '{':
                            this.addChar(char);
                            this.state = 1;
                            break;
                        case '}':
                            this.addChar(char);
                            this.state = 2;
                            break;
                        case '[':
                            this.addChar(char);
                            this.state = 3;
                            break;
                        case ']':
                            this.addChar(char);
                            this.state = 4;
                            break;
                        case '(':
                            this.addChar(char);
                            this.state = 5;
                            break;
                        case ')':
                            this.addChar(char);
                            this.state = 6;
                            break;
                        case ';':
                            this.addChar(char);
                            this.state = 7;
                            break;
                        case ',':
                            this.addChar(char);
                            this.state = 8;
                            break;
                        case '.':
                            this.addChar(char);
                            this.state = 9;
                            break;
                        case '=':
                            this.addChar(char);
                            this.state = 10;
                            break;
                        case '+':
                            this.addChar(char);
                            this.state = 12;
                            break;
                        case '-':
                            this.addChar(char);
                            this.state = 14;
                            break;
                        case '*':
                            this.addChar(char);
                            this.state = 16;
                            break;
                        case '!':
                            this.addChar(char);
                            this.state = 17;
                            break;
                        case '<':
                            this.addChar(char);
                            this.state = 19;
                            break;
                        case '>':
                            this.addChar(char);
                            this.state = 21;
                            break;
                        case '/':
                            this.addChar(char);
                            this.state = 23;
                            break;
                        case '"':
                            this.addChar(char);
                            this.state = 32;
                            break;
                        case "'":
                            this.addChar(char);
                            this.state = 34;
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
                            if (/[a-zA-Z]/.test(char)) {
                                this.addChar(char);
                                this.state = 28;
                                continue;
                            }

                            if (/[0-9]/.test(char)) {
                                this.addChar(char);
                                this.state = 29;
                                continue;
                            }

                            if (char == '#' && i == input.length - 1) {
                                console.log("The Analyze Finished");
                            } else {
                                this.addError(char, this.row, this.column);
                                this.column++;
                            }

                            break;
                    }
                    break;
                case 1:
                    // Aceptación
                    this.addToken(Type.KEY_O, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 2:
                    // Aceptación
                    this.addToken(Type.KEY_C, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 3:
                    // Aceptación
                    this.addToken(Type.BRA_O, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 4:
                    // Aceptación
                    this.addToken(Type.BRA_C, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 5:
                    // Aceptación
                    this.addToken(Type.PAR_O, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 6:
                    // Aceptación
                    this.addToken(Type.PAR_C, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 7:
                    // Aceptación
                    this.addToken(Type.SEMICOLON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 8:
                    // Aceptación
                    this.addToken(Type.COMMA, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 9:
                    // Aceptación
                    this.addToken(Type.PERIOD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 10:
                    // Aceptación
                    if (char == '=') {
                        this.addChar(char);
                        this.state = 11;
                        continue;
                    }

                    this.addToken(Type.ASSIGN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 11:
                    // Aceptación
                    this.addToken(Type.EQUAL, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 12:
                    // Aceptación
                    if (char == '+') {
                        this.addChar(char);
                        this.state = 13;
                        continue;
                    }

                    this.addToken(Type.PLUS, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 13:
                    // Aceptación
                    this.addToken(Type.INC, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 14:
                    // Aceptación
                    if (char == '-') {
                        this.addChar(char);
                        this.state = 15;
                        continue;
                    }

                    this.addToken(Type.MINUS, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 15:
                    // Aceptación
                    this.addToken(Type.DEC, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 16:
                    // Aceptación
                    this.addToken(Type.MULT, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 17:
                    if (char == '=') {
                        this.addChar(char);
                        this.state = 18;
                        continue;
                    }

                    this.addError(this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="error">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
                case 18:
                    // Aceptación
                    this.addToken(Type.DIFF, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 19:
                    // Aceptación
                    if (char == '=') {
                        this.addChar(char);
                        this.state = 20;
                        continue;
                    }

                    this.addToken(Type.LESS, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 20:
                    // Aceptación
                    this.addToken(Type.LESS_EQ, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 21:
                    // Aceptación
                    if (char == '=') {
                        this.addChar(char);
                        this.state = 22;
                        continue;
                    }

                    this.addToken(Type.GREATER, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 22:
                    // Aceptación
                    this.addToken(Type.GREATER_EQ, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 23:
                    // Aceptación
                    if (char == '/') {
                        this.addChar(char);
                        this.state = 24;
                        continue;
                    }

                    if (char == '*') {
                        this.addChar(char);
                        this.state = 25;
                        continue;
                    }

                    this.addToken(Type.DIV, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 24:
                    // Aceptación
                    if (char != '\n') {
                        this.addChar(char);
                        continue;
                    }

                    this.addToken(Type.COMMENT, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="comment">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
                case 25:
                    if (char == '*') {
                        this.addChar(char);
                        this.state = 26;
                        continue;
                    }

                    if (char == '#' && i == input.length - 1) {
                        this.addError(this.auxChar, this.row, this.column);
                        this.clean();
                        i--;
                    }

                    if (char == '\n' || char == '\r') {
                        this.row++;
                        this.column = 1;
                    }

                    this.addChar(char);
                    break;
                case 26:
                    if (char == '/') {
                        this.addChar(char);
                        this.state = 27;
                        continue;
                    }

                    this.state = 25;
                    i--;
                    break;
                case 27:
                    // Aceptación
                    this.addToken(Type.MULTICOMMENT, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="comment">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
                case 28:
                    // Aceptación
                    if (/[a-zA-Z0-9_]/.test(char)) {
                        this.addChar(char)
                        continue;
                    }

                    let word: ReserverWords | undefined = this.reservedWords.find(token => token.lexeme === this.auxChar);

                    if (word) {
                        this.addToken(word.token, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="keyword">${this.auxChar}</span>`;
                        this.clean();
                        i--;
                        continue;
                    }

                    this.addToken(Type.IDENTIFIER, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar}`;
                    this.clean();
                    i--;
                    break;
                case 29:
                    // Aceptación
                    if (char == '.') {
                        this.addChar(char);
                        this.state = 30;
                        continue;
                    }

                    if (/[0-9]/.test(char)) {
                        this.addChar(char);
                        continue;
                    }

                    this.addToken(Type.INTEGER, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="number">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
                case 30:
                    if (/[0-9]/.test(char)) {
                        this.addChar(char);
                        this.state = 31;
                        continue;
                    }

                    this.addError(this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="error">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
                case 31:
                    // Aceptación
                    if (/[0-9]/.test(char)) {
                        this.addChar(char);
                        continue;
                    }

                    this.addToken(Type.DECIMAL, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="number">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
                case 32:
                    if (char == '"') {
                        this.addChar(char);
                        this.state = 33;
                        continue;
                    }

                    if (char == '\n' || (char == '#' && i == input.length - 1)) {
                        this.addError(this.auxChar, this.row, this.column - this.auxChar.length);
                        this.colors += `<span class="error">${this.auxChar}</span>`;
                        this.clean();
                        i--;
                        continue;
                    }

                    this.addChar(char);
                    break;
                case 33:
                    // Aceptación
                    this.addToken(Type.STRING, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="string">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
                case 34:
                    if (char != "'") {
                        this.addChar(char);
                        this.state = 35;
                        continue;
                    }

                    this.addError(this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="error">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
                case 35:
                    if (char == "'") {
                        this.addChar(char);
                        this.state = 36;
                        continue;
                    }

                    this.addError(this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="error">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
                case 36:
                    // Aceptación
                    this.addToken(Type.CHAR, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `<span class="string">${this.auxChar}</span>`;
                    this.clean();
                    i--;
                    break;
            }
        }

        return this.tokenList;
    }

    addChar(char: string) {
        this.auxChar += char;
        this.column++;
    }

    clean() {
        this.auxChar = '';
        this.state = 0;
    }

    addToken(type: Type, lexeme: string, row: number, column: number) {
        this.tokenList.push(new Token(type, lexeme, row, column));
    }

    addError(lexeme: string, row: number, column: number) {
        this.errorList.push(new Token(Type.UNKNOW, lexeme, row, column));
    }

    getTokenList(): Token[] {
        return this.tokenList;
    }

    getErrorList(): Token[] {
        return this.errorList;
    }

    getColors(): string {
        return this.colors;
    }
}