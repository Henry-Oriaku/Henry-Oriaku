/**
 * @author `Henry Oriaku`
 * Email: `Horiaku80@gmail.com`
 * Phone: `+2349057058765`
 * 
 * Henizer is a lightweight audio visualizer that take only three arguments:
 * @param canvas_id The Canvas Id of the Canvas that will hold the Visualizer
 * @param audio:Audio The Audio Element that holds the song src
 * @param style The color |  pattern [Optional]
 * 
 * 
 * @example
 * Usage:
 * 
 * let audio = new Audio('url/path');
 * 
 * //OR
 * 
 * let audio = document.getElementById('audio');
 * 
 * let color = 'white' or '#fff' or 'rgb(255, 255, 255)';
 * 
 * Henizer('canvas id', audio, color);
 * 
 * //OR
 * 
 * let ctx = document.getElementById('canvas').getContext('2d');
 * 
 * let pattern = ctx.createLinearGradient(0,0,200,0);
 * 
 * pattern.addColorStop(0, 'red');
 * 
 * pattern.addColorStop(1, 'blue');
 * 
 * Henizer('canvas id', audio, pattern);
 * 
 */

function Henizer(canvas_id, audio, style /**color |  pattern*/) {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    let canvas = document.getElementById(canvas_id);



    let audioSource = null;
    let analyser = null;

    audioSource = audioCtx.createMediaElementSource(audio);
    analyser = audioCtx.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 128;
    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    function visualize() {
        analyser.getByteFrequencyData(dataArray);

        const barWidth = canvas.width / 2 / bufferLength;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        x1 = 0;
        x2 = barWidth * bufferLength;
        for (let i = 0; i < bufferLength; i++) {


            let rate = 100 / 270 * dataArray[i];

            let correspond_height = ((canvas.height - 5) / 100) * rate;

            let red = (rate * i) / 5;
            let green = i * 2;
            let blue = rate / 2 - 6;

            ctx.fillStyle = style ? style : `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(
                canvas.width / 2 - x1,
                canvas.height - correspond_height, barWidth, correspond_height);

            x1 += barWidth;

            ctx.fillRect(x2 /*5 */, canvas.height - correspond_height, barWidth, correspond_height);
            x2 += barWidth;

        }
        requestAnimationFrame(visualize);
    };

    visualize();

}