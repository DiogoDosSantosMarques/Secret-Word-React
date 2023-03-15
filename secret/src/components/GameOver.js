import React from 'react'
import './GameOver.css'

const GameOver = ({ retry, score, }) => {
  return (
    <div>
      <h1>Você Perdeu</h1>

      <h3>A Sua Pontuação foi: <span>{score}</span></h3>

   <button onClick={retry}>Ir Outra Rodada</button>
    </div>
  )
}

export default GameOver