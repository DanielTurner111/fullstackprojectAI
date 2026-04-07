import './TableRow.scss'

const TableRowItem = props => {

   const _editRowEntry = () => {
        props.onEditItems(props.entry)
    }

    const _deleteRowEntry = () => {
        props.onDeleteItems(props.entry)
    } 

    return(
        <tr>
            <td>{props.entry.id}</td>
            <td>{props.entry.category_id}</td>
            <td>{props.entry.title}</td>
            <td>{props.entry.description}</td>
            <td>{props.entry.price}</td>
            <td>{props.entry.quantity}</td>
            <td>{props.entry.sku}</td>
            <td>
                {props.entry.image && (
                    <img 
                        src={`http://127.0.0.1:3001/uploads/${props.entry.image}`} 
                        alt={props.entry.title} 
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                )}
            </td>
            <td><button onClick={ _editRowEntry }>Edit</button></td>
            <td><button onClick={ _deleteRowEntry }>Delete</button></td>
            <br/>
            <br/>
            <br/>
        </tr>
    )

}

export default TableRowItem