import React from 'react';

export default class PassengerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftPosMap: [this.props.imgWidth*0.46, this.props.imgWidth*0.46, this.props.imgWidth*0.625, this.props.imgWidth*0.625, this.props.imgWidth*0.625],
      // leftPosMap: ['680px', '680px', '920px', '920px', '920px'],
      topPosMap: [this.props.imgWidth*0.31, this.props.imgWidth*0.14, this.props.imgWidth*0.31, this.props.imgWidth*0.225, this.props.imgWidth*0.14],
      // topPosMap: ['510px', '250px', '510px', '380px', '250px'],
      emoColorMap: {
        neutral: 'text-primary',
        happiness: 'text-success',
        surprise: 'text-warning',
        sadness: 'text-dark',
        anger: 'text-danger',
        disgust: 'text-info',
        fear: 'text-light',
        contempt: 'text-secondary'
      },
      emojiSize: '3.5vw'
    };
  }

  getEmoji = (gender, age) => {
    if (age === 'baby') {
      return <span role="img" aria-label="male-child" style={{"fontSize": this.state.emojiSize}}>👶</span>
    }
    else if (gender === 'male') {
      switch (age) {
        case 'child':
          return <span role="img" aria-label="male-child" style={{"fontSize": this.state.emojiSize}}>👦</span>
        case 'teenager':
          return <span role="img" aria-label="male-teen" style={{"fontSize": this.state.emojiSize}}>🧑</span>
        case 'adult':
          return <span role="img" aria-label="male-adult" style={{"fontSize": this.state.emojiSize}}>👨</span>
        default:
          break;
      }
    }
    else if (gender === 'female') {
      switch (age) {
        case 'child':
          return <span role="img" aria-label="female-child" style={{"fontSize": this.state.emojiSize}}>🧒</span>
        case 'teenager':
          return <span role="img" aria-label="female-teen" style={{"fontSize": this.state.emojiSize}}>👧</span>
        case 'adult':
          return <span role="img" aria-label="female-adult" style={{"fontSize": this.state.emojiSize}}>👩</span>
        default:
          break;
      }
    }
    else if (gender === 'pets') {
      switch (age) {
        case 'cat':
          return <span role="img" aria-label="pets-cat" style={{"fontSize": this.state.emojiSize}}>🐱</span>          
        case 'dog':
            return <span role="img" aria-label="pets-dog" style={{"fontSize": this.state.emojiSize}}>🐶</span>
        default:
          break;
      }
    }

    return <span role="img" aria-label="alien" style={{"fontSize": this.state.emojiSize}}>🎅</span>
  }

  componentWillReceiveProps(newProps) {
    const oldProps = this.props;
    if (oldProps.imgWidth !== newProps.imgWidth) {
      this.setState(state => ({
        leftPosMap: [newProps.imgWidth*0.46, newProps.imgWidth*0.46, newProps.imgWidth*0.625, newProps.imgWidth*0.625, newProps.imgWidth*0.625],
        topPosMap: [newProps.imgWidth*0.31, newProps.imgWidth*0.14, newProps.imgWidth*0.31, newProps.imgWidth*0.225, newProps.imgWidth*0.14],
      }));
    }
  }

  render() {
    return (
      <div
        style={{
          "position": "absolute",
          // "width": "220px",
          "width": this.props.imgWidth * 0.15,
          // "height": "110px",
          "height": this.props.imgWidth * 0.07,
          "left": this.state.leftPosMap[this.props.pos],
          "top": this.state.topPosMap[this.props.pos]
        }}
        className="d-flex justify-content-around"
      >
        <div className="d-flex flex-column justify-content-around text-center">
          {
            this.props.name ? (
              <>
                <h6 className="info-text mb-0">Name: <span className="text-info">{this.props.name}</span></h6>
                <h6 className="info-text mb-0">Age: <span className="text-info">{this.props.age}</span></h6>
                <h6 className="info-text mb-0">Emotion: <span className={this.state.emoColorMap[this.props.emotion]}>{this.props.emotion}</span></h6>
                <h6 className="info-text mb-0">Gender: <span className={this.props.gender === 'male' ? 'text-primary' : 'text-danger'}>{this.props.gender}</span></h6>
              </>
            ) : (
              <>
                <h6>Label: <span className="text-info">{this.props.label}</span></h6>
              </>
            )
          }
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {
            this.props.name ? this.getEmoji(this.props.gender, this.props.age)
                            : this.getEmoji('pets', this.props.label)
          }
        </div>
      </div>
    );
  }
};
