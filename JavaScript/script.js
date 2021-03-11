const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [                                      //Making an array of winners
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]
const cellElement = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')                      //Get board element on hover
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)                  //Every time we click on it we call our start game function

function startGame(){                                               //To get initial X hover
    circleTurn = false
    cellElement.forEach(cell =>{                                    //Loop through all cells
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')              //To remove the show class on clicking restart
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    // Check For Win
    if(checkWin(currentClass)){
        endGame(false)
    }
    // Check For Draw
    else if(isDraw()){
        endGame(true)
    }
    // Switch Turns
    else{
        swapTurns()
        setBoardHoverClass()
    }
    
}

function endGame(draw){                                             //Check if its a draw or not!!
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }   
    else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')

}

function isDraw(){                                                  //Every element is filled
    return [...cellElement].every(cell => {                         //Destructure into array to get every element
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

//Function to get hover element
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

//Function to check win
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cellElement[index].classList.contains(currentClass)
        })
    })
}