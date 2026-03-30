import './Table.scss'
import TableRow from "../TableRow/TableRow.jsx"

const Table = props => {

    const _editEntry = entry => {
        props.onEditCategory(entry)
    }

    const _deleteEntry = entry => {
        props.onDeleteCategory(entry)
    }

    return(
        <div className="Table-Component">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { props.categories.map(
                        (entry, i) => { return( <TableRow key={i} index={i} entry={entry} onEditCategory={_editEntry} onDeleteCategory={_deleteEntry} /> ) }
                    )}
                </tbody>
            </table> 
        </div>
    )
    }
export default Table