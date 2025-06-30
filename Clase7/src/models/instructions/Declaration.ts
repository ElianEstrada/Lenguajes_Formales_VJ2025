import { IdDec } from "../../../utils/IdDec";
import { Type } from "../../Analyzer/Token";
import { Instruction } from "../abstract/Instruction";

export class Declaration implements Instruction {

    row: number;
    column: number;
    private decType: Type;
    private listIds: IdDec[];

    constructor(decType: Type, listIds: IdDec[], row: number, column: number) {
        this.row = row;
        this.column = column;
        this.decType = decType;
        this.listIds = listIds;
    }

    transpiler(): string {

        let type: string = this.types(this.decType);
        let declartions: string = `let `;

        declartions += this.listIds.map((id: IdDec) => {
            return `${id.id.transpiler()}: ${type}${id.value ? ` = ${id.value.transpiler()}` : ''}`;
        }).join(', ');

        return `${declartions};\n`;
    }

    private types(type: Type): string {
        switch(type) {
            case Type.R_INT:
            case Type.R_FLOAT:
                return 'number';
            case Type.R_STRING:
            case Type.R_CHAR:
                return 'string';
            default:
                return 'boolean';
        }
    }

}