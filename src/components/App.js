import React from 'react';
import '../styles/App.css';
import Topbar from './Topbar';
import PassengerInfo from './PassengerInfo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curDevice: '',
      alerts: [],
      alerts: ['Unknown Driver', 'Yawn'],
      passengerInfos: [undefined, undefined, undefined, undefined, undefined],
      passengerInfos: [{
        name: "AAA",
        emotion: "neutral",
        gender: "female",
        age: "teenager"       
      }, {
        name: "AAA",
        emotion: "neutral",
        gender: "female",
        age: "teenager"       
      }, {
        name: "AAA",
        emotion: "neutral",
        gender: "female",
        age: "teenager"       
      }, {
        name: "AAA",
        emotion: "neutral",
        gender: "female",
        age: "teenager"       
      }, {
        name: "AAA",
        emotion: "neutral",
        gender: "female",
        age: "teenager"       
      }],
      imgWidth: 1500
    };
  }

  calcPositionNumber = (pos) => {
    var x1, y1, x2, y2;
    [x1, y1, x2, y2] = pos;
    var x = (x1 + x2) / 2;
    var y = (y1 + y2) / 2;
    if (x <= 334 && y >= 313) {
      return 1;
    }
    else if (x >= 771 && y >= 254) {
      return 0;
    }
    else if (x >= 568 && x <= 768 && y <= 300) {
      return 3;
    }
    else {
      console.error("Unexpected in car position: ", pos);
    }
  }

  resetMessages = () => {
    this.setState(state => ({
      alerts: [],
      passengerInfos: [undefined, undefined, undefined, undefined, undefined]
    }));
  }

  updateDimensions = () => {
    var body = document.getElementsByTagName('body')[0];
    // this.setState(state => ({imgWidth: body.clientWidth * 0.8}));
    this.setState(state => ({imgWidth: body.clientWidth * 0.99}));
  }

  onDeviceChange = (curDevice) => {
    this.setState(state => ({ curDevice }));
    this.resetMessages();
  }

  onMessage = (message) => {
    try {
      const rawData = JSON.parse(message.data).IotData;

      if (rawData[0] && rawData[0].DeviceID !== this.state.curDevice) {
        return;
      }

      // reset all messages from last frame
      this.resetMessages();

      rawData.forEach(data => {
        // alert message
        if (data.ALERT) {
          this.setState(prevState => ({ alerts: [...prevState.alerts, data.ALERT]}));
        }

        // human or pet detected
        else if (data.Position) {
          const pos = this.calcPositionNumber(data.Position);
          let info = {};
          if (data.Name) { // human
            info.name = data.Name;
            info.emotion = data.Emotion;
            info.gender = data.Gender;
            info.age = data.Age;
          }
          else if (data.Label) { // pet
            info.label = data.Label;
          }
          this.setState(prevState => {
            const passengerInfos = prevState.passengerInfos.map((oldInfo, idx) => {
              if (idx === pos) {
                return info;
              }
              else {
                return oldInfo;
              }
            });
            return { passengerInfos };
          });
        }

        // undefined message
        else {
          throw new Error('Undefined message received: ' + JSON.stringify(rawData));
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
    const webSocket = new WebSocket(protocol + window.location.host);

    webSocket.onmessage = this.onMessage;

    // add resize widow listener
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {

    return (
      <div className="App container-fluid p-0">
        <Topbar onDeviceChange={this.onDeviceChange} />

        <div className="row w-100 mx-0">
          {/* <div className="col-sm"></div> */}
          {/* <div className="col-sm-10"> */}
          <div className="col px-0">
            <img alt="" src="/in-car-trans.png" style={{"width": this.state.imgWidth, "height": this.state.imgWidth*0.53, "opacity": "0.4"}} />
            {this.state.passengerInfos.map((info, idx) => (
              info && <PassengerInfo key={idx} pos={idx} imgWidth={this.state.imgWidth} {...info} />
            ))}
            <div style={{"position": "absolute", "left": this.state.imgWidth*0.33, "top": this.state.imgWidth*0.32}}>
              {this.state.alerts.map((alert, idx) => <h6 key={idx} className="text-danger info-text">{alert}</h6>)}
            </div>
          </div>
          {/* <div className="col-sm"></div> */}
        </div>

      </div>
    );
  }
};
