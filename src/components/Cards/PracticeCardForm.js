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

    adjustTimer = input => {
        const { time } = this.state;
          if (input === "incHours" && time + 3600000 < 216000000) {
            this.setState({ time: time + 3600000 });
          } else if (input === "decHours" && time - 3600000 >= 0) {
            this.setState({ time: time - 3600000 });
          } else if (input === "incMinutes" && time + 60000 < 216000000) {
            this.setState({ time: time + 60000 });
          } else if (input === "decMinutes" && time - 60000 >= 0) {
            this.setState({ time: time - 60000 });
          } else if (input === "incSeconds" && time + 1000 < 216000000) {
            this.setState({ time: time + 1000 });
          } else if (input === "decSeconds" && time - 1000 >= 0) {
            this.setState({ time: time - 1000 });
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
                {/* <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="time"
                    placeholder="00:00:00"
                /> */}
                <select className="form-group"
                    defaultValue=""
                    name="time"
                    id="time"
                    onChange={this.handleFieldChange}
                    >
                    <option value="0">Set Time</option>
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
            {/* <input id="time" type="timer" className="form-control" onChange={this.handleFieldChange} ></input> */}
            </div>

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