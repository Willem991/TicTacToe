const player = (name, type) => {

    let turn = type == "x" ? 1:0;

    return({name, type, turn});
};

const gameBoard = (() => {

    let boardArray = ["x","x","x","o","x","o","x","o","x"];

    const updateBoardArray = (type, id) => {
        boardArray[id] = type;
    };

    const resetBoardArray = () => {
        boardArray = [];
    };

    const checkForWin = () => {
        
        for(let i = 0; i <= 3; i++){
            if(boardArray[i] == boardArray[i+3] && boardArray[i] == boardArray[i+6] && boardArray[i] != ""){
                return [true, boardArray[i]]
            }else if(boardArray[i] == boardArray[i+1] && boardArray[i] == boardArray[i+2] && boardArray[i] != ""){
                return [true, boardArray[i]]
            }else if(i != 1 && boardArray[i] == boardArray[5] && boardArray[i] == boardArray[i+8] && boardArray[i] != ""){
                return [true, boardArray[i]]
            }else{
                return false
            };
        };
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

            }else{
                element.classList.add('o');
                console.log(element);
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
    let playerStatus = "player";
    let typeStatus = "x";

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
            typeBtn.textContent = "O";
        }else{
            typeStatus = "x";
            typeBtn.textContent = "X";
        };
    });

    startBtn.addEventListener('click', () => {
        displayScreen.start();
    });

    return({playerStatus, typeStatus})

})();


const botAI = (() => {

})();

