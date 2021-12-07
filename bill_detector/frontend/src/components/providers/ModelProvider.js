import React, { Component } from 'react'
import ModelContext from '../../contexts/ModelContext'

export default class ModelProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            source: "https://www.w3schools.com/w3images/lights.jpg"
        }
    }

    render() {
        return(
            <ModelContext.Provider value={{
                src: this.state.source,
                update: this.updateImage
            }}>
                {this.props.children}
            </ModelContext.Provider>
        )
    }
}