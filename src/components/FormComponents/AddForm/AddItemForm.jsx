import './AddItemForm.scss'

import Button from '../Button/Button.jsx'
import { useState, useEffect, use } from 'react'

const AddItemForm = props => {

    const [categories, setCategories] = useState([])


    const [category_id, setCategoryID] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sku, setSku] = useState('')

    const [buttonState, setButtonState] = useState(false)

    const [entry, setEntry] = useState(false)

    const _add = () => {
        props.onAddItem(entry)
        _clear()
    }

    const _clear = () => {
        setCategoryID('')
        setTitle('')
        setDesc('')
        setPrice('')
        setQuantity('')
        setSku('')
    }

    useEffect(() => {
        console.log('entry changed')
        console.log(`entry: ${JSON.stringify(entry)}`)

        setButtonState( (entry.category_id === '', entry.title === '', entry.description === '', entry.price === '', entry.quantity === '', entry.sku === '') ? false : true ) 

    },[entry])

    useEffect(() => {
        setEntry({ 'category_id' : category_id, 'title' : title, 'description' : description, 'price' : price, 'quantity' : quantity, 'sku' : sku})
    },[category_id, title, description, price, quantity, sku])

        const _detectValueChanged = (key, value) => {
        if (key === 'category_id') {
            setCategoryID(value)
        } else if (key === 'title'){
            setTitle(value)
        }else if (key === 'description'){
            setDesc(value)
        }else if (key === 'price'){
            setPrice(value)
        }else if (key === 'quantity'){
            setQuantity(value)
        }else if (key === 'sku'){
            setSku(value)
        }
        console.log('_detectValueChanged triggered')
    }

        useEffect(()=>{
        const loadCategories = async () => {
            try {
               const res ="http://127.0.0.1:3001/categories"
               



            } catch (err) {
                console.log("error")
            }
        }
    })

    return(
        <div className='ItemForm'>
            <Button clickme={ _add } title='Add Entry' enabled={ buttonState }/>
            <br/>
            <label>Category ID:</label>
            <select value={category_id}
                   onChange = { e => _detectValueChanged('category_id', e.target.value) }>
                    <option>Select Category</option>
                   </select>
            <br/>
            <label>Title</label>
            <input type='text' placeholder='Title' value={title}
                   onChange = { e => _detectValueChanged('title', e.target.value) } />
            <br/>
             <label>Description</label>
            <input type='text' placeholder='Description' value={description}
                   onChange = { e => _detectValueChanged('description', e.target.value) } />
            <br/>
            <label>Price</label>
            <input type='text' placeholder='Price' value={price}
                   onChange = { e => _detectValueChanged('price', e.target.value) } />
            <br/>
            <label>Quantity</label>
            <input type='text' placeholder='Quantity' value={quantity}
                   onChange = { e => _detectValueChanged('quantity', e.target.value) } />
            <br/>
            <label>Sku</label>
            <input type='text' placeholder='Sku' value={sku}
                   onChange = { e => _detectValueChanged('sku', e.target.value) } />
            <br/>
            
            
        </div>
    )

}

export default AddItemForm