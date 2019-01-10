import Board from "./board";

document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const board = new Board(ctx, 25);
  document.getElementById("regenerate").addEventListener("click", function() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    new Board(ctx, 25);
  });
});
