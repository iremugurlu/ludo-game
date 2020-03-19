function GameState(sb, socket) {
  this.statusBar = sb;
  this.socket = socket;
  this.playerId = null;
  this.currentPlayer = null;
  this.status = Messages.ST_0_JOINT;

  this.diceValue = 0;
  this.allColor = ["red", "green", "yellow", "blue"];
  this.move = 39.5;
  this.position = 0;
  this.pawnNumber = 1;
  this.movingPawn = "";


  this.positions = [
    // top left
    // path positions
    [176.5, 817], [218, 817], [260, 817], [301.5, 817], [343, 817], //0-4
    [343, 858], [343, 899.5], [343, 941], [343, 982.5], [385, 982.5], //5-9
    [426.5, 982.5], [426.5, 941], [426.5, 899.5], [426.5, 858], [426.5, 817], //10-14
    [468, 817], [509.5, 817], [551, 817], [593, 817], [593, 776], //15-19
    [593, 734.5], [551.5, 734.5], [509.5, 734.5], [468, 734.5], [426.5, 734.5], //20-24
    [426.5, 692.5], [426.5, 651], [426.5, 609.7], [426.5, 567.7], [385, 567.7], //25-29
    [343, 567.7], [343, 609.5], [343, 651], [343, 692.5], [343.5, 734.5], //30-34
    [301.5, 734.5],[260, 734.5], [218, 734.5], [176.5, 734.5], [176.5, 776] //35-39
    
  ]

  this.playerPawns = [
    
    //player 1 home
    [197, 921], [197, 962], [238, 921], [238, 962],
    //player 2 home
    [530, 921], [530, 962], [572, 921], [572, 962],
    //plyaer 3 home
    [530, 587], [530, 629], [572, 587], [572, 629],
    //player 4 home
    [197, 587], [197, 629], [238, 587], [238, 629]
  ]

  this.arrivingPoints = [
    // player 1 goal 
    [218.5, 774.5], [260, 774.5], [302, 774.5], [344, 774.5],
    //player 2 goal 
    [384.5, 817], [384.5, 858], [384.5, 899.5], [384.5, 941],
    //player 3 goal 
    [551, 776], [509, 776], [467, 776], [426, 776],
    //player 4 goal  
    [385, 609.7], [385, 651], [385, 693], [385, 817],
  ]
  this.playerIndexes = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  this.startingIndices = [0, 10, 20, 30];

  this.sendMsg = function (msg) {
    console.log("Sending msg: " + msg);
    this.socket.send(msg);
  }

  this.sendMovement = function (elem) {
    if (this.playerId == this.currentPlayer &&
      this.status == Messages.ST_ACTION) {
      let movingMsg = Messages.O_C_MOVE_PAWN;
      movingMsg.playerId = elem.playerId;
      movingMsg.pawnId = elem.pawnId;
      this.sendMsg(JSON.stringify(movingMsg));
    } else {
      console.log("Invalid movement thisPlayer " + this.playerId +
        " currentPlayer " + this.currentPlayer);
    }
  }


  this.handleAbortedGame = function () {
    var delay = 1000;
    setTimeout(function () {
      window.location.href = "/";
    }, delay);
  }

  this.abortGame = function () {
    this.statusBar.setStatus(Status[Messages.ST_ABORTED]);
    this.sendMsg(Messages.S_C_ABORT_GAME);
    this.handleAbortedGame();
  };

  this.setCurrentPlayer = function (playerId) {
    var player = document.getElementById("player");
    player.innerText = "Player " + (playerId + 1);
    this.currentPlayer = playerId;
  }

  this.handleStatusUpdate = function (statusCode) {
    this.status = statusCode;
    this.statusBar.setStatus(Status[statusCode]);
    if (statusCode == Messages.ST_ABORTED) {
      this.handleAbortedGame();
    }
  }

  this.updateButtonState = function () {
    document.getElementById("dice").disabled =
      !(this.currentPlayer == this.playerId);
  }

  this.rollDice = function () {
    console.log(this.playerId);
    console.log(this.currentPlayer);
    if ((this.playerId == this.currentPlayer) &&
      (this.status == Messages.ST_DICE)) {
      this.sendMsg(Messages.S_C_ROLL_DICE);
    } else {
      console.log("Invalid roll thisPlayer " + this.playerId + " currentPlayer " + this.currentPlayer + " Status " + Status[sb.status]);
    }
  }

  this.setDicePic = function (diceValue) {
    this.diceValue = diceValue;
    var dice = document.getElementById('dice');
    dice.src = diceValue + ".jpg";
  }

  this.setStartingPoint = function (playerId, pawnId) {
    let movingPawn = playerId + "_" + pawnId;
    let doc = document.getElementById(movingPawn);
    console.log("Player" + playerId + "'s pawn" + pawnId + "'s starting point is setting");
    if (playerId == 0) {
      console.log("case0");
      this.playerIndexes[playerId][pawnId] = 0;
      doc.style.top = this.positions[0][0] + "px";
      doc.style.left = this.positions[0][1] + "px";
    } else if (playerId == 1) {
      console.log("case1");
      this.playerIndexes[playerId][pawnId] = 10;
      doc.style.top = this.positions[10][0] + "px";
      doc.style.left = this.positions[10][1] + "px";
    } else if (playerId == 2) {
      console.log("case2");
      this.playerIndexes[playerId][pawnId] = 20;
      doc.style.top = this.positions[20][0] + "px";
      doc.style.left = this.positions[20][1] + "px";
    } else {
      console.log("case3");
      this.playerIndexes[playerId][pawnId] = 30;
      doc.style.top = this.positions[30][0] + "px";
      doc.style.left = this.positions[30][1] + "px";
    }
  }

  this.reset = function (playerId, pawnId) {
    console.log(playerId);
    console.log(pawnId);
    console.log("it's resetting");
    var index = playerId * 4 + pawnId;
    var killedPawn = document.getElementById(playerId + "_" + pawnId);
    killedPawn.style.top = this.playerPawns[index][0] + "px";
    console.log(killedPawn.style.top);
    killedPawn.style.left = this.playerPawns[index][1] + "px";
    console.log(killedPawn.style.left);
    this.playerIndexes[playerId][pawnId] = 0;
    let msg = Messages.O_C_PAWN_RESETTED;
    msg.playerId = playerId;
    msg.pawnId = pawnId;
    this.sendMsg(JSON.stringify(msg));

  }

  this.checkSame = function (pawn1_player, pawn1_id, pawn2_player, pawn2_id) {
    var result = false;
    if (pawn1_player != pawn2_player) {
      console.log("players are not same, checking indexes");
      console.log(this.playerIndexes[pawn1_player][pawn1_id]);
      console.log(this.playerIndexes[pawn2_player][pawn2_id]);
      if (this.playerIndexes[pawn1_player][pawn1_id] == this.playerIndexes[pawn2_player][pawn2_id]) {
        console.log("first player is: " + pawn1_player + " and its id: " + pawn1_id);
        console.log("second player is: " + pawn2_player + " and its id: " + pawn2_id);
        console.log("result is true");
        result = true;
      }
    }
    return result;
  }

  this.moveInBoard = function (playerId, pawnId, diceValue) {
    let movingPawn = playerId + "_" + pawnId;
    let doc = document.getElementById(movingPawn);
    this.playerIndexes[playerId][pawnId] = this.playerIndexes[playerId][pawnId] + diceValue;
    var movement = this.playerIndexes[playerId][pawnId] - this.startingIndices[playerId];
    console.log(movement);
    if (movement < 40) {
      let index = this.playerIndexes[playerId][pawnId] % 40;
      if (playerId == 0) {
        console.log("case0");
        doc.style.top = this.positions[index][0] + "px";
        doc.style.left = this.positions[index][1] + "px";
      } else if (playerId == 1) {
        console.log("case1");
        doc.style.top = this.positions[index][0] + "px";
        doc.style.left = this.positions[index][1] + "px";
      } else if (playerId == 2) {
        console.log("case2");
        doc.style.top = this.positions[index][0] + "px";
        doc.style.left = this.positions[index][1] + "px";
      } else {
        console.log("case3");
        doc.style.top = this.positions[index][0] + "px";
        doc.style.left = this.positions[index][1] + "px";
      }

      for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
          console.log("checking whether they are same");
          if (this.checkSame(playerId, pawnId, i, j) == true) {
            console.log("they are same");
            this.reset(i, j);
          }
        }
      }
    } else if (movement == 40) {
      doc.style.top = this.arrivingPoints[4 * playerId][0] + "px";
      doc.style.left = this.arrivingPoints[4 * playerId][1] + "px";
    } else if (movement == 41) {
      doc.style.top = this.arrivingPoints[4 * playerId + 1][0] + "px";
      doc.style.left = this.arrivingPoints[4 * playerId + 1][1] + "px";
    } else if (movement == 42) {
      doc.style.top = this.arrivingPoints[4 * playerId + 2][0] + "px";
      doc.style.left = this.arrivingPoints[4 * playerId + 2][1] + "px";
    } else if (movement == 43) {
      doc.style.top = this.arrivingPoints[4 * playerId + 3][0] + "px";
      doc.style.left = this.arrivingPoints[4 * playerId + 3][1] + "px";
    } else {
      this.statusBar.setStatus(Status[9]);
    }
  }
}

//set everything up, including the WebSocket
(function setup() {
  var socket = new WebSocket(Setup.WEB_SOCKET_URL);
  var sb = new StatusBar();
  var gs = new GameState(sb, socket);

  document.getElementById("dice").disabled = true;

  document.getElementById("quitButton").onclick = function () {
    gs.abortGame();
  }

  document.getElementById("dice").onclick = function () {
    gs.rollDice();
  }

  for (playerIndex = 0; playerIndex < 4; playerIndex++) {
    for (pawnIndex = 0; pawnIndex < 4; pawnIndex++) {
      let obj = document.getElementById(playerIndex + "_" + pawnIndex)
      obj.playerId = playerIndex;
      obj.pawnId = pawnIndex;
      obj.onclick = function () {
        gs.sendMovement(this);
      }
    }
  }

  socket.onmessage = function (event) {
    console.log("Received msg: " + event.data);
    let msg = JSON.parse(event.data);

    if (msg.type == Messages.T_S_STATUS) {
      gs.handleStatusUpdate(msg.data);
    } else if (msg.type == Messages.T_S_DICE_ROLLED) {
      gs.setDicePic(msg.data);
      gs.currentPlayer = msg.playerId;
    } else if (msg.type == Messages.T_S_CURRENT_PLAYER) {
      gs.setCurrentPlayer(msg.data);
      gs.updateButtonState();
    } else if (msg.type == Messages.T_S_INFORM_PLAYER) {
      gs.playerId = msg.data;
      var playerType = document.getElementById('playerType');
      playerType.innerText = "You are player " + (gs.playerId + 1);
    } else if (msg.type == Messages.T_S_PAWN_GO_START) {
      if (gs.currentPlayer == msg.playerId) {
        gs.setStartingPoint(msg.playerId, msg.pawnId);
      }
    } else if (msg.type == Messages.T_S_MOVE_AS_DICE) {
      if (gs.currentPlayer == msg.playerId) {
        gs.moveInBoard(msg.playerId, msg.pawnId, msg.diceValue);
      } else {
        console.log("Ignored pawn move");
      }
    }
  };

  //server sends a close event only if the game was aborted from some side
  socket.onclose = function () {
    sb.setStatus(Status[Messages.ST_ABORTED]);
  };
})(); //execute immediately