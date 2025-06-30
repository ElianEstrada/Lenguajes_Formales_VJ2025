using System;

public class LFP_VJ2025 {

    static void Main(string[] args) {
        int edad;
        float altura = 1.72;
        string nombre = "Calificador1";
        bool mayor_edad = false;
        char genero;

        edad = 17;
        genero = 'H';

        Console.WriteLine("Bienvenido: " + nombre + " su altura es de: " + altura + " metros y tiene: " + edad + " años");

        int nota_1, nota_2 = 61, nota_3 = 80, nota_4;
        string nombre_1 = "Cali2", nombre_2, nombre_3;
        bool isTree, isApple = false, isMountain;
        
        char inicial = 'A', final;

        float sueldo_base = 1250.25, sueldo_neto, igss, cobro_iva = 12.0;

        Console.WriteLine("Nota_1 = " + nota_1);
        Console.WriteLine("Nota_2 = " + nota_2);
        Console.WriteLine("Nota_3 = " + nota_3);
        Console.WriteLine("Nota_4 = " + nota_4);


        Console.WriteLine("nombre_1 = " + nombre_1);
        Console.WriteLine("nombre_2 = " + nombre_2);
        Console.WriteLine("nombre_3 = " + nombre_3);

        Console.WriteLine("isTree: " + isTree);
        Console.WriteLine("isApple: " + isApple);
        Console.WriteLine("isMountain: " + isMountain);

        Console.WriteLine("Sueldo base = " + sueldo_base);
        Console.WriteLine("Sueldo neto = " + sueldo_neto);
        Console.WriteLine("IGSS = " + igss);
        Console.WriteLine("Cobro IVA = " + cobro_iva);

    }
}