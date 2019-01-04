import Board from "./board";

document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 600;
  let board = new Board(ctx);
});
