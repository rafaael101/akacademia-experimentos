document.addEventListener('DOMContentLoaded', () => {
    // verificar compatibilidad con la Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Tu navegador no soporta la Web Speech API. Por favor, intenta con Chrome o Edge.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-MX'; 
    recognition.interimResults = true; // mostrar resultados parciales mientras hablamos
    recognition.continuous = true; 

    const startButton = document.getElementById('startButton');
    const partialText = document.getElementById('partialText');
    const resultDiv = document.getElementById('result');
    let finalTranscript = '';

    // mostrar cuando se empieza a escuchar el microfono
    recognition.onstart = () => {
        startButton.textContent = '🛑 Escuchando...';
    };

    // Evento que se dispara cuando detecta una palabra o frase
    recognition.onresult = (event) => {
        let interimTranscript = '';
        finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + '. ';
            } else {
                interimTranscript += transcript;
            }
        }
        
        // Actualizar el texto final en un nuevo parrafo
        resultDiv.innerHTML = `<p class="final">${finalTranscript}</p>`;
        partialText.textContent = interimTranscript;
    };

    // mostrar errores
    recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
    };

    // mostrar que se termino de escuchar
    recognition.onend = () => {
        startButton.textContent = '🎤 Empezar a Escuchar';
    };

    // logica del boton para empezar a escuchar
    startButton.addEventListener('click', () => {
        recognition.start();
    });
});