import TableRowItem from '../TableRow/TableRowItem'
import './TableItem.scss'

const TableItem = props => {
     const _editEntry = entry => {
        props.onEditItem(entry)
    }

    const _deleteEntry = entry => {
        props.onDeleteItem(entry)
    }

    return(
        <div className="Table-Component">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ItemName</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { props.items.map(
                        (entry, i) => { return( <TableRowItem key={i} index={i} entry={entry} onEditItem={_editEntry} onDeleteItem={_deleteEntry} /> ) }
                    )}
                </tbody>
            </table> 
        </div>
    )
}

export default TableItem