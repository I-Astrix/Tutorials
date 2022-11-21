import './App.css';
import Die from './components/Die';
import {useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

    const [dieFace, setDieFace] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);

      useEffect(()=>{
          const allFaceHeld = dieFace.every(die=> die.isHeld);
          const initialFace = dieFace[0].value;
          const allFaceSame = dieFace.every(die=> initialFace === die.value)
          if(allFaceHeld && allFaceSame){
            setTenzies(true);
            document.title = tenzies ? "You Won": "Tenzies"
          }



      }, [dieFace])


      function genNewDie(){
        return {
          id: nanoid(),
          value: (Math.ceil(Math.random()*6)),
          isHeld: false
        }
    }

    function allNewDice(){
      const randomNumbers = [];
          for(let i=0; i< 10; i++){
              randomNumbers.push(genNewDie());
          }
          return randomNumbers;
    }

    function toggleHeld(id){  
      setDieFace(prev=>{
          return prev.map(die=>{
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
          })
      })
    }

    function newGame(){
      setDieFace(allNewDice);
      setTenzies(false)
    }

    function rollDie(){
      // setDieFace(allNewDice())
      setDieFace(prev=>{
        return prev.map(die=>{
          return die.isHeld ? die : genNewDie()
        })
      })
    }

 

  return (
    <>

    {tenzies && <Confetti/>}
    
    <main>
       <h1>{tenzies ? 'You Won' : 'Tenzies'}</h1>
       <p>Roll until all dice are the same. <br/> Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
      
      {dieFace.map(die=>{
         return <Die value={die.value} key={die.id} isHeld={die.isHeld} toggleHeld={toggleHeld} id={die.id}/>
      })}
      
      </div>
      <button onClick={!tenzies? rollDie : newGame} className='dice--roll'>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>

    </>
  );
}

export default App;
