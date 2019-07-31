import React, { Component } from "react";
import "./sessions.css";
import PracticeCard from "../Cards/PracticeCard"

export default class SessionList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="container">
            {/* going to filter over all PracticeSessionCards then map over Practice Cards */}
            <div>
            {
                this.props.PracticeSessionCards
                    .filter( card =>
                        parseInt(card.userId) === parseInt(sessionStorage.getItem("userId")))
                    .filter( card =>
                        parseInt(this.props.PracticeCards.id) === parseInt(card.cardId) && parseInt(this.props.Sessions.id) === parseInt(card.practiceId))
                    .map(data =>
                        this.props.PracticeCards
                        .filter(card => card.id === data.userId )
                        .map(card => <PracticeCard key={card.id} card={card} {...this.props} />)
                    )
            }
            </div>
        </section>
      </React.Fragment>
    );
  }
}

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