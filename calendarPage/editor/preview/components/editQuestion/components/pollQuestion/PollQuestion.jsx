import React, { Component } from 'react'

class PollQuestion extends Component {
    render() {
        console.log('poll', this.props.currentQuestion)
        return(
            <div>
                Poll question 
            </div>
        )
    }
}

export default PollQuestion