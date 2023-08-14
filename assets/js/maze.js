
$(document).ready(function() {
    let drawActivate = false;
    let drawing = false;
    let color = '#000';
    let prevX = null;
    let prevY = null;

    const context = document.querySelector('#sheet').getContext('2d');
    if(context) context.lineWidth = 2;

    $('#active').on('change', function() {
        drawActivate = !drawActivate;
    });

    $('#color').on('change', function() {
        color = $(this).val();
        console.log(`current color is ${color}`);
    });

    $('#clear').on('click', function() {
        if(!context) return;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    });

    $('#sheet').mousedown(function(event) {
            console.log(event);
        if(drawActivate) {
            if (event.layerX || event.layerX == 0) { // firefox
                prevX = event.layerX;
                prevY = event.layerY;
            } else if (event.offsetX || event.offsetX == 0) { // opera, chrome
                prevX = event.offsetX;
                prevY = event.offsetY;
            }

            drawing = true;
        }
    });

    $('#sheet').mousemove(function(event) {
        if(drawing) {
            if (event.layerX || event.layerX == 0) { // firefox
                var currentX = event.layerX;
                var currentY = event.layerY;
            } else if (event.offsetX || event.offsetX == 0) { // opera, chrome
                var currentX = event.offsetX;
                var currentY = event.offsetY;
            }

            console.log(`prevX is ${prevX}`);
            console.log(`prevY is ${prevY}`);

            console.log(`currentX is ${currentX}`);
            console.log(`currentY is ${currentY}`);
            drawLine(context, color, [prevX, prevY], [currentX, currentY]);

            prevX = currentX; prevY = currentY;
        }
    });

    $('#sheet').mouseleave(function() {

    });

    $('#sheet').mouseup(function() {
        drawing = false;
        prevX = prevY = null;
    });

    function drawLine(context, color, start, end) {
        if(!context) return;

        context.fillStyle = color;
        context.strokeStyle = color;

        context.beginPath();
        context.moveTo(...start);
        context.lineTo(...end);
        context.stroke();
    }
});