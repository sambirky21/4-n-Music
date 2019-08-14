import React, { Component } from "react";
// import { Link } from "react-router-dom"
// import { Redirect } from 'react-router'
import "./cards.css";

export default class PracticeCard extends Component {

  createPracticeSessionCard = evt => {
    evt.preventDefault()
      const createPSCard = {
        userId: parseInt(sessionStorage.getItem("userId")),
        practiceId: parseInt(this.props.session.id),
        cardId: parseInt(this.props.card.id)
      };
      this.props.createPracticeSessionObject(createPSCard)
        .then(() => this.props.history.push("/cards"))
  }
  render() {
    if(window.location.href.includes("cards")) {
    return (
      <div key={this.props.card.id} className="card w-25 bg-light">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-dark">{this.props.card.title}</h5>
            <p className="text-dark">{this.props.card.description}</p>
            <p className="text-dark">{~~(this.props.card.time/60)} minute(s)</p>
            <button
              type="button"
              className="btn btn-warning btn-sm"
              onClick={this.createPracticeSessionCard}
            >
              Add To Practice
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => {
                this.props.history.push(`/cards/${this.props.card.id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() =>
                this.props.deletePracticeCard(this.props.card.id)
                // this.props.history.push("/cards");
              }
            >
              Delete
            </button>
            {/* <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() =>
                this.props.deletePracticeSessionCard(this.props.data.id)
                // this.props.history.push("/cards");
              }
            >
              Remove
            </button> */}
          </div>
        </div>
      </div>
    )}
    else if(window.location.href.includes("practice")) {
      return (
        <div key={this.props.card.id} className="card w-25 bg-light">
          <div className="card-body">
            <div className="card-title">
              <h5 className="text-dark">{this.props.card.title}</h5>
              <p className="text-dark">{this.props.card.description}</p>
              <p className="text-dark">{(this.props.card.time/60)} minute(s)</p>
              {/* <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={this.createPracticeSessionCard}
              >
                Add To Practice
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => {
                  this.props.history.push(`/cards/${this.props.card.id}/edit`);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() =>
                  this.props.deletePracticeCard(this.props.card.id)
                  // this.props.history.push("/cards");
                }
              >
                Delete
              </button> */}
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  this.props.deletePracticeSessionCard(this.props.data.id);
                  // this.props.history.push("/practice")
                }
                }
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    }
  }