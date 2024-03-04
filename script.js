document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    let drawing = false;

    function startDrawing(e) {
        e.preventDefault(); 
        drawing = true;
        draw(e);
    }

    function draw(e) {
        e.preventDefault(); 

        if (!drawing) return;

        let clientX, clientY;

        if (e.type === "touchmove" || e.type === "touchstart") {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const rect = canvas.getBoundingClientRect();
        context.lineWidth = 5;
        context.lineCap = "round";
        context.strokeStyle = "#000";

        context.lineTo(clientX - rect.left, clientY - rect.top);
        context.stroke();
        context.beginPath();
        context.moveTo(clientX - rect.left, clientY - rect.top);
    }

    function stopDrawing() {
        drawing = false;
        context.beginPath();
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);
});
