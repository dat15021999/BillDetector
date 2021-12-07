import React, { Component } from 'react'
import ImageContext from '../../contexts/ImageContext'

export default class ImageProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            srcList: [],
            nameList: [],
            current_src: "https://cdn2.iconfinder.com/data/icons/document-34/200/358-512.png",
            current_name: "Example.png",
            current_reg_image: "",
            reg_images:[]
        }

        this.addImages = this.addImages.bind(this)
        this.removeImages = this.removeImages.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.removeAllImg = this.removeAllImg.bind(this)
        this.recognizeImage = this.recognizeImage.bind(this)
    }

    addImages(e) {
        let current_files = e.target.files

        let _srclist = Array.from(current_files).map(
            (file) => URL.createObjectURL(file)
        )
        let _namelist = Array.from(current_files).map(
            (file) => file.name
        )

        this.setState({
            srcList: _srclist,
            nameList: _namelist,
            current_src: "https://cdn2.iconfinder.com/data/icons/document-34/200/358-512.png",
            current_name: "Example.png"
        })
    }

    removeImages() {
        this.setState({
            srcList: [],
            nameList: [],
            current_src: "https://cdn2.iconfinder.com/data/icons/document-34/200/358-512.png",
            current_name: "Example.png"
        })
    }

    updateImage(e) {
        let me = e.target
        if (me.src != undefined) {
            console.log(me.src)
            this.setState({
                current_src: me.src,
                current_name: me.alt
            })
        }
        console.log('current source', this.state.current_src)
    }

    removeAllImg() {
        this.setState({
            srcList: [],
            nameList: [],
            current_src: "https://cdn2.iconfinder.com/data/icons/document-34/200/358-512.png",
            current_name: "Example.png"
        })
    }

    recognizeImage(image_src) {
        console.log(image_src)
        this.setState({
            current_reg_image: image_src,
            reg_images: [image_src]
        })
    }

    render() {
        return(
            <ImageContext.Provider value={{
                images: this.state.srcList,
                names: this.state.nameList,
                src: this.state.current_src,
                name: this.state.current_name,
                update: this.updateImage,
                add: this.addImages,
                removeImages: this.removeImages,
                removeAllImages: this.removeAllImg,
                recognizeImage: this.recognizeImage
            }}>
                {this.props.children}
            </ImageContext.Provider>
        )
    }
}