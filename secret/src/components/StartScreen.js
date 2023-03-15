import React from 'react'
import './StartScreen.css'

const StartScreen = ({ startGame }) => {
  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>Clique Abaixo Para Começar o Advinha </p>
        <button onClick={startGame}>Jogar</button>

    </div>
  )
}

export default StartScreen