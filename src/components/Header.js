import React from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'

const Header = ({ country, countries, onCountryChange }) => {
    return (
        <>
            <div className='app__header'>
                <h1>COVID-19 TRACKER</h1>
                <FormControl className='app__dropdown'>
                    <Select variant='outlined' value={country} onChange={onCountryChange}>
                        <MenuItem key='worldwide' value='worldwide'>Worldwide</MenuItem>
                        {countries.map(country => (
                            <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default Header
