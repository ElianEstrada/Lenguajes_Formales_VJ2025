import { Instruction } from "../abstract/Instruction";

export class Print implements Instruction {

    row: number;
    column: number;
    private exp: Instruction | undefined;

    constructor(exp:Instruction | undefined, row: number, column: number) {
        this.row = row;
        this.column = column;
        this.exp = exp;
    }

    transpiler(): string {
        let exp: string = '';

        if (this.exp) {
            exp = this.exp.transpiler();
        }

        return `console.log(${exp});\n`;
    }

}