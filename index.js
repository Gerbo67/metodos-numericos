const Table = require('cli-table3');

// Datos tabulados
const x = [-2, 0, 2, 4, 6];
const fx = [35, 5, -10, 2, 5];

// Método del Trapecio con pasos detallados
function trapezoidalRuleWithSteps(x, fx) {
    let n = x.length - 1;
    let h = (x[n] - x[0]) / n;
    let sumInitial = fx[0] + fx[n];

    // Crear la tabla con pasos detallados
    const stepsTable = new Table({
        head: ['i', 'x_i', 'f(x_i)', 'Multiplicado por', 'Valor después de multiplicar']
    });

    // Añadir filas iniciales con extremos
    stepsTable.push(
        [0, x[0], fx[0], 1, fx[0]],
        [n, x[n], fx[n], 1, fx[n]]
    );

    // Calcular y añadir filas para los valores internos
    let sumInterior = 0;
    for (let i = 1; i < n; i++) {
        let multipliedValue = 2 * fx[i];
        sumInterior += multipliedValue;
        stepsTable.push(
            [i, x[i], fx[i], 2, multipliedValue]
        );
    }

    // Suma total de la integral
    let sumTotal = sumInitial + sumInterior;
    let result = (h / 2) * sumTotal;

    // Mostrar tabla de pasos
    console.log('Tabla de pasos para el método del Trapecio:');
    console.log(stepsTable.toString());

    // Mostrar resultado final
    console.log(`\nResultado de la integral usando el método del Trapecio: ${result.toFixed(4)}\n`);

    return result;
}

// Cálculo de la integral utilizando el método del Trapecio con pasos detallados
let trapezoidalResult = trapezoidalRuleWithSteps(x, fx);

console.log("\nJose Fernando Resendiz Lopez");