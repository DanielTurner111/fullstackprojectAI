import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.scss'
import AddItemForm from './components/FormComponents/AddForm/AddItemForm.jsx';
import EditItemForm from './components/FormComponents/EditForm/EditItemForm.jsx';
import TableItem from './components/TableComponents/Table/TableItem.jsx';

const Items = props => {

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({})
  const [editingItem, setEditingItem] = useState(false);

 

   useEffect(()=>{
    console.log(`App component has loaded`)



    const url = "http://127.0.0.1:3001/items"
    axios.get(url)
         .then( response => {
            console.log(response) 

            setItems(response.data.items)
            

         })
         .catch( error => {
            console.log(error);
        })


  },[])

  const _addItem = item => {
    const formData = new FormData()
    formData.append('category_id', item.category_id)
    formData.append('title', item.title)
    formData.append('description', item.description)
    formData.append('price', item.price)
    formData.append('quantity', item.quantity)
    formData.append('sku', item.sku)
    if (item.imageFile) formData.append('image', item.imageFile) // make sure the key matches multer

    const url = "http://127.0.0.1:3001/items"
    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        setItems(response.data.items)
    })
    .catch(error => {
        console.log(error.response?.data || error)
    })
}

  const _editItem = item => {
   
    console.log(`_editItem fired`)
    console.log(item)

    setEditingItem(true)
    setSelectedItem(item)
  }

  const _updateItem = (formData) => {
  
    const id = formData.get('id'); 
    const url = `http://127.0.0.1:3001/items/${id}`;

    axios.patch(url, formData)
        .then(response => {
            setItems(response.data.items);
            setEditingItem(false);
            setSelectedItem({});
        })
        .catch(error => {
            console.log("Update error:", error);
        });
};
  const _deleteItem = item => {
    console.log(`_deleteCategory fired`)
    console.log(item)

    const url = `http://127.0.0.1:3001/items/${item.id}`
    axios.delete(url).then( response => {
      setItems(response.data.items)
    }).catch( error => {
        console.log(error);
    })
  }

  return(
    <div className='App'>
     
      {
        editingItem? (
          <EditItemForm onUpdateItem={_updateItem} item={selectedItem}/>
        ) : (
          
          <AddItemForm onAddItem={_addItem}/>
          
          
        )
      }
      <TableItem items={items} onEditItems={_editItem} onDeleteItems={_deleteItem}/>
      
    </div>
  )

}

export default Items;
