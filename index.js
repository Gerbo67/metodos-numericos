// Definir la función diferencial
// [ f(x, y) = 2y - 2x^2 + x - 3 ]
const f = (x, y) => 2 * y - 2 * Math.pow(x, 2) + x - 3;

// Metodo Euler
function eulerMethod(x0, y0, h, steps) {
    let x = x0;
    let y = y0;

    for (let i = 0 ; i < steps; i++){
        y += h * f(x, y);
        x += h;
    }

    return y;
}

// Parámetros iniciales
const x0 = 0;
const y0 = 1.2;
const h = 0.1;
const steps = Math.floor(1 / h);

// Obtener y(1) usando el metodo de Euler
const y1_rk4 = eulerMethod(x0, y0, h, steps);
console.log(`y(1) Euler respuesta: ${y1_rk4}`);