import React from 'react';

export default class PassengerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftPosMap: ['680px', '680px', '920px', '920px', '920px'],
      topPosMap: ['510px', '250px', '510px', '380px', '250px'],
      emoColorMap: {
        neutral: 'text-primary',
        happiness: 'text-success',
        surprise: 'text-warning',
        sadness: 'text-dark',
        anger: 'text-danger',
        disgust: 'text-info',
        fear: 'text-light',
        contempt: 'text-secondary'
      }
    };
  }

  getEmoji = (gender, age) => {
    if (age === 'baby') {
      return <span role="img" aria-label="male-child" style={{"fontSize": "50px"}}>👶</span>
    }
    else if (gender === 'male') {
      switch (age) {
        case 'child':
          return <span role="img" aria-label="male-child" style={{"fontSize": "50px"}}>👦</span>
        case 'teenager':
          return <span role="img" aria-label="male-teen" style={{"fontSize": "50px"}}>🧑</span>
        case 'adult':
          return <span role="img" aria-label="male-adult" style={{"fontSize": "50px"}}>👨</span>
        default:
          break;
      }
    }
    else if (gender === 'female') {
      switch (age) {
        case 'child':
          return <span role="img" aria-label="female-child" style={{"fontSize": "50px"}}>🧒</span>
        case 'teenager':
          return <span role="img" aria-label="female-teen" style={{"fontSize": "50px"}}>👧</span>
        case 'adult':
          return <span role="img" aria-label="female-adult" style={{"fontSize": "50px"}}>👩</span>
        default:
          break;
      }
    }

    return <span role="img" aria-label="alien" style={{"fontSize": "50px"}}>🎅</span>
  }

  render() {
    return (
      <div
        style={{
          "position": "absolute",
          "width": "220px",
          "height": "110px",
          "left": this.state.leftPosMap[this.props.pos],
          "top": this.state.topPosMap[this.props.pos]
        }}
        className="d-flex justify-content-around"
      >
        <div className="d-flex flex-column justify-content-around text-center">
          <h6>Name: <span className="text-info">{this.props.name}</span></h6>
          <h6>Age: <span className="text-info">{this.props.age}</span></h6>
          <h6>Emotion: <span className={this.state.emoColorMap[this.props.emotion]}>{this.props.emotion}</span></h6>
          <h6>Gender: <span className={this.props.gender === 'male' ? 'text-primary' : 'text-danger'}>{this.props.gender}</span></h6>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {this.getEmoji(this.props.gender, this.props.age)}
        </div>
      </div>
    );
  }
};
