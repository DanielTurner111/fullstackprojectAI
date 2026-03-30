import './EditForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const EditForm = props => {

    const _update = () => {
        props.onUpdateCategory(entry)
        _clear()
    }

    const [category_id, setCategoryID] = useState('')
    const [categoryName, setCategoryName] = useState('')

    const [entry, setEntry] = useState({})

    const [buttonState, setButtonState] = useState(false)


    const _clear = () => {
        setCategoryID('')
        setCategoryName('')
    }

    useEffect(() => {
        console.log('category changed')
        console.log(`category: ${JSON.stringify(entry)}`)


        setButtonState( (entry.categoryName === '') ? false : true ) 

    },[entry])

    useEffect(() => {
        setEntry({ 'category_id': category_id, 'categoryName' : categoryName})
    },[category_id, categoryName])

    const _detectValueChanged = (key, value) => {
        if (key === 'categoryName') {
            setCategoryName(value)
        } 
        console.log('_detectValueChanged triggered')
    }

    useEffect(() => {
        if (props.category){
            setCategoryID(props.category.category_id)
            setCategoryName(props.category.categoryName)
        }
        
    },[props])

    return(
        <div className='EditForm'>
            <Button clickme={ _update } title='Edit Entry' enabled={ buttonState }/>
            <br/>
            <label>Category Name:</label>
            <input type='text' placeholder='categoryName' value={categoryName}
                   onChange = { e => _detectValueChanged('categoryName', e.target.value) } />
            <br/>
            
        </div>
    )
}

export default EditForm