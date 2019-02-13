import Board from "./board";

document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 510;
  canvas.height = 510;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const board = new Board(ctx, 25);
  const mazeStartCallback = () => {
    board.resetBoard();
  };
  document
    .getElementById("regenerate")
    .addEventListener("click", mazeStartCallback);
});
