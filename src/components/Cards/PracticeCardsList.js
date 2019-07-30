import React, { Component } from "react";
import "./cards.css";
import PracticeCard from "./PracticeCard";

export default class PracticeCardsList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="articleButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/cards/new");
            }}
          >
            Add Practice Card
          </button>
        </div>
        <section className="news">
          {this.props.PracticeCards
            .filter(
              card =>
                parseInt(card.userId) ===
                parseInt(sessionStorage.getItem("userId"))
            )
            .map(card => (
              <PracticeCard key={card.id} card={card} {...this.props} />
            ))
          }
        </section>
      </React.Fragment>
    );
  }
}