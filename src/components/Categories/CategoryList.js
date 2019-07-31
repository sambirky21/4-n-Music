import React, { Component } from "react";
import "./categories.css";
import PracticeCard from "../Cards/PracticeCard";

export default class CategoryList extends Component {
  render() {
    return (
      <React.Fragment>
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
            <div key={category.id} className="container mt-3 list-group-item list-group-item-light bg-secondary text-white">
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
                        .map(card => <PracticeCard key={card.id} card={card} {...this.props} />
                        )
                }
                </div>
            </div>
        )}
        </section>
      </React.Fragment>
    );
  }
}