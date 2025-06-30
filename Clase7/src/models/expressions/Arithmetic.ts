import { Instruction } from "../abstract/Instruction";

export class Arithmetic implements Instruction {

    row: number;
    column: number;
    private exp1: Instruction | undefined;
    private exp2: Instruction | undefined;
    private operator: string;
    private flag: boolean;

    constructor(exp1: Instruction | undefined, exp2: Instruction | undefined, operator: string, row: number, column: number){
        this.row = row;
        this.column = column;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.operator = operator;
        this.flag = false;
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

        return this.flag ? `(${left} ${this.operator} ${right})` : `${left} ${this.operator} ${right}`;
    }

    public setFlag(flag: boolean) {
        this.flag = flag;
    }

}