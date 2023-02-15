// IMPORT IMAGES 

// Images are imported from the img file
import state1 from '../img/state1.GIF'
import state2 from '../img/state2.GIF'
import state3 from '../img/state3.GIF'
import state4 from '../img/state4.GIF'
import state5 from '../img/state5.GIF'
import state6 from '../img/state6.GIF'
import state7 from '../img/state7.GIF'
import state8 from '../img/state8.GIF'
import state9 from '../img/state9.GIF'
import state10 from '../img/state10.gif'
import state11 from '../img/state11.GIF'

// IMPORT COMPONENTS 
import React, { useState, useEffect } from 'react';
import { Wordlist } from '../API_Data/Words';
import { HangmanImage } from './HangmanImg';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// This stateful functional component contains relevant setters, states and functions to manage the game
export const Hangman = () => {

// This state variable tracks the random word imported from the API array in 'API_DATA' folder  
  const [word, setWord] = useState('');
//  This state variable initialises an empty array to track the character guesses input by the user
  const [guesses, setGuesses] = useState([]);

//  This state variable tracks the value typed into the input which is then used to evaluate if the character matches any in the random word array (function further below) 
  const [guess, setGuess] = useState('');

// This state variable tracks a number to be used to determine which hangman image to use   
  const [imgNum, setImgNum] = useState(1);

// This state variable tracks which img to use from the imgStates array and passes it into the HandmanImage component
  const [img, setImg] = useState(state1);

// This state variable tracks the number of mistakes
  const [mistakes, setMistakes] = useState(0);

// This state variable tracks if the game is won or lost 
  const [gameOver, setGameOver] = useState(false);


// This array contains all the image imports to be easier passed in to the HangmanImage component and looped over
  let imgStates = [state1, state2, state3, state4, state5, state6, state7, state8, state9, state10, state11];

// This useEffect function sets the random word on initial render 
  useEffect(() => {
    setWord(Wordlist[Math.floor(Math.random() * Wordlist.length)].toUpperCase());
  }, []);

// This function first prevents the form submission default from the submit button, initialises the new guess char, and sets the new Guesses by the past in variable and resets the input to blank. 
  const handleGuess = e => {
    e.preventDefault();
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setGuess('');

// This if statement then takes the guess value, evaluates if it is NOT included in the word array split and if not, increments the number of mistakes, the img number, and then sets the imgValue based on the mistake sequence. 
    if (!word.includes(guess)) {
      setMistakes(mistakes + 1);
      setImgNum(imgNum + 1);
      let stateSelect = imgStates[imgNum]
      setImg(stateSelect)
    }

// This if statement then filters the newGuesses array and evaluates if the array length is equal to 10 (the max number of hangman images) and if so, sets 'GameOver' state variable to true 
    if (newGuesses.filter(guess => !word.includes(guess)).length === 10) {
      setGameOver(true);
    }

// This if statement splits the random word generation from the useEffect function into an array of individual characters then evaluates each word against each char in the newGuesses array and if all evaluate true, gameOver is set to true 
    if (word.split('').every(letter => newGuesses.includes(letter))) {
      setGameOver(true);
    }
  };

// This function returns the guessed word to then displayed when the user wins or loses the game
  const getGuessedWord = () => {
    return word
      .split('')
      .map(letter => (guesses.includes(letter) ? letter : '_'))
      .join(' ');
  };

// This function filters the guesses array and returns each letter that does not match the evaluation of the array and returns the char to display the wrong letters. 
  const getWrongLetters = () => {
    return guesses.filter(letter => !word.includes(letter));
  };

// This variable assigns 10 as the max number of guesses allowed (as this is the max number of images)
  const maxMistakes = 10;

//   Return function renders the component 
  return (
    <Container className='hangman_container'>
        <Row>
            <Col sm={12}>
            <h3 className='mistake_header'>Number of mistakes: {mistakes}</h3>
            <HangmanImage 
            stateImg = {img}
            />
            </Col>
        </Row>

        <Row className='letter_guess_row'>
        <h4 className='wrong_letter_header'>
          Wrong letters:  {getWrongLetters().join(', ')}</h4>
            <p className="lead">{getGuessedWord()}</p>
            <Col sm={{ span: 2, offset: 5  }} className="letter_guess_col">

          {!gameOver && mistakes < maxMistakes && getGuessedWord() !== word ? (
            <Form onSubmit={handleGuess} className="guess_form">
              <Form.Group controlId="formGuess" className='guess_input'>
                <Form.Label>Guess a letter:</Form.Label>
                <Form.Control
                  type="text"
                  value={guess}
                  onChange={e => setGuess(e.target.value.toUpperCase())}
                  maxLength={1}
                  className="guess_input_field"
                />
              </Form.Group>
              <Button type="submit" variant="info">
                Click or press enter
              </Button>
            </Form>
          ) : (
            <div className="lead">
              {mistakes === maxMistakes ? 
              `You lost! The word was ${word}`
              : 'You won!'}
              <Button variant='success' onClick={() => window.location.reload(false)}>Play Again?</Button>
            </div>


          )}
            </Col>
        </Row>

    </Container>
  );
};

