import { Type } from "../src/Analyzer/Token";
import { Production } from "./Production";

export type First = {
    production: Production;
    first: Type[];
}
