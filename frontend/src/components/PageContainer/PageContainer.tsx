import React from 'react';

import { Layout, Panel } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';

import { SignOutButtonContainer } from '../SignOutButton/SignOutButtonContainer';
import { GuardForAuthorized } from '../Guard/GuardForAuthorized';
import { Header } from "../Header/Header";

import './PageContainer.css';

export class PageContainer extends React.Component<React.PropsWithChildren<{}>> {

    render() {
        return (
            <Layout className="page">
                <Panel>
                    <GuardForAuthorized>
                        <AppBar>
                            <div className="page-title">
                                <SignOutButtonContainer />
                            </div>
                        </AppBar>
                    </GuardForAuthorized>

                    <div className="page-content">
                        <Header />

                        {this.props.children}
                    </div>
                </Panel>
            </Layout>
        );
    }
}
