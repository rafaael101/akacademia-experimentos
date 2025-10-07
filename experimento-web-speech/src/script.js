// Esperamos a que el contenido de la página esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificamos si el navegador es compatible con la Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Tu navegador no soporta la Web Speech API. Por favor, intenta con Chrome o Edge.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-MX'; // Español de México
    recognition.interimResults = true; // Muestra resultados parciales mientras hablas
    recognition.continuous = true; // Sigue escuchando hasta que lo detengas

    const startButton = document.getElementById('startButton');
    const partialText = document.getElementById('partialText');
    const resultDiv = document.getElementById('result');
    let finalTranscript = '';

    // Evento que se dispara cuando el reconocimiento de voz empieza
    recognition.onstart = () => {
        startButton.textContent = '🛑 Escuchando...';
    };

    // Evento que se dispara cuando detecta una palabra o frase
    recognition.onresult = (event) => {
        let interimTranscript = '';
        finalTranscript = ''; // Limpiamos el texto final para reconstruirlo

        for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + '. ';
            } else {
                interimTranscript += transcript;
            }
        }
        
        // Actualizamos el texto final en un nuevo párrafo
        resultDiv.innerHTML = `<p class="final">${finalTranscript}</p>`;
        // Y mostramos lo que se está detectando en tiempo real
        partialText.textContent = interimTranscript;
    };

    // Evento que se dispara si hay un error
    recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
    };

    // Evento que se dispara cuando termina de escuchar
    recognition.onend = () => {
        startButton.textContent = '🎤 Empezar a Escuchar';
    };

    // Lógica del botón para empezar a escuchar
    startButton.addEventListener('click', () => {
        recognition.start();
    });
});