// Definir la función diferencial
// [ f(x, y) = 2y - 2x^2 + x - 3 ]
const f = (x, y) => 2 * y - 2 * Math.pow(x, 2) + x - 3;

// Metodo de Runge-Kutta de Cuarto Orden
function rungeKutta4(x0, y0, h, steps) {
    let x = x0;
    let y = y0;

    for (let i = 0; i < steps; i++) {
        let k1 = h * f(x, y);
        let k2 = h * f(x + h / 2, y + k1 / 2);
        let k3 = h * f(x + h / 2, y + k2 / 2);
        let k4 = h * f(x + h, y + k3);

        y += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        x += h;
    }
    return y;
}

// Parámetros iniciales
const x0 = 0;
const y0 = 1.2;
const h = 0.1;
const steps = Math.floor(1 / h);

// Obtener y(1) usando el metodo de Runge-Kutta de cuarto orden
const y1_rk4 = rungeKutta4(x0, y0, h, steps);
console.log(`y(1) Runge-Kutta respuesta: ${y1_rk4}`);