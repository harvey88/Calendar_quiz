import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { requestImageUpload } from 'data/images/api'
import Upload from 'assets/svg/upload.svg'
import Hatch from './preview/components/hatch/Hatch'
import EmptyHatch from './preview/components/hatch/EmptyHatch'
import CreateHatchTemplate from './preview/CreateHatchTemplate/CreateHatchTemplate'
import HatchTemplate from './preview/hatchTemplate/HatchTemplate'
import Navigation from './preview/components/navigation/Navigation'
import { updateCalendar } from 'data/calendar/actions'
import { createHatch, updateHatch } from 'data/calendar/hatch/actions'
import { deleteCalendarQuestion, getCalendarQuizzesList, calendarQuestionCopy } from 'data/calendar/questions/actions'
import Prizes from './preview/components/navigation/components/prizes/Prizes'
import Rules from './preview/components/navigation/components/rules/Rules'
import Winners from './preview/components/navigation/components/winners/Winners'
import Leaderboard from './preview/components/navigation/components/leaderboard/Leaderboard'

import styles from './editor.css'
import {bindActionCreators} from 'redux';

const mapStateToProps = ({ calendar, hatches }) => ({ calendar, hatches })


const mapDispatchToProps = dispatch => ({ 
    actionsCalendar: bindActionCreators(
        {
            updateCalendar,
            createHatch,
            updateHatch,
            deleteCalendarQuestion,
            getCalendarQuizzesList,
            calendarQuestionCopy
        }, dispatch
    )
})


@connect( mapStateToProps, mapDispatchToProps )
export default class CalendarEditor extends Component {
    state = {
        title: '',
        description: '',
        logo_url: null,
        background_url: null,
        createHetchPopup: false,
        hatchPopup: false,
        hatches: null,
        settings: null,
        currentHatch: null,
        updateHatchPopup: false,
        navigationView: null
    }
    componentDidMount(){
        this.syncState(this.props)
    }

    componentWillReceiveProps(newProps){
        this.syncState(newProps)
    }

    syncState = props => {
        const { calendar, hatches } = props
        this.setState({
            title: calendar.title,
            description: calendar.description,
            logo_url: calendar.logo ? calendar.logo.url : null,
            background_url: calendar.background ? calendar.background.url : null,
            hatches: hatches,
            settings: calendar.settings,
            currentHatch: hatches && hatches.currentHatch ? hatches.currentHatch: this.state.currentHatch
        })
    }

    onDrop = (acceptedFiles, calendarPart) => {
        const { actionsCalendar: { updateCalendar }, calendar: { id } } = this.props

        acceptedFiles.forEach(file => {
            requestImageUpload(file)
                .then(image => {
                    this.setState({[calendarPart]: image.url})
                    updateCalendar( id, { [calendarPart]: image.id } )
                })
        });
    }

    applyUpdates = (calendarPart) => {
        const { actionsCalendar: { updateCalendar }, calendar: { id } } = this.props
        updateCalendar( id, { [calendarPart]: this.state[calendarPart] } )
    }

    handleClick = e => {
        e.stopPropagation()
    }

    renderHatches = hatches => {
        return Object.values(hatches).map( (hatch, id )=> <Hatch
            handleHatchTemplate={this.handleHatchTemplate}
            key={id} index={ id + 1 } hatch={hatch}/> )
    }

    renderEmptyHatches = (count, hatches) => {
        let empty = count - Object.keys(hatches).length
        return Array.from(new Array(empty), (el, index) => <EmptyHatch
        handleCreateHatchTemplate={this.handleCreateHatchTemplate}
        key={index} first={index === 0 ? true : false} />);
    }

    handleChangeHatch = (hatch) => {
        this.setState({
            hatchPopup: false
        }, () => {
            this.handleHatchTemplate(hatch)
        })
    }

    handleHatchTemplate = hatch => {
        this.setState({
            hatchPopup: true,
            createHetchPopup: false,
            currentHatch: hatch
        })  
    }
    handleCloseHatchTemplate = () => {
        this.setState({
            hatchPopup: false
        })
    }
    handleCreateHatchTemplate = () => {
        this.setState({
            createHetchPopup: true
        })
    }

    handleCloseCreateTemplateHatch = () => {
        this.setState({
            createHetchPopup: false
        })
    }

    renderNavigationPage = () => {
        switch(this.state.navigationView) {
            case 'prizes': {
                return <Prizes />
            }
            case 'leaderboard': {
                return (<Leaderboard/>)
            }
            case 'winners': {
                return (<Winners />)
            }
            case 'rules': {
                return (<Rules />)
            }
            default: {
                return null
            }
        }
    }
    
    setNavigationView = view => this.setState({ navigationView: view })

    render() {
        const { 
            logo_url, 
            background_url, 
            title, 
            description, 
            hatches, 
            settings, 
            currentHatch,
            createHetchPopup,
            hatchPopup,
            navigationView
        } = this.state
        const {
            calendar,
            actionsCalendar
        } = this.props
        return (
            <Dropzone className={styles.wrapper} style={ background_url ? { background: `url(${background_url})`} : null } onDrop={ files => this.onDrop(files, 'background') }>
                <div onClick={this.handleClick}>
                    <div className={styles.calendarHeader}>
                        <Dropzone className={ styles.dropLogo } onDrop={ files => this.onDrop(files, 'logo') }>
                            {logo_url  ?
                                <div
                                    className={styles.logo}
                                    style={{ background: `url(${logo_url})`}}
                                /> :
                                (<div className={styles.noLogo}>
                                    <Upload/>
                                    <p className={styles.uploadButton}>Upload Logo</p>
                                </div>)
                            }
                        </Dropzone>
                        <Navigation setNavigationView={this.setNavigationView} settings={settings} />
                    </div>
                    { navigationView
                        ?
                        this.renderNavigationPage()
                        :
                        [<div key={'title'}>
                            <input
                                className={styles.titleInput}
                                type='text'
                                value={ title ? title: '' }
                                onChange={e => this.setState({title: e.target.value})}
                                onBlur={() => this.applyUpdates('title')}
                            />
                            <textarea
                                rows='4'
                                className={styles.descriptionInput}
                                value={ description ? description: '' }
                                onChange={e => { this.setState({description: e.target.value} )
                                }}
                                onBlur={() => this.applyUpdates('description')}
                            />
                        </div>,
                        <div className={styles.hatchesWrapper} key={'hatches'}>
                            { hatches && this.renderHatches(hatches) }
                            { settings && this.renderEmptyHatches(settings.hatches_amount ? settings.hatches_amount : 20 , hatches) }
                        </div>]
                    }
                </div>
                {createHetchPopup &&
                    <CreateHatchTemplate
                        handleClick={this.handleClick}
                        handleCloseCreateTemplateHatch={this.handleCloseCreateTemplateHatch}
                        handleHatchTemplate={this.handleHatchTemplate}                        
                        calendar={calendar}
                        actionsCalendar={actionsCalendar}
                        hatches={hatches} />
                }
                {hatchPopup &&
                    <HatchTemplate
                        handleClick={this.handleClick}
                        currentHatch={currentHatch}
                        handleCloseHatchTemplate={this.handleCloseHatchTemplate}
                        calendar={calendar}
                        actionsCalendar={actionsCalendar}
                        hatches={hatches}
                        handleChangeHatch={this.handleChangeHatch} />
                }
            </Dropzone>
        )
    }
}
