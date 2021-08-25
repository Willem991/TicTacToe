const player = (name, type) => {

    let turn = type == "x" ? 1:0;

    return({name, type, turn});
};

const gameBoard = (() => {

    let boardArray = ["","","","","","","","",""];

    const updateBoardArray = (type, id) => {
        if(boardArray[id] == ""){
            boardArray[id] = type;
        }else{
            alert("That slot is take!");
        };
    };

    const resetBoardArray = () => {
        boardArray = ["","","","","","","","",""];
    };

    const checkForWin = () => {
        let win = [false];

        for(let i = 0; i <= 2; i++){
            
            let j = 0;
            if(i == 1){
                j = 3;
            }else if(i == 2){
                j = 6;
            }

            if(boardArray[i] == boardArray[i+3] && boardArray[i] == boardArray[i+6] && boardArray[i] != ""){
                win = [true, boardArray[i]];
            };
            if(boardArray[j] == boardArray[j+1] && boardArray[j] == boardArray[j+2] && boardArray[j] != ""){
                win = [true, boardArray[i]];
            };
            if(boardArray[2] == boardArray[4] && boardArray[2] == boardArray[6] && boardArray[2] != ""){
               win = [true, boardArray[i]];
            };
            if(boardArray[0] == boardArray[4] && boardArray[0] == boardArray[8] && boardArray[0] != ""){
                win = [true, boardArray[i]];
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
        boardDisplay.classList.add("inactive");
        boardDisplay.classList.remove("active");
        characterScreen.classList.add("active");
        characterScreen.classList.remove("inactive");
    }

    return({writesquare, clearScreen, start, reset})
})();

const formController = (() => {
    const playerBtn = document.querySelector("#selectAI");
    const typeBtn = document.querySelector("#selectType");
    const startBtn = document.querySelector('#start');
    const grid = document.querySelectorAll('.block');
    
    let player1;
    let player2;
    let playerStatus = "player";
    let typeStatus = "x";
    let typeStatus2 = "o";

    playerBtn.addEventListener('click',() => {
        if(playerStatus == "player"){
            playerStatus = "AI";
            playerBtn.textContent = "AI";
        }else{
            playerStatus = "player";
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

    startBtn.addEventListener('click', () => {
        displayScreen.start();
        player1 = player("player", typeStatus);
        player2 = player(playerStatus, typeStatus2);
    });

    if(playerStatus == "player"){
        let type = 'x';

        grid.forEach(element => {
            element.addEventListener('click', () => {
                gameBoard.updateBoardArray(type,element.id);
                displayScreen.writesquare(gameBoard.boardArray);
                console.log(gameBoard.checkForWin()[0])
                if(type == "x"){
                    type = "o";
                }else{
                    type = "x";
                };
            });
        });
    }else{

    };

    return({playerStatus, typeStatus})

})();


const botAI = (() => {

})();

