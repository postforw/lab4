import React from 'react';

import { GuardForAuthorized } from '../../components/Guard/GuardForAuthorized';
import { HistoryTableContainer } from '../../components/HistoryTable/HistoryTableContainer';
import { AreaFormContainer } from '../../components/AreaForm/AreaFormContainer';
import { AreaContainer } from '../../components/Area/AreaContainer';
import { Guard } from '../../components/Guard/Guard';

import './AreaPage.css';

export interface AreaPageProps {

    session: string;
    historyLength: number;

    reloadHistory(session: string): void;
}

export class AreaPage extends React.Component<AreaPageProps> {

    private reloadInterval?: number;

    componentDidMount() {
        this.setReloadInterval();
    }

    componentDidUpdate(
        prevProps: Readonly<AreaPageProps>,
        prevState: Readonly<{}>,
        snapshot?: any
    ) {
        if (prevProps.session !== this.props.session) {
            if (this.reloadInterval !== undefined) {
                window.clearInterval(this.reloadInterval);
            }

            this.setReloadInterval();
        }
    }

    private setReloadInterval() {
        const { session, reloadHistory } = this.props;

        if (session !== undefined) {
            this.reloadInterval = window.setInterval(() => reloadHistory(session), 1000);
        }
    }

    render() {
        return (
            <GuardForAuthorized redirectUrl="/">
                <div className="area-page-main">
                    <div className="area-page-row">
                        <div className="area-container page-block">
                            <AreaContainer />
                        </div>

                        <div className="area-form-container page-block">
                            <AreaFormContainer />
                        </div>
                    </div>

                    <Guard isAllowed={this.props.historyLength > 0}>
                        <div className="history-table-container page-block">
                            <HistoryTableContainer />
                        </div>
                    </Guard>
                </div>
            </GuardForAuthorized>
        );
    }
}
