import React, { useState, useRef } from 'react'
import './Game.css'

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

  const [letter, setLetter] = useState("")

  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)
    setLetter("")

    letterInputRef.current.focus() // Para voltar na digitação da letra automático tornando mais dinâmico
  }

 

  return (
    <div className='game'>

      <p className='points'>
        <span>Pontuação: {score}</span>
</p>

<h1>Advinhe a Palavra</h1>

<h3 className='tip'>
Dica: <span>{pickedCategory}</span>

</h3>

<p>Você ainda tem {guesses} Tentativa(s).</p>

<div className="wordContainer">

{ /* se letras advinhadas incluir em letras imprime a letra, caso contrário retorna vazio*/}
{letters.map((letter, i) =>
          guessedLetters.includes(letter) ? ( 
            <span className="letter" key={i}> 
      
      
      
            
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
 
</div>

<div className="letterContainer">

<p>Tente advinhar uma letra da Palavra</p>

<form onSubmit={handleSubmit}>

<input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
          />

<button>Jogar!!</button>

</form>
</div>

<div className="WrongLetterContainer">

  <p>Letras Erradas:</p>
  
  {wrongLetters.map((letter, i) => (
    <span key = {i}>{letter},</span>
  ))}


</div>
        

        {/*<button onClick={indentifyLetter}>Finalizar Jogo</button>*/}
    </div>
  )
}

export default Game