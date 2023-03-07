const View = require("./ttt-view.js")
const Game = require("../ttt_node/game.js")

document.addEventListener("DOMContentLoaded", () => {
  
  const game = new Game();
  window.game = game;

  const figure = document.querySelector('figure');
  window.figure = figure;

  const view = new View(game, figure)
  window.view = view


  // view.grid.addEventListener('hover', () => {

  // })

  
});
