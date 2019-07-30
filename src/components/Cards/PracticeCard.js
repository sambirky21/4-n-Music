import React, { Component } from "react";
// import { Link } from "react-router-dom"
// import { Redirect } from 'react-router'
import "./cards.css";

export default class PracticeCard extends Component {
  render() {
    return (
      <div key={this.props.card.id} className="card w-25 bg-light">
        <div className="card-body">
          <div className="card-title">
            <h5>{this.props.card.title}</h5>
            <button
              type="button"
              className="btn-success"
              onClick={() => {
                this.props.history.push(`/cards/${this.props.card.id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={() =>
                this.props.deletePracticeCard(this.props.card.id)
                // this.props.history.push("/cards");
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}