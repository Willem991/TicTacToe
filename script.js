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

    return({writesquare, clearScreen})
})();

const botAI = (() => {

})();

