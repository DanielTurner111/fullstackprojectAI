import './EditItemForm.scss'

import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const EditItemForm = props => {


    const _update = () => {
        props.onUpdateItem(entry)
        _clear()
    }

    const [categories, setCategories] = useState([])

    const [id, setID] = useState('')
    const [category_id, setCategoryID] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sku, setSku] = useState('')

    const [entry, setEntry] = useState({})

    const [buttonState, setButtonState] = useState(false)

    const _clear = () => {
        setCategoryID('')
        setTitle('')
        setDesc('')
        setPrice('')
        setQuantity('')
        setSku('')
    }

    useEffect(() => {
        console.log('category changed')
        console.log(`category: ${JSON.stringify(entry)}`)


        setButtonState( (entry.category_id === 0 || entry.title === '' || entry.description === '' || entry.price === '' || entry.quantity === 0 || entry.sku === '') ? false : true ) 

    },[entry])

    useEffect(() => {
        setEntry({ 'id': id, 'category_id' : category_id, 'title' : title, 'description' : description, 'price' : price, 'quantity' : quantity, 'sku' : sku})
    },[id, category_id, title, description, price, quantity, sku])

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

    useEffect(() =>{
        if (props.item){
            setID(props.item.id)
            setCategoryID(props.item.category_id)
            setTitle(props.item.title)
            setDesc(props.item.description)
            setPrice(props.item.price)
            setQuantity(props.item.quantity)
            setSku(props.item.sku)
        }

    }, [props])

   useEffect(()=>{
        const loadCategories = async () => {
            try {
               const res = await fetch("http://127.0.0.1:3001/categories")
               const json = await res.json();
               console.log(json);
               setCategories(json.categories)


            } catch (err) {
                console.log("error")
            }
            }
            loadCategories();
        }, [])

    return(
        <div className='EditItemForm'>
            <Button clickme={ _update } title='Edit Entry' enabled={ buttonState }/>
            <br/>
            <label>Category ID:</label>
            <select value={category_id}
                   onChange = { e => _detectValueChanged('category_id', e.target.value) }>
                    <option value="">Select Category</option>
                    {categories.map((category)=>(
                        <option key={category.category_id} value={category.category_id} >{category.categoryName}</option>
                    ))}

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

export default EditItemForm