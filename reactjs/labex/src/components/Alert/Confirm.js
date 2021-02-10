import * as React from "react";
import "./styles.css";
import { Button } from "./../globalStyles";

// Adapted from https://codesandbox.io/s/kx6yx12l1r?from-embed=&file=/src/index.js:0-1314

export default class ConfirmStatusChange extends React.Component {
  state = {
    open: false,
    callback: null,
  };

  show = (callback) => (event) => {
    event.preventDefault();

    event = {
      ...event,
      target: { ...event.target, value: event.target.value },
    };

    this.setState({
      open: true,
      callback: () => callback(event),
    });
  };

  hide = () => this.setState({ open: false, callback: null });

  confirm = () => {
    this.state.callback();
    this.hide();
  };

  render() {
    return (
      <div>
        {this.props.children(this.show)}

        {this.state.open && (
          <>
            
            <div className="background" onClick={this.hide}>
              <div className="confirm-box">
                <h1>{this.props.title}</h1>
                <hr/>
                <p>{this.props.description}</p>
                <div className="buttons-box">
                  <Button width="100%" onClick={this.confirm}>
                    SIM
                  </Button>
                  <Button width="100%" onClick={this.hide}>
                    NÃO
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
