import React from 'react';

import { GuardForNonAuthorized } from '../../components/Guard/GuardForNonAuthorized';
import { LoginFormContainer } from '../../components/LoginForm/LoginFormContainer';

import './LoginPage.css';

export class LoginPage extends React.Component {

    render() {
        return (
            <GuardForNonAuthorized redirectUrl="/area">
                 <div className="login-page-main">
                    <div className="login-form-container page-block">
                        <LoginFormContainer />
                    </div>
                </div>
            </GuardForNonAuthorized>
        );
    }
}
