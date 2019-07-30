import React, { Component } from "react";
import "./cards.css";
// import PracticeCard from "./PracticeCard";
import CategoryList from "../Categories/CategoryList"

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
          {this.props.Categories
            .map(category => (
              <CategoryList key={category.id} category={category} {...this.props} />
            ))
          }
        </section>
      </React.Fragment>
    );
  }
}