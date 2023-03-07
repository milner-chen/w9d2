class View {
  constructor(game, el) {
    this.game = game;
    this.el = el;

    el.append(this.setupBoard());

  }

  setupBoard() {
    const grid = document.createElement('ul');
    grid.style.display = 'flex';
    grid.style.width = '650px';
    grid.style.flexWrap = 'wrap';
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        let tile = document.createElement('li');
        let p = document.createElement('p');
        tile.setAttribute('data-pos', [i, j]);
        tile.setAttribute('data-marked', false)
        tile.style.listStyle = 'none';
        tile.style.width = '200px';
        tile.style.height = '200px';
        tile.style.border = '2px solid black';
        tile.style.backgroundColor = 'lightgray';
        tile.style.display = 'flex';
        tile.style.justifyContent = 'center';
        tile.style.alignItems = 'center';
        p.style.pointerEvents = 'none';
        tile.append(p);
        grid.append(tile);

      }
    }
    grid.addEventListener('mouseover', event => {
      // debugger
      if (event.target !== event.currentTarget && event.target.dataset.marked === 'false') {
        event.target.style.backgroundColor = 'antiquewhite';
        event.target.style.cursor = 'pointer';
      }
    })

    grid.addEventListener('mouseout', event => {
      if (event.target !== event.currentTarget && event.target.dataset.marked === 'false') {
        event.target.style.backgroundColor = 'lightgray';
      }
    })
    this.grid = grid;

    this.bindEvents();

    return grid;
  }
  
  bindEvents() {
    this.grid.addEventListener('click', event => {
      // let oldPlayer = this.game.currentPlayer.slice();
      this.handleClick(event);

      if (this.game.isOver()) {
        let gameOverMsg = document.createElement('h1');
        if (this.game.winner() === 'o') {
          gameOverMsg.innerText = 'Player X Wins!'
        } else if (this.game.winner() === 'x') {
          gameOverMsg.innerText = 'Player O Wins!'
        } else {
          gameOverMsg.innerText = 'Nobody Wins!'

        }
        figure.append(gameOverMsg)
        this.grid.style.pointerEvents = 'none';
      }
    })
  }

  handleClick(e) {
    let tile = e.target;
    let text = tile.children[0];
    let square = tile.getAttribute('data-pos');
    // debugger
    this.makeMove(square.split(",").map(el => parseInt(el)));
    tile.style.backgroundColor = 'white';
    text.innerText = this.game.currentPlayer;
    this.game.currentPlayer === 'x' ? text.style.color = 'lightsteelblue' : text.style.color = 'darkseagreen'
    tile.setAttribute('data-marked', 'true')
    event.target.style.cursor = 'auto'

  }
  
  makeMove(square) {
    try {
      this.game.playMove(square, this.game.currentPlayer);
    } catch(err) {
      alert("You can't move there silly!")
    }
  }

}

module.exports = View;
