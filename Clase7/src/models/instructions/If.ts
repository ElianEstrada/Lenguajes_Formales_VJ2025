import { Instruction } from "../abstract/Instruction";

export class If implements Instruction {

    row: number;
    column: number;
    private condition: Instruction;
    private listInstructions: Instruction[];
    private listInstructionsElse: Instruction[] | undefined;
    private countTab: number;

    constructor(condition: Instruction, listInstructions: Instruction[], listInstructionsElse: Instruction[] | undefined, row: number, column: number, countTab: number) {
        this.row = row;
        this.column = column;
        this.condition = condition;
        this.listInstructions = listInstructions;
        this.listInstructionsElse = listInstructionsElse;
        this.countTab = countTab;
    }

    transpiler(): string {

        let condition: string = this.condition.transpiler();
        let bodyIf: string = '';
        let bodyElse: string = '';
        let tabs: string = '';

        while(this.countTab > 0) {
            tabs += '\t';

            this.countTab--;
        }

        bodyIf += this.listInstructions.map((instruction: Instruction) => {
            return `${tabs}${instruction.transpiler()}`;
        }).join('');

        if (this.listInstructionsElse) {
            bodyElse += this.listInstructionsElse.map((instruction: Instruction) => {
               return `${tabs}${instruction.transpiler()}`;
            }).join('');
        }

        return `if (${condition}) {\n${bodyIf}${tabs.slice(0, tabs.length - 1)}}${this.listInstructionsElse ? ` else {\n${bodyElse}${tabs.slice(0, tabs.length - 1)}}` : ''}\n`;
    }

}