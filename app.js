const circle = document.getElementById('circle');
const instruction = document.getElementById('instruction');

// Tiempos en milisegundos (4 segundos por acción)
const breatheTime = 4000;
const totalTime = breatheTime * 2;

function breatheAnimation() {
    // Fase de Inhalación
    instruction.innerText = 'Inhala profundamente...';
    circle.classList.add('expand');

    // Fase de Exhalación (se ejecuta después de que termina la inhalación)
    setTimeout(() => {
        instruction.innerText = 'Exhala lentamente...';
        circle.classList.remove('expand');
    }, breatheTime);
}

// Iniciar inmediatamente
breatheAnimation();

// Repetir el ciclo indefinidamente
setInterval(breatheAnimation, totalTime);
