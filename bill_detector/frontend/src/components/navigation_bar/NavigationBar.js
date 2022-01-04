import React, { Component } from 'react'

export default class NavigationBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div style={styles.navigationBar}>
            Bill Detector
        </div>
    }
}

const styles = {
    navigationBar: {
        width: '99%',
        height: '5%',
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        backgroundColor: '#fcfbf5'
    }
}