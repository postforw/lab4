import React from 'react';

import { Query } from '../../models/query';

import './HistoryTable.css';

export interface HistoryTableProps {

    history: Query[];
}

export class HistoryTable extends React.Component<HistoryTableProps> {

    render() {
        const { history } = this.props;

        return (
            <table className="history-table">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время создания</th>
                    <th>Время обработки</th>
                </tr>
                </thead>

                <tbody>
                {[...history].reverse().map((query, i) => (
                    <tr key={i}>
                        <td>{query.x}</td>
                        <td>{query.y}</td>
                        <td className="no-wrap">{query.r}</td>
                        <td>точка {query.result ? '' : 'не'} попала в область</td>
                        <td>{query.created.toLocaleString()}</td>
                        <td className="no-wrap">{query.elapsed} с</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}
