import React from 'react';
import './Game.css';
import Wand from '../Images/Magic wand.svg';

const basicArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const basicShortArray = [1, 2];

// shuffle method had taken from stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
const shuffle = (array) => {
  let resultArray = array.slice();
  let currentIndex = resultArray.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = resultArray[currentIndex];
    resultArray[currentIndex] = resultArray[randomIndex];
    resultArray[randomIndex] = temporaryValue;
  }
  return resultArray.slice(0, 8);
};

export class GameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerArray: shuffle(basicArray),
      winnerShortArray: [Math.round(Math.random()),],
      userRandomArray: shuffle(basicArray),
      userRandomShortArray: [Math.round(Math.random()),],
      userChosenArray: [],
      userShortArray: [],
      result: undefined,
      resultResponse: '',
    };
  }

  compareArrays = (arr1, arr2) => {
    if (arr1.length === arr2.length) {
      let y = 0;
      for (let i in arr2) {
        // eslint-disable-next-line
        if (arr1.indexOf(arr2[i]) > -1) y++;
      }
      return y;
    }
    return false;
  };
  chooseNumbers = (value, array, maxElement) => {
    const index = array.indexOf(value);
    const pushToArray = value => {
      if (!(array.length === maxElement)) array.push(value);
    };
    index > -1 ? array.splice(index, 1) : pushToArray(value);
    this.setState({
      array,
    });
    console.log(array);
  };
  checkChosenNumbers = (value) => (this.state.userChosenArray.indexOf(value) > -1 ? ' chosen-field' : '');
  checkChosenNumber = (value) => (this.state.userShortArray.indexOf(value) > -1 ? ' chosen-field' : '');
  getResult = () => {
    const res1 = this.compareArrays(this.state.winnerArray, this.state.userChosenArray);
    const res2 = this.compareArrays(this.state.winnerShortArray, this.state.userShortArray);
    let result;
    if (res1 === false || res2 === false) {
      if (res1 === false) {
        result = 'Выбрано недостаточно чисел в Полях 1 и 2'
      }
      this.setState({
        result,
      });
      return false;
    }
    result = 'Общее число совпадений: ' + (res1 + res2);
    this.setState({
      result,
    });
    this.checkWinnerRedirect(result);
    return res1 + res2;
  };
  getRandomResult = () => {
    const res1 = this.compareArrays(this.state.winnerArray, this.state.userRandomArray);
    const res2 = this.compareArrays(this.state.winnerShortArray, this.state.userRandomShortArray);
    const result = res1 + res2;
    this.setState({
      result,
    });
    console.log('Общее число совпадений: ', res1 + res2);
    this.checkWinnerRedirect(result);
    return result;
  };
  checkWinnerRedirect = (result) => {
    if (result > 3) window.location.href='/result/'+result;
  };

  render() {
    const {winnerArray, userRandomArray, userChosenArray, userShortArray, result} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Билет 1</h1>
          <button onClick={() => this.getRandomResult()}><img src={Wand} alt="Magic wand"/>
          </button>
        </header>
        <div className="App-content game">
          <div className="game-title">
            <h3>Поле 1</h3>
            <span>Отметьте 8 чисел.</span>
          </div>
          <div className="game-field">
            {basicArray.map(i => <span key={i} className={`number-field${this.checkChosenNumbers(i)}`}
                                       onClick={() => this.chooseNumbers(i, userChosenArray, 8)}>{i}</span>)}
          </div>
          <div className="game-title">
            <h3>Поле 2</h3>
            <span>Отметьте 1 число.</span>
          </div>
          <div className="game-field game-field__left-align">
            {basicShortArray.map(i => <span key={i} className={`number-field${this.checkChosenNumber(i)}`}
                                            onClick={() => this.chooseNumbers(i, userShortArray, 1)}>{i}</span>)}
          </div>
          <div>
            Победные номера:
            {winnerArray.map(i => <span key={i} className="array-field">{i}</span>)}
            <br/>
            Случайные номера по клику палочки:
            {userRandomArray.map(i => <span key={i} className="array-field">{i}</span>)}
          </div>
          {userChosenArray}
        </div>
        <div>
          <a
            href="/"
            onClick={() => this.getResult()}
          >
            Проверить выбранные числа
          </a>
        </div>
        {result ? <div className="result">{result}</div> : ''}
      </div>
    )
  }
}

export default GameComponent;
