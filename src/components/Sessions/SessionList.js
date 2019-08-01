import React, { Component } from "react";
import "./sessions.css";
import PracticeCard from "../Cards/PracticeCard"

export default class SessionList extends Component {
    render() {
    // console.log("sessions 1", this.props.Sessions)
    return (

      <React.Fragment>
        <section>
            {/* going to filter over all PracticeSessionCards then map over Practice Cards */}
            {   this.props.Sessions.filter(session =>
                    session.userId === parseInt(sessionStorage.getItem("userId")))
                .map(session =>
                <div key={session.id} className="container mt-3 list-group-item list-group-item-light bg-secondary text-white">

                    <div className="row flex mt-1">
                    {
                        this.props.PracticeSessionCards
                            .filter( data =>
                                data.userId === parseInt(sessionStorage.getItem("userId")))
                            .map(data => {
                                return this.props.PracticeCards
                                .filter(card =>
                                (data.cardId === card.id))
                                .map(card => <PracticeCard key={card.id} session={session} data={data} card={card} {...this.props} />)
                                }
                            )
                    }
                    </div>
                </div>
                )
            }
        </section>
      </React.Fragment>
    );
  }
}
// .map(session => <PracticeCard key={session.id} session={session} {...this.props} />)

// if(this.props.Sessions.userId === parseInt(sessionStorage.getItem("userId")))

 // session.userId === parseInt(sessionStorage.getItem("userId"))
                // .filter(session =>
                //     session.userId === parseInt(sessionStorage.getItem("userId")))

// {
//     this.props.Sessions.map(session =>
//     <div key={session.id} className="container mt-3 list-group-item list-group-item-light bg-secondary text-white">
//         <div className="row flex mt-1">
//         {
//             this.props.PracticeSessionCards
//                 .filter( data =>
//                     parseInt(data.userId) === parseInt(sessionStorage.getItem("userId")))
//                 .filter(data =>
//                     (data.practiceId === session.id) && (data.cardId === this.props.PracticeCards.id))
//                 .map(card => <PracticeCard key={card.id} card={card} {...this.props} />
//                 )
//         }
//         </div>
//     </div>
//     )
// }

// {
//     this.props.PracticeSessionCards
//         .filter( card => {
//             console.log("first filter", card)
//             return card.userId === parseInt(sessionStorage.getItem("userId"))})
//         // .map this.prop.PracticeCards
//             .filter( card => {
//             console.log("second filter", card)
//             return card.cardId === this.props.PracticeCards.id && card.practiceId === this.props.Sessions.id })
//         .map(card => {
//             console.log("map filter", card)
//             // return this.props.PracticeCards
//             //     .filter(card => card.id === this.props.PracticeSessionCards.userId)
//             //     .map(card => {
//                 // console.log("map filter 2", card)
//                 return <PracticeCard key={card.id} card={card} {...this.props} />
//         })
// }

// {
//     this.props.PracticeSessionCards
//         .filter( card =>
//             card.userId === parseInt(sessionStorage.getItem("userId")) && this.props.PracticeCards.id === card.cardId && this.props.Sessions.id === card.practiceId)
//         .map(card => {
//             console.log("card", card)
//             return <PracticeCard key={card.id} card={card} {...this.props} />}
//         )
// }

// {
//     this.props.PracticeSessionCards
//         .filter( card =>
//             parseInt(card.userId) === parseInt(sessionStorage.getItem("userId")))
//         .filter( card =>
//             parseInt(this.props.PracticeCards.id) === parseInt(card.cardId) && parseInt(this.props.Sessions.id) === parseInt(card.practiceId))
//         .map(data =>
//             this.props.PracticeCards
//             .filter(card => card.id === data.userId )
//             .map(<PracticeCard key={card.id} card={card} {...this.props} />)
//         )
// }

// {
//     this.props.PracticeSessionCards
//         .filter( card =>
//             parseInt(card.userId) === parseInt(sessionStorage.getItem("userId")))
//         .filter( card =>
//             parseInt(this.props.PracticeCards.id) === parseInt(card.cardId) && parseInt(this.props.Sessions.id) === parseInt(card.practiceId))
//         .map(card => <PracticeCard key={card.id} card={card} {...this.props} />
//         )
// }