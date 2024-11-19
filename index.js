const math = require('mathjs');
const Table = require('cli-table3');

// Función de densidad de probabilidad para la distribución normal estándar
function normalPDF(x) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
}

// Generar valores de x desde -3 a 3 con 20 puntos
const xValues = math.range(-3, 3, (3 - (-3)) / 19).toArray();

// Calcular los valores de la PDF para cada valor de x
const yValues = xValues.map(normalPDF);

// Crear la tabla con valores de la PDF
const pdfTable = new Table({
    head: ['x', 'f(x)'],
    colWidths: [10, 20]
});
xValues.forEach((x, i) => {
    pdfTable.push([x.toFixed(2), yValues[i].toFixed(5)]);
});

// Mostrar la tabla de valores de la PDF
console.log('Tabla de valores de la Distribución Normal Estándar (mu = 0, sigma = 1):');
console.log(pdfTable.toString());

// Método del Trapecio para aproximar la integral de la PDF
function trapezoidalRule(x, y) {
    let n = x.length - 1;  // Número de intervalos (n-1 subintervalos)
    let h = (x[n] - x[0]) / n;  // Tamaño del subintervalo
    let integral = 0.5 * (y[0] + y[n]);  // Suma inicial con los valores extremos multiplicados por 0.5

    for (let i = 1; i < n; i++) {
        integral += y[i];  // Suma de los valores internos
    }

    integral *= h;  // Multiplicación por el tamaño del subintervalo
    return integral;
}

// Calcular la integral usando el método del Trapecio
const integralResult = trapezoidalRule(xValues, yValues);

// Mostrar el resultado de la integral
console.log(`Resultado de la integral usando el método del Trapecio: ${integralResult.toFixed(6)}`);