const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleAdd
const restartButton = document.getElementById('restartButton')
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleAdd = false
    cellElements.forEach (cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}



function handleClick(e){
  const cell = e.target
  const currentClass = circleAdd ? CIRCLE_CLASS : X_CLASS
  //palce a sign
  placeMark(cell, currentClass)
  //CHECK WINNER
  if(checkWin(currentClass)) {
    endGame(false)
  }else if(isDraw()){
      endGame(true)
  } else{
    switchTurn()
    setBoardHoverClass()
  }
}


function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = "Cats game!"
    }else {
        winningMessageTextElement.innerText = `${circleAdd ? "O" : "X"} has Win!`
    }
    winningMessageElement.classList.add('show')
}


function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function switchTurn(){
    circleAdd = !circleAdd
}

function setBoardHoverClass() {
board.classList.remove(X_CLASS)
board.classList.remove(CIRCLE_CLASS)
   if(circleAdd){
       board.classList.add(CIRCLE_CLASS)
   }else{
       board.classList.add(X_CLASS)
   }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
