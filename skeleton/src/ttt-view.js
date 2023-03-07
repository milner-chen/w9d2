class View {
  constructor(game, el) {
    this.game = game;
    this.el = el;

    el.append(this.setupBoard());

  }

  setupBoard() {
    const grid = document.createElement('ul');
    grid.style.display = 'flex';
    grid.style.width = '800px';
    grid.style.flexWrap = 'wrap';
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        let tile = document.createElement('li');
        tile.setAttribute('data-pos', [i, j]);
        tile.style.listStyle = 'none';
        tile.style.width = '200px';
        tile.style.height = '200px';
        tile.style.border = '2px solid black';
        tile.style.backgroundColor = 'lightgray';
        grid.append(tile);

      }
    }
    grid.addEventListener('mouseover', event => {
      if (event.target !== event.currentTarget) {
        event.target.style.backgroundColor = 'yellow';
        event.target.style.cursor = 'pointer';
      }
    })

    grid.addEventListener('mouseout', event => {
      if (event.target !== event.currentTarget) {
        event.target.style.backgroundColor = 'lightgray';
      }
    })
    this.grid = grid;

    this.bindEvents();

    return grid;
  }
  
  bindEvents() {
    // debugger;
    this.grid.addEventListener('click', event => {
      this.handleClick(event);
    })
  }

  handleClick(e) {
    let tile = e.target;
    // let oldPlayer = this.game.currentPlayer.duplicate
    let square = tile.getAttribute('data-pos');
    this.makeMove(square.split(",").map(el => parseInt(el)));
    tile.style.backgroundColor = 'white';
    tile.innerText = this.game.currentPlayer;

  }
  
  makeMove(square) {
    // let tile = document.querySelector(`li[data-pos="${square}"]`);
    // debugger;
    this.game.playMove(square, this.game.currentPlayer);
  }

}

module.exports = View;
