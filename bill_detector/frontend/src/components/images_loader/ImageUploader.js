import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import Photo from '../ImageComponent/Image'
import ImageContext from '../../contexts/ImageContext'

let active = '#96863f'
let passive = 'rgba(178, 171, 140, 0.35)'

export default class ImageUploader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <ImageContext.Consumer>
            {
                context => <div style={styles.imagesUploader}>
                    <div style={styles.header}>Danh sach anh</div>
                    <div style={styles.container}>
                        <Grid container spacing={2}>
                            {
                                context.images.map(
                                    (item, index) => (
                                        <Grid key={index} item xs={3} align='center' style={styles.gridItem}>
                                            <div className="image-frame" style={{ ...styles.imageFrame,
                                                backgroundColor: item == context.src ? active : passive}}
                                                onClick={context.update}
                                            >
                                                <Photo style={styles.imageDisplay} src={item} alt={context.names[index]} />
                                            </div>
                                        </Grid>
                                    )
                                )
                            }
                        </Grid>
                    </div>
                    <div style={styles.footer}>
                        <div className="button" style={styles.imageButton}>
                            <input
                                // style={styles.input}
                                accept="image/*"
                                id="file"
                                type="file"
                                multiple
                                onChange={context.add}
                            />
                            <label>Them anh</label>
                        </div>
                        <div className="button" style={styles.imageButton} onClick={context.removeAllImages}>
                            <label>Xoa anh</label>
                        </div>
                    </div>
                </div>
            }
        </ImageContext.Consumer>
    }
}

const styles = {
    imagesUploader: {
        width: '60%',
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

    container: {
        height: 'calc(100% - 120px)',
        borderRadius: 10,
        margin: 10,
        marginTop: 10,
        overflowX: 'hidden',
        overflowY: 'auto',
    },

    gridItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    imageFrame: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        padding: '5px',
        borderRadius: '8px'
    },
    
    imageDisplay: {
        // display: 'block',
        // width: '100%',
        // height: 'auto',
        // margin: 'auto',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        width: '100%',
        height: 'auto',
        maxWidth: '200px',
        maxHeight: '200px',
        minWidth: '150px',
        minHeight: '150px',
        
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
    },

    input: {
        display: 'none',
    },
}