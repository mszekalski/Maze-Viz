import Board from "./board";

document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  ctx.fillStyle = "transparent";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let board = new Board(ctx, 10);
});
