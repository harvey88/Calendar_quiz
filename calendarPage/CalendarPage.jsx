import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Editor from './editor/Editor'
import Players from './players/Players'
import Settings from './settings/Settings'
import Header from '../../components/header/Header'

import { getCalendar } from 'data/calendar/actions'
import Subheader from './components/subheader/Subheader'

import styles from './calendarPage.css'

const mapDispatchToProps = dispatch => ({
    calendarEditorActions: bindActionCreators({
        getCalendar
    }, dispatch)
})

@connect(null, mapDispatchToProps)
export default class CalendarPage extends Component {
    componentDidMount() {

        const {
            match: {params: {calendarID}},
            calendarEditorActions: {getCalendar}
        } = this.props
        getCalendar(calendarID)

    }
    componentDidUpdate(prevProps){
        const {
            match: {params: {calendarID}},
            calendarEditorActions: {getCalendar},
        } = this.props
        if(prevProps.match.params.calendarID !== calendarID){
            getCalendar(calendarID)
        }
    }
    pathContains = (pathname, route) => pathname.indexOf(route) !== -1
    render(){
        const { location: { pathname } } = this.props
        return (
            <Fragment>
                {!this.pathContains(pathname, 'overview') && (
                    <Header handleOpenTemplateWizard={this.props.handleOpenTemplateWizard}/>
                )}
                <div className={styles.wrapper}>
                    {!this.pathContains(pathname, 'overview') && (
                        <Subheader />
                    )}
                    <Switch>
                        <Route
                            path='/calendar/:calendarID/editor'
                            component={Editor}
                        />
                        <Route
                            path='/calendar/:calendarID/players'
                            component={Players}
                        />
                        {/*<Route
                            path='/calendar/:calendarID/overview/'
                            component={null}
                        />
                        <Route
                            path='/calendar/:calendarID/statistics'
                            component={null}
                        />*/}
                        <Route
                            path='/calendar/:calendarID/settings'
                            component={Settings}
                        />
                    </Switch>
                </div>
            </Fragment>
        )
    }
}
