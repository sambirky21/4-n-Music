import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import PracticeCardsList from "./components/Cards/PracticeCardsList";
import PracticeCardForm from "./components/Cards/PracticeCardForm";
import APIManager from "./module/APIManager";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";


class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    users: [],
    PracticeCards: []
  };

  componentDidMount() {
    const newState = {};
    // console.log("component did mount")

    APIManager.getAll("users")
      .then(users => (newState.users = users))
    APIManager.getAll("cards")
      .then(cards => (newState.PracticeCards = cards))
      .then(() => this.setState(newState))
      // .then(console.log(newState))

  }

  addUser = user => {
    return APIManager.post(user, "users")
      .then(() => APIManager.getAll("users"))
      .then(users =>
        this.setState({
          users: users
        })
      );
  };

  deletePracticeCard = id => {
    return APIManager.delete("cards", id)
      .then(() => APIManager.getAll("cards"))
      .then(PracticeCards => {
        this.props.history.push("/cards")
        this.setState({
          PracticeCards: PracticeCards
        });
      });
  };

  addPracticeCard = PracticeCard => {
    return APIManager.post(PracticeCard, "cards")
      .then(() => APIManager.getAll("cards"))
      .then(PracticeCards =>
        this.setState({
          PracticeCards : PracticeCards
        })
      );
  };

  updateArticle = (editedCard) => {
    return APIManager.put(editedCard, "cards")
      .then(() => APIManager.getAll("cards"))
      .then(PracticeCards =>
        this.setState({
          PracticeCards : PracticeCards
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Login {...props} />;
          }}
        />

        <Route
          exact
          path="/register"
          render={props => {
            return <Register {...props} addUser={this.addUser} />;
          }}
        />
        {/* Start cards routes */}
        <Route
          exact
          path="/cards"
          render={props => {
            if (this.isAuthenticated()) {
                  return (<PracticeCardsList
                  {...props}
                  deletePracticeCard={this.deletePracticeCard}
                  PracticeCards ={this.state.PracticeCards}
                />)
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/cards/new"
          render={props => {
            return <PracticeCardForm {...props} addPracticeCard={this.addPracticeCard} />;
          }}
        />
        {/* <Route
          exact
          path="/news/:newsId(\d+)/edit"
          render={props => {
            return (
              <NewsEditForm {...props} updateArticle={this.updateArticle} />
            );
          }}
        /> */}
        {/* End cards routes */}
        {/* /> */}
        </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);