import React, { Component } from "react";
import "./cards.css"

export default class PracticeCardForm extends Component {
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

    constructPracticeCard = evt => {
        evt.preventDefault();
        if (this.state.title === "" || this.state.description === "" || this.state.categoryId === "" || this.state.time === "" ) {
          window.alert("Please Fill Out All Sections");
        }
        else {
          const pCard = {
            userId: parseInt(sessionStorage.getItem("userId")),
            title: this.state.title,
            description: this.state.description,
            time: this.state.time,
            categoryId: parseInt(this.state.categoryId)
          }
        this.props
            .addPracticeCard(pCard)
            .then(() => this.props.history.push("/cards"));
        }
    }


    render() {
        return (
        <React.Fragment>
            <form className="cardsForm">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="title"
                placeholder="Card Title"
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
                    placeholder="Description"
                />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    defaultValue=""
                    name="category"
                    id="categoryId"
                    onChange={this.handleFieldChange}
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
                <input
                    type="number"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="time"
                    placeholder="Time"
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
                    placeholder="Synopsis"
                />
            </div> */}
            <button
                type="submit"
                onClick={this.constructPracticeCard}
                className="btn btn-primary"
            >
                Submit
            </button>
            </form>
        </React.Fragment>
        );
    };
}