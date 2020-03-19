function Board() {
    this.createBoard = function() {
        //[left, top]
        var positions = [
            // path positions
            ["593px", "705px"], ["551px", "705px"], ["509.5px", "705px"], ["468px", "705px"], ["426.5px", "705px"], ["426.5px", "663px"], ["426.5px", "621.6px"], ["426.5px", "579.6px"], ["426.5px", "537.6px"], ["384.5px", "537.6px"], ["343px", "537.6px"], ["343px", "579.6px"], ["343px", "621.6px"], ["343px", "663px"], ["343.5px", "705px"], ["301.7px", "705px"], ["260.2px", "705px"], ["218.7px", "705px"], ["177px", "705px"], ["177px", "746.5px"], ["176.5px", "706.5px"], ["218px", "706.5px"], ["260px", "706.5px"], ["301.5px", "706.5px"], ["343.5px", "706.5px"], ["343px", "664.5px"], ["343px", "623px"], ["343px", "581.5px"], ["343px", "539.7px"], ["385px", "539.7px"], ["426.5px", "539.7px"], ["426.5px", "581.7px"], ["426.5px", "623px"], ["426.5px", "664.5px"], ["426.5px", "706.5px"], ["468px", "706.5px"], ["509.5px", "706.5px"], ["551.5px", "706.5px"], ["593px", "706.5px"], ["593px", "748px"], 
            // player 1 goal
            ["384.5px", "579.6px"], ["384.5px", "621.6px"], ["384.5px", "663px"], ["384.5px", "705px"],
            // player 2 goal
            ["218.5px", "746.5px"], ["260px", "746.5px"], ["302px", "746.5px"], ["344px", "746.5px"],
            //player 3 goal
            ["385px", "581px"], ["385px", "623px"], ["385px", "665px"], ["385px", "706.5px"],
            //player 4 goal
            ["551px", "748px"], ["509px", "748px"], ["467px", "748px"], ["426px", "748px"],
        ]
        
        var playerPawns = [
            // player 1 home
            [["197px", "559px"], ["197px", "601px"], ["238px", "559px"], ["238px", "601px"]], //blue
            //player 2 home
            [["197px", "893px"], ["197px", "934px"], ["238px", "893px"], ["238px", "934px"]],
            //player 3 home
            [["530px", "893px"], ["530px", "934px"], ["572px", "893px"], ["572px", "934px"]],
            //plyaer 4 home
            [["530px", "559px"], ["530px", "934px"], ["572px", "559px"], ["572px", "601px"]],
        ]

        function getPawnElemId (playerIndex, pawnIndex) {
            return playerIndex + "_" + pawnIndex;
        }
        
        function update() {
          for (playerIndex=0; playerIndex < playerPawns.length; playerIndex++) {
            for (pawnIndex=0; pawnIndex < playerPawns[playerIndex].length; pawnIndex++) {
                playerPawns[playerIndex][pawnIndex] = (playerPawns[playerIndex][pawnIndex] + 1) % positions.length;
                let elem = document.getElementById(getPawnElemId(playerIndex, pawnIndex));
                let pos = positions[playerPawns[playerIndex][pawnIndex]];
                elem.style.top = pos[0] + 'px';
                elem.style.left = pos[1] + 'px';
                elem.style.visibility = 'visible';
            }
          }
        }
    }

    
}