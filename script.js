const player = (name, type) => {

    let turn = type == "x" ? 1:0;

    return({name, type, turn});
};

const gameBoard = (() => {

    let boardArray = ["x","o","x","o","x","o","x","o","x"];

    return({boardArray});
})();

const displayScreen = (() =>{
    
    const writesquare = (array) =>{
        const blocks = document.querySelectorAll(".block");
        let divCounter = 0;

        blocks.forEach(element => {

            if(array[divCounter] == "x"){
                element.style.backgroundColor = "red";
            }else{
                element.style.backgroundColor = "blue";
            }

            divCounter++;
        });
    };

    return({writesquare})
})();

const botAI = (() => {

})();
