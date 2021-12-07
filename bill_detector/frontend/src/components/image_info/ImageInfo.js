import React, { Component } from 'react'
import ImageContext from '../../contexts/ImageContext'
import Photo from '../ImageComponent/Image'

export default class ImageInfo extends Component {
    constructor(props) {
        super(props)
    }

    recognizeImage(context) {
        try {
            fetch('http://127.0.0.1:8000/photos/', {
                method: 'POST',
                // body: JSON.stringify({
                //     "images": context.images
                // })
                body: JSON.stringify(context.names)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                alert('Ảnh đã được nhận diện!')
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return <ImageContext.Consumer>
            {
                context => <div style={styles.imageInfo}>
                    <div style={styles.header}>Thong tin</div>
                    <div style={styles.imageClicked}>
                        <div style={styles.bigImage}>
                            <Photo style={styles.imageDisplay} src={context.src} alt={context.name} />
                            {/* <img className="img-info" style={styles.imageDisplay} src={context.src} alt={context.name}/> */}
                        </div>
                        <div style={styles.imageDescription}>{context.name}</div>
                        <div style={styles.imageDescription}>{context.name}</div>
                    </div>
                    <div style={styles.footer}>
                        <div></div>
                        <div
                            style={styles.imageButton}
                            onClick={() => {
                                this.recognizeImage(context)
                                context.recognizeImage("https://vnkings.com/wp-content/uploads/2018/04/14_Central_Park_1.jpg")
                            }}
                        >Nhan dien anh</div>
                        <div></div>
                    </div>
                </div>
            }
        </ImageContext.Consumer>
    }
}

const styles = {
    imageInfo: {
        width: '40%',
        backgroundColor: '#E7E0C9'
    },

    header: {
        height: '60px',
        backgroundColor: '#C1CFC0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 30
    },

    footer: {
        height: '60px',
        backgroundColor: '#C1CFC0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center'
    },

    imageClicked: {
        height: 'calc(100% - 120px)',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    bigImage: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    
    imageDisplay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        width: '100%',
        height: 'auto',
        maxWidth: '300px',
        maxHeight: '300px',
        minWidth: '150px',
        minHeight: '150px',
    },

    imageDescription: {
        padding: '10px 50px'
    },

    imageButton: {
        height: '50px',
        width: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 20px',
        backgroundColor: '#6B7AA1',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}