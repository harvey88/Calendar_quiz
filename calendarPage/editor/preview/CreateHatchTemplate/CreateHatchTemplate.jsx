import React, { Component } from 'react'
import styles from './CreateHatchTemplate.css'

import Popup from 'common/popUp/PopUp'
import HatchTypeTemplate from './HatchTypeTemplate/HatchTypeTemplate'
import DefaultIcon from 'assets/svg/gift.svg'
import BonusIcon from 'assets/svg/star.svg'
import CrownIcon from 'assets/svg/crown.svg'
import PlayIcon from 'assets/svg/play-circle.svg'

class CreateHatchTemplate extends Component {
    onHanldeHatch =  (type) => {
        const {
            actionsCalendar: { createHatch }, 
            calendar : { id }
        } = this.props
        createHatch(id, type)
    }

    componentWillReceiveProps(newProps){
        const {
            hatches
        } = newProps
        const currentHatch = Object.values(hatches).filter(el => el.last )[0]
        this.props.handleHatchTemplate(currentHatch)
    }

    render() {
        const {
            handleCloseCreateTemplateHatch, 
            handleClick
        } = this.props

        return (
            <Popup
                handleClose={handleCloseCreateTemplateHatch}
                windowStyle={{
                    minHeight: '66rem',
                    maxHeight: '60%',
                    width: '65%',
                    borderRadius: '1rem',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 7.4rem 0 rgba(0, 0, 0, 0.11)'
                }}
            >
                <div onClick={handleClick}>
                    <div className={styles.title} >Add new hatch</div>
                    <div className={styles.wrapperHatchType} >
                        <HatchTypeTemplate 
                            handleClick={handleClick} 
                            type='default'
                            text='Deals & Quiz' 
                            icon={<DefaultIcon style={{fill: '#575757'}} className={styles.defaultIcon} />}
                            onHanldeHatch={this.onHanldeHatch}
                            />
                        <HatchTypeTemplate 
                            handleClick={handleClick} 
                            type='bonus' 
                            text='Default + challenges with bonus points' 
                            icon={<BonusIcon style={{fill: '#b6d2f3'}} className={styles.defaultIcon} />}
                            onHanldeHatch={this.onHanldeHatch} />
                        <HatchTypeTemplate 
                            handleClick={handleClick} 
                            type='contest'
                            text='Default + hatch contest' 
                            icon={<CrownIcon style={{fill: '#f8bf1c'}} className={styles.defaultIcon} />}
                            onHanldeHatch={this.onHanldeHatch} />
                        <HatchTypeTemplate 
                            handleClick={handleClick} 
                            type='final'
                            text='Default + Quiz with multiply questions' 
                            icon={<PlayIcon style={{fill: '#975a5a'}} className={styles.defaultIcon} />}
                            onHanldeHatch={this.onHanldeHatch} />
                    </div>
                </div>
            </Popup>   
        )
    }
}

export default CreateHatchTemplate