import { useState } from 'react'
function checkWin(bord,symbol){
    const winConditions = [
        [0,1,2], [3,4,5],[6,7,8],
        [0,3,6], [1,4,7],[2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winConditions.some(condition=>condition.every(index=>board[index]=== symbol));
}
function App() {
  

  return (
    
  )
}

export default App
