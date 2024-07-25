function preload(){
    music = loadSound("sample.wav");
    playing = false;
    music.onended( () => { playing = false; 
    document.getElementById('audio').innerText = "Play"; a = 0 })
    fr = 60;

}


function setup(){
    createCanvas(800,800);
    layer = createGraphics(width, height);

    fft = new p5.FFT();

    a = 360/((music.duration()) * fr);
    b = a; 

    frameRate(fr);
    layer.clear();
}

function draw(){ 
    
    background(0);
    layer.noFill();

    var spectrumA = fft.analyze()
    var spectrumB = Array.from(spectrumA).reverse();

    // spectrumB.splice(0,100);


    push();
        translate(width/2, height/2);
        rotate(radians(a));

        layer.push();
            layer.translate(width/2, height/2);
            layer.rotate(radians(-a));

            for (let i = 0; i < spectrumB.length; i ++){

                layer.strokeWeight(0.01 * spectrumB[i])
                layer.stroke(80+spectrumB[i],255,255,spectrumB[i]/50);
                layer.line(0,i/3,0,i/3);
                // arc(0, 0 , i, i, 0, TWO_PI-0.001);
            }
        layer.pop();


        image(layer, -width/2, -height/2);
    pop();

    push();
    translate(400, 400);
    noFill();
    stroke('green');

    beginShape();
        for(let i = 0; i < spectrumB.length; i++){
            var amp = spectrumB[i] *100;
            var x = map(amp, 0, 800, 1, -1);
            var y = map(i ,0,spectrumB.length, 0, 200);
            vertex((y-200)*2,(x)*2);
            
        }

        for (let i = spectrumB.length - 1; i >= 0; i--) {
            var amp = spectrumB[i] * 100;
            var x = map(amp, 0, 800, 1, -1);
            var y = map(i, 0, spectrumB.length, 0, 200);
            vertex(-(y - 200) * 2, x * 2); 
        }
    endShape();

    pop();
        
    if (playing) a += b;

}

function toggleAudio(){
    if(!playing){
        music.play()
        document.getElementById("audio").innerText = " Pause"
    }
    else{

        music.pause()
        document.getElementById("audio").innerText = " Play"
    }

    playing = !playing;
}