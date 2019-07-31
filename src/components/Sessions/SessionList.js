import React, { Component } from "react";
import "./sessions.css";
import PracticeCard from "../Cards/PracticeCard"

export default class SessionList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="news">
          {this.props.PracticeCards
            .map(card => (
              <PracticeCard key={card.id} card={card} {...this.props} />
            ))
          }
        </section>
      </React.Fragment>
    );
  }
}