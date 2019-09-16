import React from 'react';

export class Result extends React.Component {
  render() {
    const {result} = this.props.match.params;
    return (
      <div className="App">
        Congratulations! You are a winner with {result} right numbers!
      </div>
    )
  }
}

export default Result;