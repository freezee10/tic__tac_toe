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
    if(GameBoard.board[0][1] === GameBoard.board[0][0] && GameBoard.board[0][2] === GameBoard.board[0][0] && GameBoard.board[0][0] !== "_")
    {
       // check to make sure all are -> non _
      
       return { status: "victory", marker: GameBoard.board[0][0] };
    } 
    else if(GameBoard.board[1][1] === GameBoard.board[1][0] && GameBoard.board[1][2] === GameBoard.board[1][0] && GameBoard.board[1][0] !== "_")
    {
      return { status: "victory", marker: GameBoard.board[1][0] };
    }
    else if(GameBoard.board[2][1] === GameBoard.board[2][0] && GameBoard.board[2][2] === GameBoard.board[0][0] && GameBoard.board[2][0] !== "_")
    {
      return { status: "victory", marker: GameBoard.board[2][0] };
    }  // checks horizontal victories
      // checks vertical victories
    else if(GameBoard.board[1][0] === GameBoard.board[0][0] && GameBoard.board[2][0] === GameBoard.board[0][0] && GameBoard.board[0][0] !== "_")
    {
      return { status: "victory", marker: GameBoard.board[0][0] };
    } 
    else if( GameBoard.board[1][1] === GameBoard.board[0][1] && GameBoard.board[2][1] === GameBoard.board[0][1] && GameBoard.board[0][1] !== "_" )
    {
      return { status: "victory", marker: GameBoard.board[0][1] };
    }
    else if( GameBoard.board[1][2] === GameBoard.board[0][2] && GameBoard.board[2][2] === GameBoard.board[0][2] && GameBoard.board[0][2] !== "_" )
    {
      return { status: "victory", marker: GameBoard.board[0][2] };
    }
    else if( GameBoard.board[1][1] === GameBoard.board[0][0] && GameBoard.board[2][2] === GameBoard.board[0][0] && GameBoard.board[0][0] !== "_")
    {
      return { status: "victory", marker: GameBoard.board[0][0] };
    }
    // checks diagonal victorie
    else if( GameBoard.board[1][1] === GameBoard.board[0][2] && GameBoard.board[2][0] === GameBoard.board[0][2] && GameBoard.board[0][2] !== "_")
    {
      return { status: "victory", marker: GameBoard.board[0][2] };
    }

    // check tie
    let count = 0;
    for(row of GameBoard.board)
    {
      for(e of row)
      {
        if(e !== "_")
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
    ["_","_","_"],
    ["_","_","_"],
    ["_","_","_"]
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
  const domFunctionality = function()
  {
    let slots = document.querySelectorAll('.slot');
    slots.forEach((slot) => {
      slot.addEventListener('click', () => {
        let x = +slot.dataset.slot.substring(0,1);
        let y = +slot.dataset.slot.substring(2);
        let marker = GameFlow.getMarker();
        let end = GameFlow.proceedTurn(marker, x, y);
        if(end)
        {
          return;
        }
      
        document.querySelector(`[data-slot="${x}-${y}"]`).innerHTML = marker;
        GameFlow.flipMarker();

        // check for end
        if(GameFlow.checkTieOrWin().status === "victory")
        {
          document.querySelector('.result').innerHTML = "winner;";
        }
        else if(GameFlow.checkTieOrWin().status === "tie")
        {
           document.querySelector('.result').innerHTML = "tie;";
        }
      })
    })
  }


 
 
 return { domFunctionality};
 
 
 }) ();

GameBoard.createHTML();
PlayGame.domFunctionality();

//let stat = GameFlow.checkTieOrWin();
//console.log(stat);