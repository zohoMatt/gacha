import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

const styles = require('./Table.scss');

type DataEntry = { [key: string]: string | number };
type ColumnTitle = { key: string; text: string };

export interface TableProps {
    columns: Array<ColumnTitle>;
    data: Array<DataEntry>;
}

const Table: React.FunctionComponent<TableProps> = ({ columns, data }) => {
    const keys = columns.map(c => c.key);
    const titles = columns.map(c => c.text);
    const valueSequence = data.map(kv => keys.map(k => kv[k]));

    const titleDoms = titles.map(t => <th key={uuidv4()}>{t}</th>);
    const dataDoms = valueSequence.map(rowData => (
        <tr key={uuidv4()}>
            {rowData.map(d => (
                <td key={uuidv4()}>
                    <input type="text" defaultValue={d} />
                </td>
            ))}
        </tr>
    ));
    return (
        <table>
            <thead>
                <tr>{titleDoms}</tr>
            </thead>
            <tbody>{dataDoms}</tbody>
        </table>
    );
};

export default Table;
