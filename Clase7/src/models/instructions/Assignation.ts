import { Instruction } from "../abstract/Instruction";

export class Assignation implements Instruction {

    row: number;
    column: number;
    private id: string;
    private exp: Instruction | undefined;

    constructor(id: string, exp: Instruction | undefined, row: number, column: number) {
        this.row = row;
        this.column = column;
        this.id = id;
        this.exp = exp;
    }

    transpiler(): string {

        let exp: string = '';

        if (this.exp) {
            exp = this.exp.transpiler();
        }

        return `${this.id} = ${exp};\n`;
    }

}