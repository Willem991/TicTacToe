const player = (name, type) => {

    let turn = type == "x" ? 1:0;

    return({name, type, turn});
};

const gameBoard = (() => {

    let boardArray = ["","","","","","","","",""];

    const updateBoardArray = (Array1,type, id) => {

        let checker =true;
        if(Array1[id] == ""){
            Array1[id] = type;
            checker =true;
        }else{
            alert("That slot is take!");
            checker =false;

        };

        return [Array1,checker];
    };

    const resetBoardArray = (Array1) => {
        Array1 = ["","","","","","","","",""];
        
        return Array1;
    };

    const checkForWin = (boardArray) => {

        let win = [false, "", "no win"];

        if(boardArray[0] != "" && boardArray[1] != "" && boardArray[2] != "" && boardArray[3] != "" && boardArray[4] != "" && boardArray[5] != "" && boardArray[6] != "" && boardArray[7] != "" && boardArray[8] != ""){
                
            win = [true, "", "tie"];
        };

        for(let i = 0; i <= 2; i++){

            if(boardArray[i] == boardArray[i+3] && boardArray[i] == boardArray[i+6] && boardArray[i] != ""){

                win = [true, boardArray[i], "win"];
            };
        };

        for(let j = 0; j<8; j=j+3 ){

            if(boardArray[j] == boardArray[j+1] && boardArray[j] == boardArray[j+2] && boardArray[j] != ""){

                win = [true, boardArray[j], "win"];
            };
        };

        if(boardArray[2] == boardArray[4] && boardArray[2] == boardArray[6] && boardArray[2] != ""){
                
            win = [true, boardArray[2], "win"];
        };

        if(boardArray[0] == boardArray[4] && boardArray[0] == boardArray[8] && boardArray[0] != ""){

            win = [true, boardArray[0], "win"];
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


            grid.forEach(element => {
                element.onclick = () => {
                    gameBoard.boardArray = gameBoard.updateBoardArray(gameBoard.boardArray,type,element.id)[0];
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

            if(typeStatus == "x"){
                grid.forEach(element => {
                    element.onclick = () => {
                        
                        let holder = gameBoard.updateBoardArray(gameBoard.boardArray,typeStatus,element.id);
                        let checker  = holder[1];
                        gameBoard.boardArray = holder[0];


                        if(!gameBoard.checkForWin(gameBoard.boardArray)[0] && checker){

                            gameBoard.boardArray = gameBoard.updateBoardArray(gameBoard.boardArray,typeStatus2,botAI.bestMove(gameBoard.boardArray, typeStatus2, typeStatus))[0];

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

    

    const minimax = (array1, depth, type, othertype, constype) => {

        if(gameBoard.checkForWin(array1)[0]){
            if(type == gameBoard.checkForWin(array1)[1]){

                return 1;
            }else if(gameBoard.checkForWin(array1)[1] == othertype){

                return -1;
            }else if(gameBoard.checkForWin(array1)[2] == "tie"){

                return 0;
            };
        };

        if(constype == type){
            let bestscore = -Infinity;
            constype = othertype;

            for(let i = 0; i <9; i++){
                if(array1[i] == ""){
                    array1[i] = type;
                    let score = minimax(array1, depth + 1, type,othertype, constype);
                    array1[i] = "";

                    bestscore = Math.max(score, bestscore);
                };
            };

            return bestscore;

        };
        
        if(constype == othertype){
            let bestscore = Infinity;
            constype = type;

            for(let i = 0; i <9; i++){
                if(array1[i] == ""){
                    array1[i] = othertype;
                    let score = minimax(array1, depth + 1, type, othertype, constype);
                    array1[i] = "";

                    bestscore =  Math.min(score, bestscore); 

                };
            };

            return bestscore;
        };

    };

    const bestMove = (array1, type, type2) => {
        let bestscore = -Infinity;
        let bestMoveval;
        let constype = type2;
        let depth = 0;

        for(let i = 0; i <9; i++){
           if(array1[i] == ""){
                array1[i] = type;
                let score = minimax(array1, depth, type, type2, constype);

                array1[i] = "";
                if(bestscore < score){
                bestscore = Math.max(score, bestscore);

                bestMoveval = i;

            };
           };
        };
        return(bestMoveval);
    };
return({bestMove});    
})();

formController.startBtnCaller();