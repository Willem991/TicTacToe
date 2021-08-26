const player = (name, type) => {

    let turn = type == "x" ? 1:0;

    return({name, type, turn});
};

const gameBoard = (() => {

    let boardArray = ["","","","","","","","",""];

    const updateBoardArray = (Array1,type, id) => {
        console.log(Array1);
        if(Array1[id] == ""){
            Array1[id] = type;
        }else{
            alert("That slot is take!");
        };

        return Array1;
    };

    const resetBoardArray = (Array1) => {
        Array1 = ["","","","","","","","",""];
        
        return Array1;
    };

    const checkForWin = (boardArray) => {
        let win = [false];

        for(let i = 0; i <= 2; i++){
            
            let j = 0;
            if(i == 1){
                j = 3;
            }else if(i == 2){
                j = 6;
            }

            if(boardArray[0] != "" && boardArray[1] != "" && boardArray[2] != "" && boardArray[3] != "" && boardArray[4] != "" && 
            boardArray[5] != "" && boardArray[6] != "" && boardArray[7] != "" && boardArray[8] != ""){
                
                win = [true, "", "tie"];
            };

            if(boardArray[i] == boardArray[i+3] && boardArray[i] == boardArray[i+6] && boardArray[i] != ""){
                if(boardArray[i] = "x"){
                    win = [true, boardArray[i], "win"];
                }else{
                    win = [true, boardArray[i], "win"];
                };
            };
            if(boardArray[j] == boardArray[j+1] && boardArray[j] == boardArray[j+2] && boardArray[j] != ""){
                if(boardArray[i] = "x"){
                    win = [true, boardArray[i], "win"];
                }else{
                    win = [true, boardArray[i], "win"];
                };
            };
            if(boardArray[2] == boardArray[4] && boardArray[2] == boardArray[6] && boardArray[2] != ""){
                if(boardArray[i] = "x"){
                    win = [true, boardArray[i], "win"];
                }else{
                    win = [true, boardArray[i], "win"];
                };
            };
            if(boardArray[0] == boardArray[4] && boardArray[0] == boardArray[8] && boardArray[0] != ""){
                if(boardArray[i] = "x"){
                    win = [true, boardArray[i], "win"];
                }else{
                    win = [true, boardArray[i], "win"];
                };
            }; 
        };

        

        return win;
    };

    return({boardArray, updateBoardArray, resetBoardArray,checkForWin});
})();

const displayScreen = (() =>{
    
    const writesquare = (array) =>{

        let blocks = document.querySelectorAll(".block");
        
        let divCounter = 0;

        blocks.forEach(element => {

            if(array[divCounter] == "x"){
                element.classList.add('x');

            }else if(array[divCounter] == "o"){
                element.classList.add('o');
            }

            divCounter++;
        });
    };

    const clearScreen = () => {

        let blocks = document.querySelectorAll(".block");

        blocks.forEach(element => {
            element.classList.remove('o');
            element.classList.remove('x');
        });
    };

    const start = () => {
        const boardDisplay = document.querySelector('#gameBoard');
        const characterScreen = document.querySelector('#startPage');

        boardDisplay.classList.add("active");
        boardDisplay.classList.remove("inactive");
        characterScreen.classList.add("inactive");
        characterScreen.classList.remove("active");

    }

    const reset = () =>{
        const boardDisplay = document.querySelector('#gameBoard');
        const characterScreen = document.querySelector('#startPage');
        const winScreen = document.querySelector('#winPage');

        boardDisplay.classList.add("inactive");
        boardDisplay.classList.remove("active");

        characterScreen.classList.add("active");
        characterScreen.classList.remove("inactive");

        winScreen.classList.add('inactive');
        winScreen.classList.remove('active');
    }

    const displayWinScreen = () => {
        const winScreen = document.querySelector('#winPage');

        winScreen.classList.add('active');
        winScreen.classList.remove('inactive');
    } ;


    return({writesquare, clearScreen, start, reset, displayWinScreen})
})();

const formController = (() => {
    const playerBtn = document.querySelector("#selectAI");
    const typeBtn = document.querySelector("#selectType");
    const startBtn = document.querySelector('#start');
    const grid = document.querySelectorAll('.block');
    const menuBtn = document.querySelector('#mainMenu');
    const restartBtn = document.querySelector('#restart');
    
    let depth = 0;
    let player1;
    let player2;
    let playerStatus = "player";
    let typeStatus = "x";
    let typeStatus2 = "o";

    playerBtn.addEventListener('click',() => {
        if(formController.playerStatus == "player"){
            formController.playerStatus = "AI";
            playerBtn.textContent = "AI";
        }else{
            formController.playerStatus = "player";
            playerBtn.textContent = "Player";
        };
    });

    typeBtn.addEventListener('click',() => {
        if(typeStatus == "x"){
            typeStatus = "o";
            typeStatus2 = "x";
            typeBtn.textContent = "O";
        }else{
            typeStatus = "x";
            typeStatus2 = "o";
            typeBtn.textContent = "X";
        };
    });

    const btnIni = () => {
        if(formController.playerStatus == "player"){
            let type = 'x';
            console.log("A");

            grid.forEach(element => {
                element.onclick = () => {
                    gameBoard.boardArray = gameBoard.updateBoardArray(gameBoard.boardArray,type,element.id);
                    displayScreen.writesquare(gameBoard.boardArray);
                    
                    if(type == "x"){
                        type = "o";
                    }else{
                        type = "x";
                    };

                    if(gameBoard.checkForWin(gameBoard.boardArray)[0]){
                        displayScreen.displayWinScreen();
                        type = "x";
                    }
                };
            });
        }else{ 
            console.log("B");
            if(typeStatus == "x"){
                grid.forEach(element => {
                    element.onclick = () => {
                        gameBoard.boardArray = gameBoard.updateBoardArray(gameBoard.boardArray,typeStatus,element.id);
                        depth++
                        if(!gameBoard.checkForWin(gameBoard.boardArray)[0]){
                        gameBoard.boardArray = gameBoard.updateBoardArray(gameBoard.boardArray,typeStatus2,botAI.bestMove(gameBoard.boardArray, typeStatus2));
                        depth++
                        };
                        displayScreen.writesquare(gameBoard.boardArray);
                    };
                });
            };
        };
    };

    const menuBtnCaller = () =>{
        menuBtn.onclick = () => {
            gameBoard.boardArray =  gameBoard.resetBoardArray(gameBoard.boardArray);
            displayScreen.reset();
            displayScreen.clearScreen();
        };
    };


    const startBtnCaller = () => {
        startBtn.addEventListener('click', () => {
            displayScreen.start();
            btnIni();
            menuBtnCaller();
            player1 = player("player", typeStatus);
            player2 = player(playerStatus, typeStatus2);
        });
    };




    return({playerStatus, typeStatus, btnIni, menuBtnCaller, startBtnCaller})

})();


const botAI = (() => {

    

    const minimax = (array1, depth) => {
        return 1;
    }

    const bestMove = (array1, type) => {
        let bestscore = -Infinity;
        let bestMoveval;

        for(let i = 0; i <9; i++){
           if(array1[i] == ""){
            array1[i] = type;
            let score = minimax(array1);
            array1[i] = "";
            if(bestscore < score){
                bestscore = score;
                bestMoveval = i;
            };
           };
        };
        return(bestMoveval);
    };
return({bestMove});    
})();

formController.startBtnCaller();