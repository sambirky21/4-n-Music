import React, { Component } from "react";
import APIManager from "../../module/APIManager";
import "./cards.css";

export default class NewsEditForm extends Component {
  state = {
    title: "",
    description: "",
    categoryId: "",
    time: "",
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

    if (this.state.title === "" || this.state.description === "" || this.state.categoryId === "" || this.state.time === "" ) {
        window.alert("Please Fill Out All Sections");
    }
    else {
        const editedPracticeCard = {
            id: this.props.match.params.cardsId,
            userId: parseInt(sessionStorage.getItem("userId")),
            title: this.state.title,
            description: this.state.description,
            categoryId: parseInt(this.state.categoryId),
            time: this.state.time
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
          categoryId: card.categoryId,
          time: card.time
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
              id="description"
              value={this.state.description}
            />
          </div>
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
            <div className="form-group">
                <label htmlFor="time">Desired Practice Time</label>
                <select className="form-control"
                    value={this.state.time}
                    name="time"
                    id="time"
                    onChange={this.handleFieldChange}
                    >
                    <option value="0">Set Time</option>
                    <option value="10">10 Seconds</option>
                    <option value="15">15 Seconds</option>
                    <option value="30">30 Seconds</option>
                    <option value="45">45 Seconds</option>
                    <option value="60">1 min</option>
                    <option value="120">2 min</option>
                    <option value="180">3 min</option>
                    <option value="240">4 min</option>
                    <option value="300">5 min</option>
                    <option value="360">6 min</option>
                    <option value="420">7 min</option>
                    <option value="480">8 min</option>
                    <option value="540">9 min</option>
                    <option value="600">10 min</option>
                    <option value="900">15 min</option>
                    <option value="1200">20 min</option>
                    <option value="1800">30 min</option>
                    <option value="2700">45 min</option>
                    <option value="3600">60 min</option>
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
