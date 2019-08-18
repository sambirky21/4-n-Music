import React, { Component } from "react";
import "./categories.css";
import PracticeCard from "../Cards/PracticeCard";

export default class CategoryList extends Component {
  render() {
    return (
      <React.Fragment>
          <h3>4 and | Practice</h3>
          <div className="articleButton mt-3">
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
        <section>
        {
            this.props.Categories.map(category =>
            <div key={category.id} className="container mt-3 list-group-item list-group-item-light text-white">
                <h5>{category.title}</h5>
                <div className="row flex mt-1">
                {
                    this.props.PracticeCards
                        .filter(
                    card =>
                        parseInt(card.userId) ===
                        parseInt(sessionStorage.getItem("userId"))
                        )
                        .filter(card => card.categoryId === category.id)

                        .map(card => (
                        this.props.Sessions

                          .filter(session =>
                            session.userId === parseInt(sessionStorage.getItem("userId")))
                            .map(session =>
                            <PracticeCard key={card.id} session={session} card={card} {...this.props} />)
                        ))
                }
                </div>
            </div>
        )}
        </section>
      </React.Fragment>
    );
  }
}