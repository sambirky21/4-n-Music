import React, { Component } from "react";
import "./sessions.css";
import PracticeCard from "../Cards/PracticeCard"
import Timer from "../Timer/Timer"

export default class SessionList extends Component {

    state = {
        time: [],
        activeTimer: null,
        isRunning: false,
        elapsedTime: null
    };

    componentDidMount() {
        this.getCardsInSession(this.state.time);
        // doubt the above would would because its an aray you are passing in....
        this.intervalID = setInterval(() => this.tick(), 1000);
        this.getTime();
      }

      componentWillUnmount() {
        clearInterval(this.intervalID);
      }

      getCardsInSession = () => {
        this.props.PracticeSessionCards
            .filter( data =>
                data.userId === parseInt(sessionStorage.getItem("userId")))
            .map(data => {
                return this.props.PracticeCards
                .filter(card =>
                (data.cardId === card.id))
            })
            // return this.setState({ time: card.time })
    }

    getTime = () => {
        let timeOfEachSessionCard = 0
        this.state.time.forEach(cardTime =>{
          timeOfEachSessionCard += parseInt(cardTime.time)
          return timeOfEachSessionCard
      })
      let hrs = ~~(timeOfEachSessionCard / 3600);
      let mins = ~~((timeOfEachSessionCard % 3600) / 60);
      let secs = ~~timeOfEachSessionCard % 60;

      let ret = "";

      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }

      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    }

    startTimer = async index => {
        await this.setState({ activeTimer: index });
      };

    startNextTimer = () => {
        this.setState({ activeTimer: this.state.activeTimer + 1 })
    }

    handleTimer = index => {
        this.setState(prevState => ({
          isRunning: !prevState.isRunning
        }));
        this.startTimer(index);
    };

    handleReset = () => {
        this.setState(prevState => {
          let resetCardTime = [...prevState.time];
          resetCardTime[prevState.activeTimer].elapsedTime =
            resetCardTime[prevState.activeTimer].time;

          return {
            time: resetCardTime
          };
        });
    };

    tick = () => {
        // reduce time by 1 second by creating a copy of the exercise object in state and overwriting the elapsed time every second.
        if (this.state.isRunning) {
          this.setState(prevState => {
            const cardTime = [...prevState.time];
            cardTime[prevState.activeTimer].elapsedTime -= 1;

            return {
              time: cardTime
            };
          });
          //Timer audio and stop functionality
          if (
            this.state.time.length === this.state.activeTimer + 1 &&
            this.state.time[this.state.activeTimer].elapsedTime === 0
          ) {
            this.setState({ isRunning: false });
            this.handleReset();
          }
          //   when countdown finishes
          //   reset isRunning bool
          //   reset clock
          else if (this.state.time[this.state.activeTimer].elapsedTime <= 0) {
            // this.setState({ isRunning: false });
            this.handleReset();
            this.startNextTimer();
          }
        }
      };



    render() {
    // console.log("sessions 1", this.props.Sessions)
    return (

      <React.Fragment>
        <header className="flex center">Practice Session</header>

        <section>
            <article className="timer">
            {this.state.time.map((time, index) => (
                <Timer
                key={time.id}
                // not sure on above
                time={time}
                index={index}
                startTimer={this.startTimer}
                startNextTimer={this.startNextTimer}
                handleTimer={this.handleTimer}
                handleReset={this.handleReset}
                activeTimer={this.state.activeTimer}
                isRunning={this.state.isRunning}
                />
            ))}
            </article>
        </section>

        <section>
            {/* going to filter over all PracticeSessionCards then map over Practice Cards */}
            {   this.props.Sessions.filter(session =>
                    session.userId === parseInt(sessionStorage.getItem("userId")))
                .map(session =>
                <div key={session.id} className="container mt-3 list-group-item list-group-item-light bg-secondary text-white">

                    <div className="row flex mt-1">
                    {
                        this.props.PracticeSessionCards
                            .filter( data =>
                                data.userId === parseInt(sessionStorage.getItem("userId")))
                            .map(data => {
                                return this.props.PracticeCards
                                .filter(card =>
                                (data.cardId === card.id))
                                .map(card => <PracticeCard key={card.id} session={session} data={data} card={card} {...this.props} />)
                                }
                            )
                    }
                    </div>
                </div>
                )
            }
        </section>
      </React.Fragment>
    );
  }
}
// .map(session => <PracticeCard key={session.id} session={session} {...this.props} />)

// if(this.props.Sessions.userId === parseInt(sessionStorage.getItem("userId")))

 // session.userId === parseInt(sessionStorage.getItem("userId"))
                // .filter(session =>
                //     session.userId === parseInt(sessionStorage.getItem("userId")))

// {
//     this.props.Sessions.map(session =>
//     <div key={session.id} className="container mt-3 list-group-item list-group-item-light bg-secondary text-white">
//         <div className="row flex mt-1">
//         {
//             this.props.PracticeSessionCards
//                 .filter( data =>
//                     parseInt(data.userId) === parseInt(sessionStorage.getItem("userId")))
//                 .filter(data =>
//                     (data.practiceId === session.id) && (data.cardId === this.props.PracticeCards.id))
//                 .map(card => <PracticeCard key={card.id} card={card} {...this.props} />
//                 )
//         }
//         </div>
//     </div>
//     )
// }

// {
//     this.props.PracticeSessionCards
//         .filter( card => {
//             console.log("first filter", card)
//             return card.userId === parseInt(sessionStorage.getItem("userId"))})
//         // .map this.prop.PracticeCards
//             .filter( card => {
//             console.log("second filter", card)
//             return card.cardId === this.props.PracticeCards.id && card.practiceId === this.props.Sessions.id })
//         .map(card => {
//             console.log("map filter", card)
//             // return this.props.PracticeCards
//             //     .filter(card => card.id === this.props.PracticeSessionCards.userId)
//             //     .map(card => {
//                 // console.log("map filter 2", card)
//                 return <PracticeCard key={card.id} card={card} {...this.props} />
//         })
// }

// {
//     this.props.PracticeSessionCards
//         .filter( card =>
//             card.userId === parseInt(sessionStorage.getItem("userId")) && this.props.PracticeCards.id === card.cardId && this.props.Sessions.id === card.practiceId)
//         .map(card => {
//             console.log("card", card)
//             return <PracticeCard key={card.id} card={card} {...this.props} />}
//         )
// }

// {
//     this.props.PracticeSessionCards
//         .filter( card =>
//             parseInt(card.userId) === parseInt(sessionStorage.getItem("userId")))
//         .filter( card =>
//             parseInt(this.props.PracticeCards.id) === parseInt(card.cardId) && parseInt(this.props.Sessions.id) === parseInt(card.practiceId))
//         .map(data =>
//             this.props.PracticeCards
//             .filter(card => card.id === data.userId )
//             .map(<PracticeCard key={card.id} card={card} {...this.props} />)
//         )
// }

// {
//     this.props.PracticeSessionCards
//         .filter( card =>
//             parseInt(card.userId) === parseInt(sessionStorage.getItem("userId")))
//         .filter( card =>
//             parseInt(this.props.PracticeCards.id) === parseInt(card.cardId) && parseInt(this.props.Sessions.id) === parseInt(card.practiceId))
//         .map(card => <PracticeCard key={card.id} card={card} {...this.props} />
//         )
// }