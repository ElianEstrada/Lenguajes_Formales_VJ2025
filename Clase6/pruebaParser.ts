// Análisis Léxico es el que se encarga de 
// verificar que los símbols utilizados sean parte
// del lenguaje definido.

number hola ; () - + >= ! // Tokens de TypeScript

// Análisis Sintáctico
/*
Tiene como objetivo el revisar la estructura del lenguaje
para saber si los tokens vienen en el orden
establecido por la Gramática.

Prácticamente revisa la Sintaxis.

Verbo to be

Gramatica

Pronombre + verbo to be + verbo + ing (gerundio)

Pronombres en inglés = I, You, He, She, It, We, They

Verbo to be = Am, Are, Is;

verbo = eat, play, walk, run;

She Is eating -> gramáticamente es correcto
I is playing -> gramáticamente es correcto

Preguntas

Verbo to be + pronombre + verbo + ?

Are you eating? -> gramáticalmente es correcto

-- Lenguaje de Programación --

*/

// Declarar una variable
// r_let ID ':' tipo ';'
// tipo puede ser r_number; r_string; r_boolean;

let hola: number;

// Declaración y asignación
// r_let ID ':' tipo '=' expresion ';'
//
// tipo puede ser r_number; r_string; r_boolean;
// expresion puedes suma, resta, multiplicación, división, número
// cadena de texto;
// 
// suma numero '+' numero

let numero: number = "hola";

// análisis léxico: [ r_let, id, dos_puntos, r_number, signo_igual, string, signo_punto_coma ];
// análisis sintáctico: 
// Gramática es Tipo 2 -> Libre de Contexto;
// S -> declaracion;
// declaracion -> r_let id ':' r_number '=' string ';'

// Es una flujo de tokens correcto :3

// Notación BNF para gramaticas de tipo 2