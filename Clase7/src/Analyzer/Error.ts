export class Error {

    private row;
    private column;
    private lexeme: string;
    private description: string;

    constructor(lexeme: string, description: string, row: number, column: number) {
        this.lexeme = lexeme;
        this.description = description;
        this.row = row;
        this.column = column;
    }

    getLexeme(): string {
        return this.lexeme;
    }

    getDescription(): string {
        return this.description;
    }

    getRow(): number {
        return this.row;
    }

    getColumn(): number {
        return this.column;
    }
}