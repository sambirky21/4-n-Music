import { Route } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import APIManager from "./module/APIManager";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";


class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    users: []
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAll("users")
      .then(users => (newState.users = users))
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

//   deleteArticle = id => {
//     return APIManager.delete("news", id)
//       .then(() => APIManager.getAllNews("news"))
//       .then(news => {
//         // this.props.history.push("/news")
//         this.setState({
//           news: news
//         });
//       });
//   };

//   addArticle = article => {
//     return APIManager.post(article, "news")
//       .then(() => APIManager.getAllNews("news"))
//       .then(news =>
//         this.setState({
//           news: news
//         })
//       );
//   };

//   updateArticle = (editedArticle) => {
//     return APIManager.put(editedArticle, "news")
//       .then(() => APIManager.getAllNews("news"))
//       .then(news =>
//         this.setState({
//           news: news
//         })
//       );
//   };

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
        {/* Start news routes */}
        {/* <Route
          exact
          path="/cards"
          render={props => {
            if (this.isAuthenticated()) {
              <NewsList
                  {...props}
                  deleteArticle={this.deleteArticle}
                  news={this.state.news}
                />
            } else {
              return <Redirect to="/" />;
            }
          }}
        /> */}
        {/* <Route
          exact
          path="/news/new"
          render={props => {
            return <NewsForm {...props} addArticle={this.addArticle} />;
          }}
        />
        <Route
          exact
          path="/news/:newsId(\d+)/edit"
          render={props => {
            return (
              <NewsEditForm {...props} updateArticle={this.updateArticle} />
            );
          }}
        />
        End news routes
        /> */}
        </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);