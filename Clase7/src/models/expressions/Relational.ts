import { Instruction } from "../abstract/Instruction";

export class Relational implements Instruction {

    row: number;
    column: number;
    private exp1: Instruction | undefined;
    private exp2: Instruction | undefined;
    private operator: string;

    constructor(exp1: Instruction | undefined, exp2: Instruction | undefined, operator: string, row: number, column: number){
        this.row = row;
        this.column = column;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.operator = operator;
    }

    transpiler(): string {

        let left: string = '';
        let right: string = '';

        if (this.exp1) {
            left = this.exp1.transpiler();
        }

        if (this.exp2) {
            right = this.exp2.transpiler();
        }

        return `${left} ${this.operator} ${right}`;
    }

}