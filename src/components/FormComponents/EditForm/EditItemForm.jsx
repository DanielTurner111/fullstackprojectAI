import './EditItemForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const EditItemForm = props => {

    const [categories, setCategories] = useState([])

    const [id, setID] = useState('')
    const [category_id, setCategoryID] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sku, setSku] = useState('')

    const [imageFile, setImageFile] = useState(null)    
    const [currentImage, setCurrentImage] = useState('')  

    const [entry, setEntry] = useState({})
    const [buttonState, setButtonState] = useState(false)

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
                const json = await res.json()
                setCategories(json.categories)
            } catch (err) {
                console.log("Error loading categories:", err)
            }
        }
        loadCategories()
    }, [])

    useEffect(() => {
        if (props.item) {
            setID(props.item.id)
            setCategoryID(props.item.category_id)
            setTitle(props.item.title)
            setDesc(props.item.description)
            setPrice(props.item.price)
            setQuantity(props.item.quantity)
            setSku(props.item.sku)
            setCurrentImage(props.item.image || '')  
            setImageFile(null)                       
        }
    }, [props.item])

    const _update = () => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('category_id', Number(category_id))
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', Number(price))
    formData.append('quantity', Number(quantity))
    formData.append('sku', sku)

    if (imageFile) {
        formData.append('image', imageFile)        
    } else {
        formData.append('currentImage', currentImage)
    }

    props.onUpdateItem(formData) 
    _clear()
}

    return (
        <div className='EditItemForm'>
            <Button clickme={ _update } title='Edit Entry' enabled={ buttonState }/>
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
            {currentImage && !imageFile && (
                <p>Current Image: {currentImage}</p>
            )}
            {imageFile && (
                <p>New Image: {imageFile.name}</p>
            )}
            <br/>
        </div>
    )
}

export default EditItemForm