
let size = 50;
let growthAmount = 10;
let growRate = 250;
let color = '#000';
let timerInterval = 0;
    
window.onload = function(){

    const circle = document.querySelector('#circle');
    circle.style.width = size + 'px';
    circle.style.height = size + 'px';
    circle.onclick = deleteCircle;

    const btnStart = document.querySelector('#btn-start');
    btnStart.onclick = function() {
        size = parseInt(document.querySelector('#width').value);
        growthAmount = parseInt(document.querySelector('#growth').value);
        growRate = parseInt(document.querySelector('#rate').value);
        color = document.querySelector('#color').value;

        redrawCircle(size, color);
        timerInterval = setInterval(circleGrowing, growRate, growthAmount);
    };

    timerInterval = setInterval(circleGrowing, growRate, growthAmount);
};

function circleGrowing(amount) {
    const circle = document.querySelector('#circle');
    circle.style.width = parseInt(circle.style.width) + amount + 'px';
    circle.style.height = parseInt(circle.style.height) + amount + 'px';
}

function redrawCircle(size, color) {
    const circle = document.querySelector('#circle');
    circle.style.width = size + 'px';
    circle.style.height = size + 'px';
    circle.style.backgroundColor = color;
    circle.style.display = 'block';
}

function deleteCircle() {
    const circle = document.querySelector('#circle');
    circle.style.display = 'none';
    clearInterval(timerInterval);
}