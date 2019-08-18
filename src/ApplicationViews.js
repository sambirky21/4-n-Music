import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import PracticeCardEditForm from "./components/Cards/PracticeCardEditForm"
import CategoryList from "./components/Categories/CategoryList"
import PracticeCardForm from "./components/Cards/PracticeCardForm";
import SessionList from "./components/Sessions/SessionList"
import APIManager from "./module/APIManager";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";


class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    users: [],
    PracticeCards: [],
    Categories: [],
    PracticeSessionCards: [],
    Sessions: []
  };

  componentDidMount() {
    const newState = {};
    // console.log("component did mount")

    APIManager.getAll("users")
      .then(users => (newState.users = users))
    .then(() => (APIManager.getAll("cards")))
      .then(cards => (newState.PracticeCards = cards))
    .then(() => APIManager.getAll("categories"))
      .then(categories => (newState.Categories = categories))
    .then(() => APIManager.getAll("sessions"))
      .then(sessions => (newState.Sessions = sessions))
    // Below gets data that contains the foreign keys of sessions and practice cards, not the literal cards
    .then(() =>APIManager.getAll("practiceSessionCards"))
      .then(practiceData => (newState.PracticeSessionCards = practiceData))
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

  addSessionOnRegister = (session) => {
    return APIManager.post(session, "sessions")
      .then(() => APIManager.getAll("sessions"))
      .then(Sessions =>
        this.setState({
          Sessions: Sessions
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

  deletePracticeSessionCard = id => {
    return APIManager.delete("practiceSessionCards", id)
      .then(() => APIManager.getAll("practiceSessionCards"))
      .then(PracticeSessionCards => {
        this.setState({
          PracticeSessionCards: PracticeSessionCards
        });
        this.props.history.push("/practice")
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

  updatePracticeCard = (editedCard) => {
    return APIManager.put(editedCard, "cards")
      .then(() => APIManager.getAll("cards"))
      .then(PracticeCards =>
        this.setState({
          PracticeCards : PracticeCards
        })
      );
  };

  createPracticeSessionObject = PracticeSessionCard => {
    return APIManager.post(PracticeSessionCard, "practiceSessionCards")
      .then(() => APIManager.getAll("practiceSessionCards"))
      .then(PracticeSessionCards => this.setState({
        PracticeSessionCards: PracticeSessionCards
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
            return <Register {...props} addUser={this.addUser} addSessionOnRegister={this.addSessionOnRegister} />;
          }}
        />
        {/* Start cards routes */}
        <Route
          exact
          path="/cards"
          render={props => {
            if (this.isAuthenticated()) {
                  return (<CategoryList
                  {...props}
                  deletePracticeCard={this.deletePracticeCard}
                  createPracticeSessionObject={this.createPracticeSessionObject}
                  Categories={this.state.Categories}
                  PracticeCards={this.state.PracticeCards}
                  Sessions={this.state.Sessions}
                  PracticeSessionCards={this.state.PracticeSessionCards}
                  deletePracticeSessionCard={this.deletePracticeSessionCard}
                  // may not have to pass above here anymore. Should just be passed to Category List. Then Category List will be rendered in PracticeList
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
            return <PracticeCardForm {...props} addPracticeCard={this.addPracticeCard} Categories={this.state.Categories} />;
          }}
        />
        <Route
          exact
          path="/cards/:cardsId(\d+)/edit"
          render={props => {
            return (
              <PracticeCardEditForm {...props} updatePracticeCard={this.updatePracticeCard} Categories={this.state.Categories} />
            );
          }}
        />
        {/* End cards routes */}
        {/* Start session routes */}
        <Route
          exact
          path="/practice"
          render={props => {
            if (this.isAuthenticated()) {
                  return (<SessionList
                  {...props}
                  PracticeCards={this.state.PracticeCards}
                  Sessions={this.state.Sessions}
                  PracticeSessionCards={this.state.PracticeSessionCards}
                  createPracticeSessionObject={this.createPracticeSessionObject}
                  deletePracticeSessionCard={this.deletePracticeSessionCard}
                />)
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        {/* End session routes */}
        </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);