
let body = document.querySelector('body');

let num = 64;

let array = new Uint8Array(num*2)

let width = 3;

let logo, myElements, context, analyser, src, height;

let changer = true;

window.onclick = function(){
    changer = !changer; 
    if (context) return;
    body.querySelector('h1').remove();
    body.style.justifyContent = 'space-between'

    for (let i = 0; i < num; i++) {
        logo = document.createElement('div');
        logo.className = 'logo';
        logo.style.background = 'red';
        logo.style.minWidth = width+'px';
        body.appendChild(logo);
    }

    myElements = document.getElementsByClassName('logo');
    context = new AudioContext();
    analyser = context.createAnalyser();
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        src = context.createMediaStreamSource(stream);
        src.connect(analyser);
        loop();
    }).catch(error =>{
        alert(error + 'Страница будет обновлена.');
        location.reload();
    })
}

function loop() {
    window.requestAnimationFrame(loop);
    analyser.getByteFrequencyData(array);

    for (let i = 0; i < num; i++) {
        height = array[i];

        myElements[i].style.boxShadow = '5px 5px 0 black';
        
        if (height > 70) {
            myElements[i].style.background = 'yellow';
        } else {
            myElements[i].style.background = 'red';
        }

        if (changer) {
            body.classList.remove('column');
            myElements[i].style.minHeight = height*2 + 'px';
            myElements[i].style.minWidth = width*2 + 'px';


        } else {
            body.classList.add('column');
            myElements[i].style.minHeight = width*2 + 'px';
            myElements[i].style.minWidth = height*2 + 'px';
        }

        myElements[i].style.opacity = 0.01*height;
    }
}