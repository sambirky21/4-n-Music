import React, { Component } from "react";
// import "./Stopwatch.css";

export default class Timer extends Component {

  componentDidMount() {
  }

  parseTime = () => {let totalTime = this.props.time.elapsedTime;
    let hrs = ~~(totalTime / 3600);
    let mins = ~~((totalTime % 3600) / 60);
    let secs = ~~totalTime % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  render() {

 console.log("this is rendering")
    return (
        <React.Fragment>
      <div key={this.props.index.id} className="timer border">
        <h4>CountDown Timer</h4>
        <span className="timer-time">{<h1 className={`${this.props.isRunning ? "fade" : ""}`}>{this.parseTime()}</h1>}</span>
        <span>{this.props.getTime()}</span>
        <br />
        <button
          onClick={() =>
            this.props.handleTimer(this.props.index, this.props.time)
          }
          type="button"
          className="btn btn-secondary btn-sm stopwatch_button start"
        >
          {this.props.isRunning && this.props.activeTimer === this.props.index
            ? "Pause"
            : "Start"}
        </button>
        <button
        disabled={this.props.activeTimer === null}
          onClick={this.props.handleReset}
          type="button"
          className={`${"btn btn-secondary btn-sm timer_button reset"}`}
       >
          Reset
        </button>
      </div>
      </React.Fragment>
    );
  }
}