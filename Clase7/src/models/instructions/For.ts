import { Instruction } from "../abstract/Instruction";

export class For implements Instruction {

    row: number;
    column: number;
    private init: Instruction | undefined;
    private condition: Instruction | undefined;
    private step: {id: Instruction, operator: string} | undefined;
    private listInstructions: Instruction[];
    private countTab: number;

    constructor(init: Instruction | undefined, condition: Instruction | undefined, step: any, listInstructions: Instruction[], row: number, column: number, countTab: number) {
        this.row = row;
        this.column = column;
        this.countTab = countTab;
        this.init = init;
        this.condition = condition;
        this.step = step;
        this.listInstructions = listInstructions;
    }

    transpiler(): string {

        let init: string = '';
        let condition: string = '';
        let step: string = '';
        let bodyFor: string = '';
        let tabs: string = '';

        while (this.countTab > 0) {
            tabs += '\t';

            this.countTab--;
        }

        if (this.init) {
            init = this.init.transpiler();
        }

        if (this.condition) {
            condition = this.condition.transpiler();
        }

        if (this.step) {
            step = `${this.step.id.transpiler()}${this.step.operator}`;
        }

        bodyFor += this.listInstructions.map((instruction: Instruction) => {
            return `${tabs}${instruction.transpiler()}`;
        }).join('');

        return `for (${init.replace('\n', '')} ${condition}; ${step}) {\n${bodyFor}${tabs.slice(0, tabs.length - 1)}}\n`;
    }

}