const canvas = document.getElementById('julia');
const ctx = canvas.getContext('2d');

const maxIterations = 100;
let cRe = -0.7; // Parte real do parâmetro c
let cIm = 0.27015; // Parte imaginária do parâmetro c

function julia(x, y) {
    let real = x;
    let imaginary = y;
    let n = 0;

    while (n < maxIterations) {
        const real2 = real * real;
        const imaginary2 = imaginary * imaginary;

        if (real2 + imaginary2 > 4) {
            break;
        }

        imaginary = 2 * real * imaginary + cIm;
        real = real2 - imaginary2 + cRe;
        n++;
    }

    return n;
}

function draw() {
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const real = (x - canvas.width / 2) / (canvas.width / 4);
            const imaginary = (y - canvas.height / 2) / (canvas.height / 4);
            const n = julia(real, imaginary);
            const color = n === maxIterations ? 0 : (n / maxIterations) * 255;
            ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Atualiza os parâmetros cRe e cIm para criar movimento
    cRe += 0.005; // Muda a parte real
    cIm += 0.005; // Muda a parte imaginária

    draw();
    requestAnimationFrame(animate);
}

animate();
