import numeral from 'numeral'
import React from 'react'
import './Table.css'

const Table = ({ countries }) => {
    return (
        <div className='table'>
            <table>
                <tbody>
                    {countries.map(({ country, cases }) => (
                        <tr key={country}>
                            <td>{country}</td>
                            <td>{numeral(cases).format('0,0')}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Table;
