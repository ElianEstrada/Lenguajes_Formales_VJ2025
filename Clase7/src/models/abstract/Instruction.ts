export interface Instruction {

    row: number;
    column: number;

    // Método Abstracto
    transpiler(): string;
}