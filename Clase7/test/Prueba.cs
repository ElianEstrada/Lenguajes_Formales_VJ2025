using System;

public class MyProgram {
    static void Main(string[] args) {
        int num1, num2 = 20, num3;
        Console.WriteLine(10);
        Console.WriteLine(5 * (2 + 1));
        Console.WriteLine((10 + 5) == (2 + 3));
        Console.WriteLine(5 * (2 + 3 * (2 + 1) / 2));

        if (num1 > 10) {
            Console.WriteLine("El num1 es mayor a 10");
        }

        if (num2 < 10) {
            Console.WriteLine("El num2 es menor a 10");

            if (num2 == 5) {
                Console.WriteLine("El num2 es igual a 5");

                if (num2 / 5 == 1) {
                    Console.WriteLine("El num2 se puede dividir por 5");
                }

            }

        } else {
            Console.WriteLine("El num2 es mayor a 10");
        }

        for (int i = 0; i < 10; i++) {
            Console.WriteLine(i);

            if (i == 5) {
                Console.WriteLine("El numero i es igual a 5");
            }
        }
    }
}