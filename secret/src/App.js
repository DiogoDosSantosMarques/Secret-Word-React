// IMPORT DO CSS
import './App.css';

//IMPORT DO REACT
import { useCallback, useEffect, useState } from 'react';

// IMPORT DO WORDLIST DATA
import { wordsList } from './data/Word';

// ESTÁGIOS DO JOGO
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
/* O Jogo terá 2 Estágios o de começo, o do jogo, e o do fim*/
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]





function App() {
const [gameStage, setGameStage] = useState(stages[0].name) /*o 0 Significa que é o stage inicial */
const [words] = useState(wordsList)

// Palavra Escolhida
const [pickedWord, setPickedWord] = useState("");

// Categoria escolhida
const [pickedCategory, setPickedCategory] = useState("");

// Letras Escolhidas
const [letters, setLetters] = useState ([])

//Letras Advinhadas
const [guessedLetters, setguessedLetters] = useState ([])

//Letras Erradas
const [wrongLetters, setwrongLetters] = useState ([])

//Chances Sobrando
const [guesses, setGuesses] = useState(10)

//Pontuação
const [score, setscore] = useState(0)






//Palavra e Categoria
const pickWordAndCategory = () => {

  const categories = Object.keys(words) // As Keys seriam as categorias
  
  // pick Random Category com mathfloor
 const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

 console.log(category)


 //Pick Random Word

 const word = words[category][Math.floor(Math.random() * words[category].length)]; //o Words category é por causa das words la em Word

 console.log(word)

 return {word, category}

  
}


// Clicar no Botão e ir para o Jogo do Advinha
const startGame =  () => {

  // Começar Jogo
setGameStage(stages[1].name)

clearLetterStates()

  //Pick Word and Pick Category
  const { word, category } = pickWordAndCategory()

  // Transformar Palavras em letras usando o split como divisão
  let wordLetters = word.split("")

  wordLetters = wordLetters.map((l) => l.toLowerCase())

  console.log(word, category)
  console.log(wordLetters)

  // Setar estados
  setPickedWord(word)
  setPickedCategory(category)
  setLetters(wordLetters)



}

//  Verificar Letra
const verifyLetter = (letter) => {
 
  const normalizedLetter = letter.toLowerCase()

  //Checar se a Letra ja foi utilizada

  if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {

    return; //Se as letras advinhadas ou as erradas ja foram colocadas retorna de novo
  }


  // push guessed letter or remove a guessed letter
  if (letters.includes(normalizedLetter)) {
    setguessedLetters((actualguessedLetters) => [ 
      ...actualguessedLetters,
      normalizedLetter,
    ]);
  } else {
    setwrongLetters((actualwrongLetters) => [
      ...actualwrongLetters,
      normalizedLetter,
    ]);

    setGuesses((actualGuesses) => actualGuesses -1)

  }



}


  // Reiniciar Jogo
  const retry = () => {
    setscore(0);
    setGuesses(10);
    setGameStage(stages[0].name);
  };

const clearLetterStates = () => { //Retornar as respostas para o vazio
  setguessedLetters([])
  setwrongLetters([])
    }
  
    // Condição de Derrota caso Não tiver mais chances sobrando
    useEffect(() => {
  
      if(guesses < 1) {
        //Resetar todos os States
        clearLetterStates()
    
        setGameStage(stages[2].name)
    
      }
    
    }, [guesses])


    // Checar Condição da Vitória

    useEffect(() => {

      const uniqueLetters = [... new Set(letters)]

      // Condiçaõ de Vitória
      if(guessedLetters.length === uniqueLetters.length) {

        //Adcionar Score
        setscore((actualscore) => (actualscore += 10))

        //Recomeçar Jogo
        startGame()
      }
      
      
    
     

    }, [guessedLetters])



  return (
    <div className="App">
      
      {gameStage === 'start' && <StartScreen startGame={startGame} />}  {/*Quando o gameStage for start exibo o StartScreen */}
      {gameStage  === 'game' && <Game verifyLetter={verifyLetter} 
       pickedWord = {pickedWord}
       pickedCategory={pickedCategory}
       letters={letters}
       guessedLetters={guessedLetters}
       wrongLetters={wrongLetters}
       guesses={guesses}
       score={score}
      />
     }
      {gameStage === 'end' && <GameOver retry = {retry} score = {score} /> }
    
    </div>
  );
}



export default App;
