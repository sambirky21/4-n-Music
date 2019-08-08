import React, { Component } from "react";
// import "./Stopwatch.css";

export default class Timer extends Component {
    componentDidMount() {
        console.log("the properties of time in timer when mounted", this.props.time)
  }

  parseTime = () => {let totalTime = this.props.time.elapsedTime;
    console.log("totaltime in parse time",totalTime)
    let hrs = ~~(totalTime / 3600);
    let mins = ~~((totalTime % 3600) / 60);
    let secs = ~~totalTime % 60;
    console.log("minutes from parse time", mins)
    console.log("seconds from partse time", secs)

    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  render() {

//  console.log("this is rendering")
    return (
    <React.Fragment>
      <div key={this.props.time.id} className="card card-body">
        <h4>CountDown Timer</h4>
        <span className="timer-time">{<h1>{this.parseTime()}</h1>}</span>
        {/* <span><h2>{`${this.props.getTime(this.props.time)}`}</h2></span> */}
        {/* <h2>{this.props.time}</h2> */}
        <br />
        <button
            type="button"
            className="btn btn-success btn-sm text-dark"
          onClick={() =>
            this.props.handleTimer(this.props.index, this.props.time)
          }
        //   type="button"
        //   className="btn btn-secondary btn-sm stopwatch_button start"
        >
          {this.props.isRunning && this.props.activeTimer === this.props.index
            ? "Pause"
            : "Start"}
        </button>
        <button
            type="button"
            className="btn btn-warning btn-sm text-dark"
        disabled={this.props.activeTimer === null}
          onClick={this.props.handleReset}
        //   type="button"
        //   className={`${"btn btn-secondary btn-sm timer_button reset"}`}
       >
          Reset
        </button>
      </div>
    </React.Fragment>
    );
  }
}
// className={`${this.props.isRunning ? "fade" : ""}`}