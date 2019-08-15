import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import FourAndPractice from './FourAndPractice';
import './index.css'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Router>
      <FourAndPractice />
  </Router>
  , document.getElementById('root'))