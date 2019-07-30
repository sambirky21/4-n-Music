import React, { Component } from "react";
import APIManager from "../../module/APIManager";
import "./cards.css";

export default class NewsEditForm extends Component {
  state = {
    title: "",
    description: "",
    categoryId: "",
    id: "",
    userId: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingPracticeCard = evt => {
    evt.preventDefault();

    if (this.state.title === "" || this.state.description === "" || this.state.categoryId === "" ) {
        window.alert("Please Fill Out All Sections");
    }
    else {
        const editedPracticeCard = {
            id: this.props.match.params.cardsId,
            userId: parseInt(sessionStorage.getItem("userId")),
            title: this.state.title,
            description: this.state.description,
            categoryId: parseInt(this.state.categoryId)
        };

    this.props
      .updatePracticeCard(editedPracticeCard)
      .then(() => this.props.history.push("/cards"));
    }
  };

  componentDidMount() {
    return APIManager.get("cards", this.props.match.params.cardsId).then(
      card => {
        this.setState({
          userId: card.userId,
          title: card.title,
          description: card.description,
          categoryId: card.categoryId
        });
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <form className="cardsEditForm">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="url"
              value={this.state.description}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="synopsis">Synopsis</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="synopsis"
              value={this.state.synopsis}
            />
          </div> */}
            <div className="form-group">
                <label htmlFor="categoryId">Category</label>
                <select
                    name="category"
                    id="categoryId"
                    onChange={this.handleFieldChange}
                    value={this.state.categoryId}
                    >
                    <option value="">Select a Category</option>
                    {this.props.Categories.map(category => (
                        <option key={category.id} id={category.id} value={category.id}>
                        {category.title}
                        </option>
                    ))}
                </select>
            </div>
          <button
            type="submit"
            onClick={this.updateExistingPracticeCard}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
