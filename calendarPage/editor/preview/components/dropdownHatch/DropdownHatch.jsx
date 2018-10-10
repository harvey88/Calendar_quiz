import React, { Component } from 'react'
import styles from './dropdownHatch.css' 
import CustomDropdown from 'common/customDropdown/CustomDropdown'


class DropdownHatch extends Component {
    handleChooseHatchChange = (e, value) => {
        const { hatches, handleChangeHatch } = this.props
        const hatch = Object.values(hatches).filter(el => el.id === value )[0]
        handleChangeHatch(hatch)
    }
    render() {
        const {
            hatches,
            currentHatch
        } = this.props
        const indexDay = Object.values(hatches).findIndex(el => el.id === currentHatch.id)
        let hatchesList = Object.values(hatches).map((el, i) => {
            return {
                value: el.id,
                text: `Day ${i + 1}` 
            }
        })
        return (
            <div className={styles.dropdownHatch}>
                <CustomDropdown
                    placeholder={`Day ${indexDay + 1}`}
                    onChange={this.handleChooseHatchChange}
                    options={hatchesList}
                    customStyle
                />  
            </div>
        )
    }
}

export default DropdownHatch