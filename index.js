// EJERCICIO 1: Metodo de Simpson 1/3 para calcular L
function simpsonMethod(n) {
    const f = (x) => Math.sqrt(1 + Math.pow(Math.cos(x), 2)); // Derivada de sen(x) es cos(x)
    const a = 0; // Límite inferior
    const b = 2 * Math.PI; // Límite superior
    const h = (b - a) / n;

    let sum = f(a) + f(b);
    for (let i = 1; i < n; i++) {
        const x = a + i * h;
        sum += (i % 2 === 0 ? 2 : 4) * f(x);
    }

    return (8 * h / 3) * sum; // Multiplicamos por 8 porque son 8 ondas
}

console.log(`Ejercicio 1 - Longitud total L usando Simpson: ${simpsonMethod(10)}`);

// EJERCICIO 2: Metodo del Trapecio
function trapezoidalMethod(x, fx) {
    let integral = 0;
    for (let i = 0; i < x.length - 1; i++) {
        integral += (x[i + 1] - x[i]) * (fx[i] + fx[i + 1]) / 2;
    }
    return integral;
}

const x2 = [0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9, 3.2];
const fx2 = [-1, 1.5, 1.8, 2, 3.5, 4, 2.4, 1, -0.5, -1.5];
console.log(`Ejercicio 2 - Integral con Trapecio: ${trapezoidalMethod(x2, fx2)}`);

// EJERCICIO 3: Ecuación diferencial con Euler y Euler Mejorado
function euler(x0, y0, h, steps) {
    const f = (x, y) => x / (1 + Math.sin(y)); // f(x, y)
    let x = x0;
    let y = y0;

    for (let i = 0; i < steps; i++) {
        y += h * f(x, y);
        x += h;
    }

    return y;
}

function improvedEuler(x0, y0, h, steps) {
    const f = (x, y) => x / (1 + Math.sin(y)); // f(x, y)
    let x = x0;
    let y = y0;

    for (let i = 0; i < steps; i++) {
        const k1 = h * f(x, y);
        const k2 = h * f(x + h, y + k1);
        y += (k1 + k2) / 2;
        x += h;
    }

    return y;
}

const x0 = 2;
const y0 = 1;
const h = 0.1;
const steps = Math.floor((3 - 2) / h); // 2 ≤ x ≤ 3
console.log(`Ejercicio 3 - Euler: y(3) = ${euler(x0, y0, h, steps)}`);
console.log(`Ejercicio 3 - Euler Mejorado: y(3) = ${improvedEuler(x0, y0, h, steps)}`);

// EJERCICIO 4: Ajuste polinómico de cuarto orden
function polynomialFit(x, y, xTarget) {
    const n = x.length;
    const matrix = Array(n).fill(0).map(() => Array(n).fill(0));
    const vector = Array(n).fill(0);

    // Construir matriz y vector
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = Math.pow(x[i], j);
        }
        vector[i] = y[i];
    }

    // Resolver sistema de ecuaciones lineales usando eliminación de Gauss
    const coefficients = gaussElimination(matrix, vector);

    // Evaluar el polinomio en xTarget
    return coefficients.reduce((sum, coef, index) => sum + coef * Math.pow(xTarget, index), 0);
}

function gaussElimination(matrix, vector) {
    const n = vector.length;
    for (let i = 0; i < n; i++) {
        // Pivote
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = k;
            }
        }
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
        [vector[i], vector[maxRow]] = [vector[maxRow], vector[i]];

        // Escalonar
        for (let k = i + 1; k < n; k++) {
            const factor = matrix[k][i] / matrix[i][i];
            for (let j = i; j < n; j++) {
                matrix[k][j] -= factor * matrix[i][j];
            }
            vector[k] -= factor * vector[i];
        }
    }

    // Sustitución hacia atrás
    const solution = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        solution[i] = vector[i] / matrix[i][i];
        for (let k = i - 1; k >= 0; k--) {
            vector[k] -= matrix[k][i] * solution[i];
        }
    }
    return solution;
}

const x4 = [3, 4, 5, 7, 8, 9, 11, 12];
const y4 = [1.6, 3.6, 4.4, 3.4, 2.2, 2.8, 3.8, 4.6];
const xTarget = 14;
console.log(`Ejercicio 4 - f(14): ${polynomialFit(x4, y4, xTarget)}`);
