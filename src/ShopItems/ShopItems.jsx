import './ShopItems.scss'
import { useState, useEffect } from 'react'

const ShopItems = props => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

   
    useEffect(()=>{
        const grabCategories = async () => {
            try {
               const res = await fetch("http://127.0.0.1:3001/categories")
               const json = await res.json();
               setCategories(json.categories)
            } catch (err) {
                console.log("error categories", err)
            }  
        }
        grabCategories();
    }, [])

   
    useEffect(()=>{
        if (categories.length === 0) return;

        const grabItems = async () => {
            try {
                const res = await fetch("http://127.0.0.1:3001/items")
                const json = await res.json();            

                const merged = json.items.map(item => {
                    const matched = categories.find(cat => cat.category_id === item.category_id)
                    return {
                        item,
                        matched
                    }
                })

                setItems(merged)
                
            } catch (err){
                console.log("error items", err)
            }
        }
        grabItems();
    }, [categories])

    return (
        <div className='item-shop'>
            {items.map((entry, index)=> (
                <div key={index} className='shop-item'>
                    <h1 className='h1-item'>{entry.item.title}</h1>
                    <p className='item-p'>{entry.matched?.categoryName}</p>
                    <p className='item-p'>{entry.item.description}</p>
                    <p className='item-p'>${entry.item.price}</p>

                    {}
                    {entry.item.image && (
                        <img 
                            src={`http://127.0.0.1:3001/uploads/${entry.item.image}`} 
                            alt={entry.item.title} 
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

export default ShopItems;