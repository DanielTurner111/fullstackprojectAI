import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.scss'
import Table from './components/TableComponents/Table/Table.jsx';
import AddForm from './components/FormComponents/AddForm/AddForm.jsx';
import EditForm from './components/FormComponents/EditForm/EditForm.jsx';

const App = props => {

  //create a state variable to hold some data
  const [entries, setEntries] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState({})

  useEffect(()=>{
    console.log(`App component has loaded`)

    //retrieve a list of all items from the server
    //use axios to retrieve (npm install axios)

    const url = "http://127.0.0.1:3001/entries"
    axios.get(url)
         .then( response => {
            console.log(response) //{"entries":[]}
            //response.data.entries <= array of values retrieved
            //can't do entries = response.data.entries
            setEntries(response.data.entries)

         })
         .catch( error => {
            console.log(error);
        })


  },[])

  const _addEntry = entry => {

    //instead of directly adding the entry to the array,
    //send to node via axios
    //returns an array of all current entries to display

    //setEntries( [ ...entries, entry] )
    //send the entry to the server via axios
    const url = "http://127.0.0.1:3001/entries"
    axios.post(url, { 
      item : entry
    })
    .then( response => {
      setEntries(response.data.entries)
    })
    .catch( error => {
          console.log(error);
      })

  }

  const _editEntry = entry => {
    //setEntries( [ ...entries, entry] )
    console.log(`_editEntry fired`)
    console.log(entry)

    //show the edit component
    setEditing(true)
    setSelectedEntry(entry)
  }

  const _updateEntry = entry => {
    console.log(`_updateEntry fired`)
   console.log(entry)

    const url = `http://127.0.0.1:3001/entries/${entry.id}`
    axios.patch(url, {
      item: entry
    }).then( response => {
      setEntries(response.data.entries)
      setEditing(false)
      setSelectedEntry({})
    }).catch( error => {
        console.log(error);
    })

  }

  const _deleteEntry = entry => {
    console.log(`_deleteEntry fired`)
    console.log(entry)

    const url = `http://127.0.0.1:3001/entries/${entry.id}`
    axios.delete(url).then( response => {
      setEntries(response.data.entries)
    }).catch( error => {
        console.log(error);
    })
  }

  return(
    <div className='App'>
      {
        editing ? (
          <EditForm onUpdateEntry={ _updateEntry } entry={ selectedEntry } />
        ) : (
          <AddForm onAddEntry={ _addEntry } />
        )
      }
      
      <Table entries={entries} onEditEntry={ _editEntry } onDeleteEntry={ _deleteEntry } />
    </div>
  )

}

export default App;
