import './AddForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const AddForm = props => {

    const [categoryName, setCategoryName] = useState('')

    const [entry, setEntry] = useState({})

    const [buttonState, setButtonState] = useState(false)

    const _add = () => {
        props.onAddCategory(entry)
        _clear()
    }

    const _clear = () => {
        setCategoryName('')
    }

    useEffect(() => {
        console.log('entry changed')
        console.log(`entry: ${JSON.stringify(entry)}`)

        setButtonState( (entry.categoryName === '') ? false : true ) 

    },[entry])

    useEffect(() => {
        setEntry({ 'categoryName' : categoryName})
    },[categoryName])

    const _detectValueChanged = (key, value) => {
        if (key === 'categoryName') {
            setCategoryName(value)
        } 
        console.log('_detectValueChanged triggered')
    }

    return(
        <div className='Form'>
            <Button clickme={ _add } title='Add Entry' enabled={ buttonState }/>
            <br/>
            <label>Category Name:</label>
            <input type='text' placeholder='CategoryName' value={categoryName}
                   onChange = { e => _detectValueChanged('categoryName', e.target.value) } />
            <br/>
        </div>
    )
}

export default AddForm