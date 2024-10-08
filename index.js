const Table = require('cli-table3');

// Formula principal igualada a 0
// x^3 + 2x^2 + 10x - 20 = 0
function f(x) {
    return Math.pow(x, 3) + 2 * Math.pow(x, 2) + 10 * x - 20;
}

// Formula principal primer derivada
// 3x^2 + 4x +10 = 0
function fPrime(x) {
    return 3 * Math.pow(x, 2) + 4 * x + 10;
}

// Función para calcular los datos en forma Newton-Raphson
function newtonRaphson() {

    // Datos generales
    const x0 = 1; // Valor inicial
    const tolerance = 0.0001; // Tolerancia para detener la iteración
    const maxIterations = 100; // Número máximo de iteraciones para que no loop

    // Variables temporales
    let results = [];
    let xi = x0;
    let error = Infinity;
    let iteration = 0;

    while (error > tolerance && iteration < maxIterations) {
        let fXi = f(xi);
        let fPrimeXi = fPrime(xi);
        let xiPlus1 = xi - fXi / fPrimeXi;

        error = Math.abs((xiPlus1 - xi) / xiPlus1) * 100;

        results.push({
            Iteration: iteration + 1,
            Xi: xi,
            fXi: fXi,
            fPrimeXi: fPrimeXi,
            XiPlus1: xiPlus1,
            Error: error.toFixed(4) + '%'
        });

        xi = xiPlus1;
        iteration++;
    }

    return results;
}


let results = newtonRaphson();

// Crear la tabla
const table = new Table({
    head: ['Iteración', 'Xi', 'f(Xi)', 'f\'(Xi)', 'Xi+1', 'Error']
});

// Añadir filas a la tabla
results.forEach(result => {
    table.push([
        result.Iteration,
        result.Xi.toFixed(4),
        result.fXi.toFixed(4),
        result.fPrimeXi.toFixed(4),
        result.XiPlus1.toFixed(4),
        result.Error
    ]);
});

// Imprimir la tabla en la consola
console.log(table.toString());

console.log("\nJose Fernando Resendiz Lopez");