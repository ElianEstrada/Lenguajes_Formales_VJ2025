using System;

public class Prueba {
    static void Main (string[] args) {
        int num1, num2 = 20;
        int num3 = 10;
        string nombre = "Elian";
        Console.WriteLine(2);
        Console.WriteLine(5 * (2 + 1));
        Console.WriteLine(2 > 3);
        num1 = 20 + 1;
        Console.WriteLine(num1 * 5 * ( 2 + 1 )  + (3 * (2 + 1)));

        if (2 < 3) {
            Console.WriteLine(2);
            Console.WriteLine(2 + 1 * ( 3 + 4 ));
            Console.WriteLine(true);
            if (2 == 2) {
                    int num2;
                    Console.WriteLine(num2);
            } else {
                    Console.WriteLine(2 + 4);
            }
        }

        for (int i = 1; i <= 10; i++) {
            Console.WriteLine(i);

            if (i == 5) {
                Console.WriteLine("i es igual a 5");
            }
        }
    }
}