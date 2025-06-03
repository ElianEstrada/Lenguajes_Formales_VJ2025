console.log("Hola Mundo");
console.log("Adios Mundo");

// Tipos 
// number -> Numeros tanto enteros como flotantes
// string -> cadenas de texot
// boolean -> valores verdaderos o falsos

// Declarar un Variable

// let o var para crear variables
// const para crear constantes

let num1: number = 10;
let cadena: string = "10";
let flag: boolean = true;

console.log(num1);
console.log(cadena);
console.log(flag);

if (num1 == 10) {
    console.log("Es 10");
} else if(num1 == 20) {
    console.log("Es 20");
} else {
    console.log("Es otra cosa");
}

switch(num1) {
    case 0:
        break;
    default:
        console.log("no coincidio", num1);
        break;
}

while (num1 > 0) {
    console.log(num1);
    num1--;
}

do {
    console.log(num1);
    num1++;
} while(num1 < 10)

for (let i: number = 0; i < 10; i++) {
    console.log(i);
}

function suma(num1: number, num2: number) {
    return num1 + num2;
}

suma(3, 4);