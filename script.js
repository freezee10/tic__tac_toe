function createPlayer(marker)
{

  return {marker};
}

const GameFlow = (function() {
  const player1 = createPlayer("O");
  const player2 = createPlayer("X");
  let marker = "O";
  const proceedTurn = function(mkr, x, y) 
  {
    if(GameBoard.board[x][y] === "O" || GameBoard.board[x][y] === "X")
    {
      return true;
    }
    GameBoard.board[x][y] = mkr;
  }

  const getMarker = function()
  {
    return marker;
  }

  const flipMarker = function()
  {
    if(marker === "O")
    {
      marker = "X";
    }
    else
    {
      marker = "O";
    }
  }
  const checkTieOrWin = function()
  {
    if(GameBoard.board[0][1] === GameBoard.board[0][0] && GameBoard.board[0][2] === GameBoard.board[0][0] && GameBoard.board[0][0] !== "")
    {
       // check to make sure all are -> non _
      
       return { status: "victory", marker: GameBoard.board[0][0] };
    } 
    else if(GameBoard.board[1][1] === GameBoard.board[1][0] && GameBoard.board[1][2] === GameBoard.board[1][0] && GameBoard.board[1][0] !== "")
    {
      return { status: "victory", marker: GameBoard.board[1][0] };
    }
    else if(GameBoard.board[2][1] === GameBoard.board[2][0] && GameBoard.board[2][2] === GameBoard.board[0][0] && GameBoard.board[2][0] !== "")
    {
      return { status: "victory", marker: GameBoard.board[2][0] };
    }  // checks horizontal victories
      // checks vertical victories
    else if(GameBoard.board[1][0] === GameBoard.board[0][0] && GameBoard.board[2][0] === GameBoard.board[0][0] && GameBoard.board[0][0] !== "")
    {
      return { status: "victory", marker: GameBoard.board[0][0] };
    } 
    else if( GameBoard.board[1][1] === GameBoard.board[0][1] && GameBoard.board[2][1] === GameBoard.board[0][1] && GameBoard.board[0][1] !== "" )
    {
      return { status: "victory", marker: GameBoard.board[0][1] };
    }
    else if( GameBoard.board[1][2] === GameBoard.board[0][2] && GameBoard.board[2][2] === GameBoard.board[0][2] && GameBoard.board[0][2] !== "" )
    {
      return { status: "victory", marker: GameBoard.board[0][2] };
    }
    else if( GameBoard.board[1][1] === GameBoard.board[0][0] && GameBoard.board[2][2] === GameBoard.board[0][0] && GameBoard.board[0][0] !== "")
    {
      return { status: "victory", marker: GameBoard.board[0][0] };
    }
    // checks diagonal victorie
    else if( GameBoard.board[1][1] === GameBoard.board[0][2] && GameBoard.board[2][0] === GameBoard.board[0][2] && GameBoard.board[0][2] !== "")
    {
      return { status: "victory", marker: GameBoard.board[0][2] };
    }

    // check tie
    let count = 0;
    for(row of GameBoard.board)
    {
      for(e of row)
      {
        if(e !== "")
        {
          count++;
        }
      }
    }
    if(count === 9)
    {
      return { status: "tie", marker:"none"};
    }

    return { status: "keep", marker: "none"};
  }

  return { getMarker, proceedTurn, checkTieOrWin, flipMarker }
}) ();

let GameBoard = {
  board: [
    ["","",""],
    ["","",""],
    ["","",""]
  ]
  ,
  printBoard: function () {
    console.log(this.board);
  },
  createHTML: function() {
    let html = "";
    for(let i = 0; i < 3; i++)
    {
      for(let j = 0; j < 3; j++)
      {
        html += `<div class="slot" data-slot="${i}-${j}"> ${GameBoard.board[i][j]} </div>`;
      }
    }
    document.querySelector('.board').innerHTML = html;
    // put in the html
  }
}

const PlayGame = (function() {
  const domFunc = function(e) 
  {
     document.querySelector('#click').play();
     let x = +e.target.dataset.slot.substring(0,1);
       let y = +e.target.dataset.slot.substring(2);
        let marker = GameFlow.getMarker();
        let end = GameFlow.proceedTurn(marker, x, y);
        if(end)
        {
          return;
        }
      
        let output = document.querySelector(`[data-slot="${x}-${y}"]`);
        updateWithAnimation(output, marker);
        GameFlow.flipMarker();

        // check for end
        if(GameFlow.checkTieOrWin().status === "victory")
        {
          let res = document.createElement('div');
          res.textContent = `${GameFlow.checkTieOrWin().marker} Wins!`;
          document.querySelector('.outer').appendChild(res);
          
          removeDomFunctionality();
          const restartBtn = document.createElement('button');
          restartBtn.textContent = "restart";
          restartBtn.classList.add('restartBtn');
          const ou = document.createElement('div');
          ou.appendChild(restartBtn);
          document.querySelector('.outer').appendChild(ou);
            restartBtn.addEventListener('click', () => {
              res.remove();
               ou.remove();
                  restartBtn.remove();
                 GameBoard.board = [["","",""],
                                   ["","",""],
                                   ["","",""]];
             GameBoard.createHTML();
             PlayGame.domFunctionality();
          })
        }
        else if(GameFlow.checkTieOrWin().status === "tie")
        {
          let res = document.createElement('div');
          res.textContent = `${GameFlow.checkTieOrWin().marker} Wins!`;
          document.querySelector('.outer').appendChild(res);
          
          removeDomFunctionality();
          const restartBtn = document.createElement('button');
          restartBtn.textContent = "restart";
          restartBtn.classList.add('restartBtn');
          const ou = document.createElement('div');
          ou.appendChild(restartBtn);
          document.querySelector('.outer').appendChild(ou);
            restartBtn.addEventListener('click', () => {
                  res.remove();
                  ou.remove();
                  restartBtn.remove();
                 GameBoard.board = [["","",""],
                                   ["","",""],
                                   ["","",""]];
             GameBoard.createHTML();
             PlayGame.domFunctionality();
          })
        }
  }
  const domFunctionality = function()
  {
    let slots = document.querySelectorAll('.slot');
    slots.forEach((slot) => {
      slot.addEventListener('click', domFunc);
    })
  }

  const removeDomFunctionality = function()
  {
    let slots = document.querySelectorAll('.slot');
    slots.forEach((slot) => {
      slot.removeEventListener('click', domFunc);
    })
  }


 
 
 return { domFunctionality};
 
 
 }) ();

// start logic here




document.querySelector("#start-button").addEventListener('click', () => {
  GameBoard.createHTML();
  PlayGame.domFunctionality();
})



function updateWithAnimation(element, newHTML) {
  // Remove previous animation class if already there
  element.classList.remove('animate-show');

  // Update innerHTML
  element.innerHTML = newHTML;

  // Force reflow (important!)
  void element.offsetWidth;

  // Re-add animation class
  element.classList.add('animate-show');
}
