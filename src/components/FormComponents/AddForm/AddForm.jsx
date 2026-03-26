import './AddForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const AddForm = props => {

    //variables to mirror what is in each input field
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')

    //variable to update with all 3 values with the end goal
    //of passing that new collection back up to App, where we will
    //append it to entries
    const [entry, setEntry] = useState({})

    const [buttonState, setButtonState] = useState(false)

    //add local copy of App/_addEntry (define a new method)
    const _add = () => {
        props.onAddEntry(entry)
        _clear()
    }

    const _clear = () => {
        setValue1('')
        setValue2('')
        setValue3('')
    }

    useEffect(() => {
        console.log('entry changed')
        console.log(`entry: ${JSON.stringify(entry)}`)

        /*
        if (entry.value1 === '' || entry.value2 === "" || entry.value3 === '') {
            setButtonState(false)
        } else {
            setButtonState(true)
        }
        */

        setButtonState( (entry.value1 === '' || entry.value2 === "" || entry.value3 === '') ? false : true ) 

    },[entry])

    useEffect(() => {
        setEntry({ 'value1' : value1, 'value2': value2, 'value3': value3})
    },[value1, value2, value3])

    const _detectValueChanged = (key, value) => {
        if (key === 'value1') {
            setValue1(value)
        } else if (key === 'value2') {
            setValue2(value)
        } else if (key === 'value3') {
            setValue3(value)
        }
        console.log('_detectValueChanged triggered')
    }

    return(
        <div className='Form'>
            <Button clickme={ _add } title='Add Entry' enabled={ buttonState }/>
            <br/>
            <label>Value 1:</label>
            <input type='text' placeholder='Value1' value={value1}
                   onChange = { e => _detectValueChanged('value1', e.target.value) } />
            <br/>
            <label>Value 2:</label>
            <input type='text' placeholder='Value2' value={value2} 
                    onChange = { e => _detectValueChanged('value2', e.target.value) } />
            <br/>
            <label>Value 3:</label>
            <input type='text' placeholder='Value3' value={value3} 
                    onChange = { e => _detectValueChanged('value3', e.target.value) } />
        </div>
    )
}

export default AddForm