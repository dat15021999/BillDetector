import React, { Component } from 'react'
import { render } from "react-dom"
import ImageInfo from './image_info/ImageInfo'
import ImageUploader from './images_loader/ImageUploader'
import ImageProvider from './providers/ImageProvider'
import ModelProvider from './providers/ModelProvider'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div style={styles.mainLayout}>
            <ModelProvider>
                <div style={styles.content}>
                    <ImageProvider>
                        <ImageUploader />
                        <ImageInfo />
                    </ImageProvider>
                </div>
            </ModelProvider>
        </div>
    }
}

const styles = {
    mainLayout: {
        height: '100%'
    },

    content: {
        height: '95%',
        width: '99%',
        position: 'absolute',
        // left: '5%',
        // top: '5%',
        display: 'flex',
        backgroundColor: '#ddd'
    }
}

render(<App />, document.getElementById("app"))