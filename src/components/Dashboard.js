import React from 'react';
import PassengerInfo from './PassengerInfo';

const ALERT_INTERVAL = 5000;

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // alerts: [],
      // alerts: ["Unknown Driver", "Drowsiness detected"],
      alerts: {}, // {'Unknown driver: interval'}
      passengerInfos: [undefined, undefined, undefined, undefined, undefined]
      // passengerInfos: [{
      //   name: "AAA",
      //   emotion: "neutral",
      //   gender: "female",
      //   age: "teenager"       
      // }, undefined, undefined, undefined, undefined]
    };

    this.alertTimeoutCallback = this.alertTimeoutCallback.bind(this);
  }

  calcPositionNumber(pos) {
    var x1, y1;
    [x1, y1] = pos;
    if (x1 <= 234 && y1 >= 263) {
      return 1;
    }
    else if (x1 >= 771 && y1 >= 204) {
      return 0;
    }
    else if (x1 >= 518 && x1 <= 718 && y1 <= 226) {
      return 3;
    }
    else {
      console.error("Unexpected in car position: ", pos);
    }
  }

  alertTimeoutCallback(alert) {
    this.setState(prevState => {
      const alerts = { ...prevState.alerts };
      clearTimeout(alerts[alert]);
      delete alerts[alert];
      return { alerts };
    });
  }

  componentDidMount() {
    const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
    const webSocket = new WebSocket(protocol + window.location.host);

    webSocket.onmessage = (function onMessage(message) {
      try {
        const messageData = JSON.parse(message.data);
        const rawData = messageData.IotData;

        // Receive alert message
        if (rawData.ALERT) {
          this.setState(prevState => {
            const alerts = { ...prevState.alerts };
            // if already has the alert, reset it
            if (Object.keys(this.state.alerts).includes(rawData.ALERT)) {
              clearTimeout(this.state.alerts[rawData.ALERT]);
            }
            alerts[rawData.ALERT] = setTimeout(() => {
              this.alertTimeoutCallback(rawData.ALERT);
            }, ALERT_INTERVAL);
            return { alerts };
          });
        }
        // Receive detected message
        else if (rawData.Name) {
          const pos = this.calcPositionNumber(rawData.Position);
          const info = {
            name: rawData.Name,
            emotion: rawData.Emotion,
            gender: rawData.Gender,
            age: rawData.Age
          }
          this.setState(prevState => {
            const passengerInfos = prevState.passengerInfos.map((oldInfo, idx) => {
              if (idx === pos) {
                return info;
              } else {
                return oldInfo;
              }
            });
  
            return { passengerInfos };
          });
        }
        // Receive undefined message
        else {
          throw new Error('Undefined message received: ' + JSON.stringify(rawData));
        }
      } catch (err) {
        console.error(err);
      }
    }).bind(this);
  }

  render() {
    return (
      <div>
        <img alt="" src="/in-car.png" style={{"width": "1500px", "height": "800px", "opacity": "0.4"}} />
        {this.state.passengerInfos.map((info, idx) => (
          info && <PassengerInfo key={idx} src="/obama.png" pos={idx} {...info} />
        ))}
        <div style={{"position": "absolute", "left": "460px", "top": "530px"}}>
          {Object.keys(this.state.alerts).map((alert, idx) => <h5 key={idx} className="text-danger">{alert}</h5>)}
        </div>
      </div>
    );
  }
}
