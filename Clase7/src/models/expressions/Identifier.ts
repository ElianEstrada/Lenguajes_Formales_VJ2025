import { Instruction } from "../abstract/Instruction";

export class Identifier implements Instruction {

    row: number;
    column: number;
    private id: string;

    constructor(id: string, row: number, column: number){
        this.row = row;
        this.column = column;
        this.id = id;
    }

    transpiler(): string {
        return this.id;
    }

}