import React, { Component } from 'react'


export default class Photo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <img style={this.props.style} src={this.props.src} alt={this.props.alt} />
    }
}

const styles = {
    imageFrame: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        padding: '10px',
    },
    
    imageDisplay: {
        display: 'block',
        width: '100%',
        height: 'auto',
        margin: 'auto',
    },
}