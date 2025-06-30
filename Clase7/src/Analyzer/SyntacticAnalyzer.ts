import { First } from "../../utils/First";
import { Production } from "../../utils/Production";
import { Error } from "./Error";
import { Token, Type } from "./Token";

export class SyntacticAnalyzer {

    private tokens: Token[];
    private pos: number;
    private errors: Error[];
    private flagError: boolean;
    private preAnalysis: Token;
    private firsts: First[];

    constructor(tokens: Token[]) {
        this.errors = [];
        this.pos = 0;
        this.tokens = tokens;
        this.flagError = false;
        this.firsts = [
            {production: Production.INSTRUCTION, first: [Type.R_INT, Type.R_FLOAT, Type.R_BOOL, Type.R_STRING, Type.R_CHAR, Type.IDENTIFIER, Type.R_CONSOLE, Type.R_IF, Type.R_FOR]},
            {production: Production.LIST_INSTRUCTIONS_P, first: [Type.R_INT, Type.R_FLOAT, Type.R_BOOL, Type.R_STRING, Type.R_CHAR, Type.IDENTIFIER, Type.R_CONSOLE, Type.R_IF, Type.R_FOR]},
            {production: Production.ID_ASIGN_P, first: [Type.ASSIGN]},
            {production: Production.LIST_ID_P, first: [Type.COMMA]},
            {production: Production.INST_IF_P, first: [Type.R_ELSE]},
            {production: Production.FIRST_BLOCK_FOR, first: [Type.R_INT, Type.R_FLOAT, Type.R_BOOL, Type.R_STRING, Type.R_CHAR, Type.IDENTIFIER]},
            {production: Production.THIRD_BLOCK_FOR_P, first: [Type.INC, Type.DEC]},
            {production: Production.ARITHMETIC, first: [Type.PAR_O, Type.IDENTIFIER, Type.INTEGER, Type.DECIMAL, Type.STRING, Type.CHAR, Type.R_FALSE, Type.R_TRUE]},
            {production: Production.ARITHMETIC_P, first: [Type.PLUS, Type.MINUS]},
            {production: Production.RELATIONAL, first: [Type.EQUAL, Type.DIFF, Type.LESS, Type.LESS_EQ, Type.GREATER, Type.GREATER_EQ]},
            {production: Production.TERM_P, first: [Type.MULT, Type.DIV]},
            {production: Production.FACTOR, first: [Type.PAR_O, Type.IDENTIFIER, Type.INTEGER, Type.DECIMAL, Type.STRING, Type.CHAR, Type.R_FALSE, Type.R_TRUE]}
        ];
        this.preAnalysis = this.tokens[this.pos];
    }

    public parser() { // apilando nuestros no terminales T(p, , ) -> (q, blockUsing class)
        this.blockUsing();
        this.class();
    }

    private blockUsing() {  // apilando terminales -> T(q, , blockUsing) -> (q, using system ;)
        this.expect(Type.R_USING);
        this.expect(Type.R_SYSTEM);
        this.expect(Type.SEMICOLON);
    }

    private class() {   // apilando terminales -> T(q, , class) -> (q, public class ID { blockMain })
        this.expect(Type.R_PUBLIC);
        this.expect(Type.R_CLASS);
        this.expect(Type.IDENTIFIER);
        this.expect(Type.KEY_O);
        this.blockMain();
        this.expect(Type.KEY_C);
    }

    private blockMain() {
        this.expect(Type.R_STATIC);
        this.expect(Type.R_VOID);
        this.expect(Type.R_MAIN);
        this.expect(Type.PAR_O);
        this.expect(Type.R_STRING);
        this.expect(Type.BRA_O);
        this.expect(Type.BRA_C);
        this.expect(Type.IDENTIFIER);
        this.expect(Type.PAR_C);
        this.expect(Type.KEY_O);
        this.listInstructions();
        this.expect(Type.KEY_C);
    }

    private listInstructions() {
        this.instruction();
        this.listInstructionsP();
    }

    private listInstructionsP() {
        if (this.isFirst(Production.LIST_INSTRUCTIONS_P)) {
            this.instruction();
            this.listInstructionsP();
        }
    }    

    private instruction() {
        switch(this.preAnalysis.getType()) {
            case Type.R_INT:
            case Type.R_STRING:
            case Type.R_FLOAT:
            case Type.R_BOOL:
            case Type.R_CHAR:
                this.declaration();
                break;
            case Type.IDENTIFIER:
                this.assignation();
                break;
            case Type.R_CONSOLE:
                this.print();
                break;
            case Type.R_IF:
                this.instrIf();
                break;
            case Type.R_FOR:
                this.instrFor();
                break;
            default:

                if (this.flagError) return;

                const firsts: First | undefined = this.firsts.find(first => first.production === Production.INSTRUCTION);
                this.addError(this.preAnalysis, firsts ? firsts.first : []);
                break;
        }
    }

    private declaration() {
        this.type();
        this.listId();
        this.expect(Type.SEMICOLON);
    }

    private type() {
        this.expect(this.preAnalysis.getType());
    }

    private listId() {
        this.idAsign();
        this.listIdP();
    }

    private idAsign() {
        this.expect(Type.IDENTIFIER);
        this.idAsignP();
    }

    private idAsignP() {
        if (this.isFirst(Production.ID_ASIGN_P)) {
            this.expect(Type.ASSIGN);
            this.expression();
        }
    }

    private listIdP() {
        if (this.isFirst(Production.LIST_ID_P)) {
            this.expect(Type.COMMA);
            this.idAsign();
            this.listIdP();
        }
    }

    private assignation() {
        this.expect(Type.IDENTIFIER);
        this.expect(Type.ASSIGN);
        this.expression();
        this.expect(Type.SEMICOLON);
    }

    private print() {
        this.expect(Type.R_CONSOLE);
        this.expect(Type.PERIOD);
        this.expect(Type.R_WRITELINE);
        this.expect(Type.PAR_O);
        this.expression();
        this.expect(Type.PAR_C);
        this.expect(Type.SEMICOLON);
    }

    private instrIf() {
        this.expect(Type.R_IF);
        this.expect(Type.PAR_O);
        this.expression();
        this.expect(Type.PAR_C);
        this.expect(Type.KEY_O);
        this.listInstructions();
        this.expect(Type.KEY_C);
        this.instIfP();
    }

    private instIfP() {
        if (this.isFirst(Production.INST_IF_P)) {
            this.expect(Type.R_ELSE);
            this.expect(Type.KEY_O);
            this.listInstructions();
            this.expect(Type.KEY_C);
        }
    }

    private instrFor() {
        this.expect(Type.R_FOR);
        this.expect(Type.PAR_O);
        this.firstBlockFor();
        this.expression();
        this.expect(Type.SEMICOLON);
        this.thirdBlockFor();
        this.expect(Type.PAR_C);
        this.expect(Type.KEY_O);
        this.listInstructions();
        this.expect(Type.KEY_C);
    }

    private firstBlockFor() {
        if (this.isFirst(Production.FIRST_BLOCK_FOR)) {
            switch(this.preAnalysis.getType()) {
                case Type.IDENTIFIER:
                    this.assignation();
                    break;
                default:
                    this.declaration();
                    break;
            }

            return;
        }

        if (this.flagError) return;

        const firsts: First | undefined = this.firsts.find(first => first.production === Production.FIRST_BLOCK_FOR);

        this.addError(this.preAnalysis, firsts ? firsts.first : []);
    }

    private thirdBlockFor() {
        this.expect(Type.IDENTIFIER);
        this.thirdBlockForP();
    }

    private thirdBlockForP() {
        if (this.isFirst(Production.THIRD_BLOCK_FOR_P)) {
            switch(this.preAnalysis.getType()) {
                case Type.INC:
                    this.increment();
                    break;
                default:
                    this.decrement()
                    break;
            }

            return;
        }

        if (this.flagError) return;

        const firsts: First | undefined = this.firsts.find(first => first.production === Production.THIRD_BLOCK_FOR_P);

        this.addError(this.preAnalysis, firsts ? firsts.first : []);
    }

    private increment() {
        this.expect(Type.INC);
    }   
    
    private decrement() {
        this.expect(Type.DEC);
    }

    private expression() {
        this.arithmetic();
        this.relational();
    }

    private relational() {
        if (this.isFirst(Production.RELATIONAL)) {
            this.expect(this.preAnalysis.getType());
            this.arithmetic();
        }
    }

    private arithmetic() {
        this.term();
        this.arithmeticP();
    }

    private arithmeticP() {
        if (this.isFirst(Production.ARITHMETIC_P)) {
            this.expect(this.preAnalysis.getType());
            this.term();
            this.arithmeticP();
        }
    }

    private term() {
        this.factor();
        this.termP();
    }   
    
    private termP() {
        if (this.isFirst(Production.TERM_P)){
            this.expect(this.preAnalysis.getType());
            this.factor();
            this.termP();
        }
    }

    private factor() {
        if (this.isFirst(Production.FACTOR)) {
            switch(this.preAnalysis.getType()) {
                case Type.PAR_O:
                    this.expect(Type.PAR_O);
                    this.arithmetic();
                    this.expect(Type.PAR_C);
                    break;
                case Type.IDENTIFIER:
                    this.expect(Type.IDENTIFIER);
                    break;
                default:
                    this.expect(this.preAnalysis.getType());
                    break;
            }

            return;
        }

        if (this.flagError) return;

        const firsts: First | undefined = this.firsts.find(first => first.production === Production.FACTOR);

        this.addError(this.preAnalysis, firsts ? firsts.first : []);
    }

    // Function to read the token of current position
    private read() {
        this.preAnalysis = this.tokens[this.pos];
    }

    private expect(typeToken: Type) {

        if (this.flagError) {
            this.pos++;

            if (this.isEnd()) return;

            this.read();

            if ([Type.SEMICOLON, Type.KEY_C].includes(this.preAnalysis.getType())) {
                this.flagError = false;
            }

            return;
        }

        if (this.preAnalysis.getType() === typeToken) { // T(q, x, x) -> (q, );
            this.pos++;

            if (this.isEnd()) return;

            this.read();
            return;
        }

        this.addError(this.preAnalysis, [typeToken]);
    }

    private isFirst(production: Production): boolean {
        const firsts: First | undefined = this.firsts.find(first => first.production === production);

        if (!firsts) {
            return false;
        }

        return firsts.first.includes(this.preAnalysis.getType());
    }

    private isEnd(): boolean {
        return this.pos == this.tokens.length;
    }

    private addError(token: Token, firsts: Type[]) {
        this.errors.push(new Error(token.getLexeme(),
            `Got Token: ${token.getTypeTokenString()} when expect: ${firsts.map((type) => {
                return `${Type[type]}`
            }).join('|')}`,
            token.getRow(), 
            token.getColumn()
        ));

        this.flagError = true;
    }

    public getErrors(): Error[] {
        return this.errors;
    }

}