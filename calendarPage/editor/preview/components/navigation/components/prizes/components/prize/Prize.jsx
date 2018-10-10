import React, { Component } from 'react'
import { TextArea } from 'semantic-ui-react'
import { requestImageUpload } from 'data/images/api'
import styles from './prize.css'
import Dropzone from 'react-dropzone'
import Upload from 'assets/svg/upload.svg'
import Trash from 'assets/svg/trashcan.svg'

export default class Prizes extends Component {
    state = {
        logo_id: null,
        title: '',
        description: ''
    }
    componentDidMount() {
        if( this.props.prize ) {
            const { prize } = this.props
            this.setState({
                id: prize.id,
                logo_id: prize.logo ? prize.logo.url : null,
                title: prize.title,
                description: prize.description
            })
        }

    }
    onDrop = acceptedFiles => {
        const { actions: { updatePrize }, prize: { id, calendar_id } } = this.props
        acceptedFiles.forEach(file => {
            requestImageUpload(file)
                .then(image => {
                    this.setState({logo_id: image.url})
                    updatePrize( id, { calendar_id, logo_id: image.id } )
                })
        });
    }

    applyUpdates = (prizePart) => {
        const { actions: { updatePrize }, prize: { id, calendar_id }  } = this.props
        updatePrize( id, { calendar_id, [prizePart]: this.state[prizePart] } )
    }

    render() {
        const { actions: { deletePrize } } = this.props
        const { id, logo_id, title, description } = this.state
        return (
            <div className={styles.wrapper}>
                <Trash className={styles.removeIcon} onClick={ () => deletePrize(id) }/>
                <Dropzone className={styles.image} onDrop={ files => this.onDrop(files) } style={{ backgroundImage: `url(${logo_id})` }}><Upload/></Dropzone>
                <div className={styles.inputsWrapper}>
                    <input
                        placeholder={'Sample Title'}
                        className={styles.title}
                        value={ title ? title : '' }
                        onChange={e => this.setState({title: e.target.value})}
                        onBlur={() => this.applyUpdates('title')}
                    />
                    <TextArea
                        placeholder={'Sample Description'}
                        autoHeight
                        className={styles.description}
                        value={ description ? description : '' }
                        onChange={e => this.setState({description: e.target.value})}
                        onBlur={() => this.applyUpdates('description')}
                    />
                </div>
            </div>
        )
    }
}
