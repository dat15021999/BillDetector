import React, { Component } from 'react'
import { render } from "react-dom"
import ImageInfo from './image_info/ImageInfo'
import ImageUploader from './images_loader/ImageUploader'
import ImageProvider from './providers/ImageProvider'
import NavigationBar from './navigation_bar/NavigationBar'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div style={styles.mainLayout}>
                <NavigationBar />
                <div style={styles.content}>
                    <ImageProvider>
                        <ImageUploader />
                        <ImageInfo />
                    </ImageProvider>
                </div>
        </div>
    }
}

const styles = {
    mainLayout: {
        height: '100%',
        backgroundColor: '#fcfbf5'
    },

    content: {
        height: '90%',
        width: '99%',
        position: 'absolute',
        display: 'flex',
        backgroundColor: '#ddd'
    }
}

render(<App />, document.getElementById("app"))