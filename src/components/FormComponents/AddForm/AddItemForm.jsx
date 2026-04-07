import './AddItemForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const AddItemForm = props => {

    const [categories, setCategories] = useState([])

    const [category_id, setCategoryID] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sku, setSku] = useState('')
    const [imageFile, setImageFile] = useState(null) 

    const [buttonState, setButtonState] = useState(false)

    const _add = () => {
    const item = {
        category_id,
        title,
        description,
        price,
        quantity,
        sku,
        imageFile
    }

    // Pass the item object to the parent
    props.onAddItem(item)

    // Clear the form
    _clear()
}

   
    const _clear = () => {
        setCategoryID('')
        setTitle('')
        setDesc('')
        setPrice('')
        setQuantity('')
        setSku('')
        setImageFile(null)
    }

    useEffect(() => {
        setButtonState(
            category_id !== '' &&
            title !== '' &&
            description !== '' &&
            price !== '' &&
            quantity !== '' &&
            sku !== ''
        )
    }, [category_id, title, description, price, quantity, sku])

    const _detectValueChanged = (key, value) => {
        switch(key){
            case 'category_id': setCategoryID(value); break;
            case 'title': setTitle(value); break;
            case 'description': setDesc(value); break;
            case 'price': setPrice(value); break;
            case 'quantity': setQuantity(value); break;
            case 'sku': setSku(value); break;
            default: break;
        }
    }


    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetch("http://127.0.0.1:3001/categories")
                const json = await res.json();
                setCategories(json.categories)
            } catch (err) {
                console.log("Error loading categories:", err)
            }
        }
        loadCategories();
    }, [])

    return (
        <div className='ItemForm'>
            <Button clickme={ _add } title='Add Entry' enabled={ buttonState }/>
            <br/>

            <label>Category:</label>
            <select value={category_id} onChange={ e => _detectValueChanged('category_id', e.target.value) }>
                <option value="">Select Category</option>
                {categories.map(category => (
                    <option key={category.category_id} value={category.category_id}>
                        {category.categoryName}
                    </option>
                ))}
            </select>
            <br/>

            <label>Title:</label>
            <input type='text' placeholder='Title' value={title}
                   onChange={ e => _detectValueChanged('title', e.target.value) } />
            <br/>

            <label>Description:</label>
            <input type='text' placeholder='Description' value={description}
                   onChange={ e => _detectValueChanged('description', e.target.value) } />
            <br/>

            <label>Price:</label>
            <input type='text' placeholder='Price' value={price}
                   onChange={ e => _detectValueChanged('price', e.target.value) } />
            <br/>

            <label>Quantity:</label>
            <input type='text' placeholder='Quantity' value={quantity}
                   onChange={ e => _detectValueChanged('quantity', e.target.value) } />
            <br/>

            <label>SKU:</label>
            <input type='text' placeholder='Sku' value={sku}
                   onChange={ e => _detectValueChanged('sku', e.target.value) } />
            <br/>

            <label>Image:</label>
            <input type='file' accept='image/*' onChange={ e => setImageFile(e.target.files[0]) } />
            <br/>
        </div>
    )
}

export default AddItemForm