import React, { Component } from 'react'
import ImageContext from '../../contexts/ImageContext'
export default class ImageProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            images_source: [],
            images_content:[],
            current_index: -1,
            bills: [],
            tooltip_data: '',
            isLoading: false
        }

        this.addImages = this.addImages.bind(this)
        this.removeImages = this.removeImages.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.detectImages = this.detectImages.bind(this)
        this.changeLoadingStatus = this.changeLoadingStatus.bind(this)
        this.setTooltipData =this.setTooltipData.bind(this)
    }

    addImages(e) {
        let current_files = e.target.files
        let _bills = []

        for (let i = 0; i < current_files.length; i++) {
            _bills.push("Không phải hóa đơn!")
        }

        let _images_source = Array.from(current_files).map(
            (file) => URL.createObjectURL(file)
        )
        let _images = Array.from(current_files).map(
            (file) => file.name
        )

        this.setState({
            images: _images,
            images_source: _images_source,
            bills: _bills,
            current_index: 0,
        })
    }

    removeImages() {
        this.setState({
            images: [],
            images_source: [],
            images_content:[],
            current_index: -1,
            bills: [],
            isLoading: false
        })
    }

    updateImage(e) {
        let me = e.target
        if (me.src != undefined) {
            this.setState({
                current_index: me.attributes[2].value,
            })
        }
    }
    
    detectImages(images_source, name_images, images_content, bills) {
        this.setState({
            images_source: images_source,
            images: name_images,
            images_content: images_content,
            bills: bills
        })
    }

    changeLoadingStatus(status) {
        this.setState({
            isLoading: status
        })
    }

    setTooltipData(tooltip_data) {
        this.setState({
            tooltip_data: tooltip_data
        })
    }

    render() {
        return(
            <ImageContext.Provider value={{
                images: this.state.images,
                images_source: this.state.images_source,
                images_content: this.state.images_content,
                current_index: this.state.current_index,
                bills: this.state.bills,
                tooltip_data: this.state.tooltip_data,
                isLoading: this.state.isLoading,
                updateImage: this.updateImage,
                addImages: this.addImages,
                removeImages: this.removeImages,
                detectImages: this.detectImages,
                changeLoadingStatus: this.changeLoadingStatus,
                setTooltipData: this.setTooltipData
            }}>
                {this.props.children}
            </ImageContext.Provider>
        )
    }
}