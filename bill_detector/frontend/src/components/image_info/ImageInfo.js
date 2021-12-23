import React, { Component } from 'react'
import ImageContext from '../../contexts/ImageContext'
import ClipLoader from "react-spinners/ClipLoader"
import Tooltip from 'react-simple-tooltip'

let source_images = []
let name_images = []
let bills = []

let default_image = {
    'source': "https://cdn2.iconfinder.com/data/icons/document-34/200/358-512.png",
    'name': 'Example',
    'description': "Không phải hóa đơn!",
    'content': ''
}

export default class ImageInfo extends Component {
    constructor(props) {
        super(props)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.inBounding = this.inBounding.bind(this)
        this.myRef = React.createRef()
    }

    recognizeImage(context) {
        if (context.images.length > 0) {
            try {
                context.changeLoadingStatus(true)
                fetch('http://127.0.0.1:8000/photos/', {
                    method: 'POST',
                    body: JSON.stringify(context.images)
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    context.changeLoadingStatus(false)
                    result[1].forEach(el => {
                        source_images.push(el.link)
                        name_images.push(el.title)
                        bills.push(el.description)
                    });
                    context.detectImages(source_images, name_images, result[0], bills)
                    alert('Ảnh đã được nhận diện!')
                })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert('Bạn chưa chọn ảnh!')
        }
    }

    inBounding(top, btm, pos) {
        return pos >= top && pos <= btm
    }

    handleMouseMove(context, e) {
        let index = context.current_index
        let image_top = this.myRef.current.getBoundingClientRect().top
        let image_height = this.myRef.current.getBoundingClientRect().height
        
        context.images_content[index].forEach(el => {
            let top_line = image_top + image_height * el[2]
            let btm_line = image_top + image_height * el[1]

            if (this.inBounding(top_line, btm_line, e.clientY)) {
                context.setTooltipData(el[0])
            }
        })
    }

    render() {
        return <ImageContext.Consumer>
            {
                context => <div style={styles.imageInfo}>
                    <div style={styles.header}>Thông tin ảnh</div>
                    <div style={styles.imageClicked}>
                        <div style={styles.bigImage}>
                            {
                                context.isLoading ? <ClipLoader style={styles.loader} /> : <Tooltip content={context.tooltip_data}>
                                    <img
                                        style={styles.imageDisplay}
                                        src={
                                            context.current_index == -1 ? default_image['source'] : context.images_source[context.current_index]
                                        }
                                        alt={
                                            context.current_index == -1 ? default_image['name'] : context.images[context.current_index]
                                        }
                                        indx={context.current_index}
                                        description={
                                            context.current_index == -1 ? default_image['description'] : context.bills[context.current_index]
                                        }
                                        content={
                                            context.current_index == -1 ? default_image['content'] : context.images_content[context.current_index]
                                        }
                                        ref={this.myRef}
                                        onMouseMove={() => {
                                            this.handleMouseMove(context, event)
                                        }}
                                    />
                                </Tooltip>
                                
                            }
                        </div>
                        <div style={styles.imageDescription}>
                            {context.current_index == -1 ? default_image['name'] : context.images[context.current_index]}
                        </div>
                        <div style={styles.imageDescription}>
                            {context.current_index == -1 ? default_image['description'] : context.bills[context.current_index]}
                        </div>
                    </div>
                    <div style={styles.footer}>
                        <div></div>
                        <div
                            style={styles.imageButton}
                            onClick={() => {
                                this.recognizeImage(context)
                            }}
                        >Nhận diện ảnh</div>
                        <div></div>
                    </div>
                </div>
            }
        </ImageContext.Consumer>
    }
}

const styles = {
    loader: {
        height: '200',
        width: '200'
    },

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
        maxWidth: '350px',
        maxHeight: '500px',
        minWidth: '150px',
        minHeight: '150px',
    },

    imageDescription: {
        fontSize: '30',
        fontWeight: '600',
        padding: '20px 50px'
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