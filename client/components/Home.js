import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class Home extends Component {
  
  componentDidMount() {
    ellipse(56, 46, 55, 55);
  }

  render() {
    return (
      <div>
        <h3 id="greeting">Welcome, Bro</h3>
        <input placeholder="what's your name?" id="name-input" />
        <button onClick={() => {
          document.getElementById('greeting').innerText = `Welcome, ${document.getElementById('name-input').value}`;
        }}>click me</button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Home)


