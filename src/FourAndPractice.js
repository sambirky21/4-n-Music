import React, { Component } from "react";
import NavBar from "./components/Nav/NavBar";
import ApplicationViews from "./ApplicationViews";

class FourAndPractice extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default FourAndPractice;

// render() {
//   if(sessionStorage.getItem("userId")===null) {
//     return (
//       <ApplicationViews />
//     )
//   }
//   return (
//     <React.Fragment>
//       <NavBar />
//       <ApplicationViews />
//     </React.Fragment>
//   );
// }
