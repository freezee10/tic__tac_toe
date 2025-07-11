function createPlayer(marker)
{

  return {marker};
}

const GameFlow = (function() {
  const player1 = createPlayer("O");
  const player2 = createPlayer("X");
  const marker = "O";
  const proceedTurn = function(marker, x, y) 
  {
    GameBoard.board[x][y] = marker;
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

  return { proceedTurn, checkTieOrWin }
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
  }
}


GameFlow.proceedTurn("X", 0, 1);
GameFlow.proceedTurn("X", 0, 0);
GameFlow.proceedTurn("X", 0, 0);
GameFlow.proceedTurn("X", 2, 2);
GameFlow.proceedTurn("X", 1, 1);




let stat = GameFlow.checkTieOrWin();
console.log(stat);