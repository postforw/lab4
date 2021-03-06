import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { Dialog, DialogActionProps } from 'react-toolbox/lib/dialog';

import { TextField } from '../TextField/TextField';
import { PasswordField } from '../PasswordField/PasswordField';

import './LoginForm.css';

export interface LoginFormProps {

    locked: boolean;

    onSignIn(username: string, password: string, onError: (status: number) => void): void;
    onSignUp(username: string, password: string, onSuccess: () => void, onError: (status: number) => void): void;
}

interface LoginFormState {

    username: string;
    password: string;

    usernameError?: string;
    passwordError?: string;

    successRegistrationDialog: boolean;
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    state: LoginFormState = { username: '', password: '', successRegistrationDialog: false };

    private onUsernameChange = (username: string) => this.setState({ ...this.state, username, usernameError: undefined });
    private onPasswordChange = (password: string) => this.setState({ ...this.state, password, passwordError: undefined });

    private onSuccessRegistrationDialogHide = () => {
        this.setState({
            ...this.state,

            successRegistrationDialog: false
        });
    };

    private okDialogAction: DialogActionProps = { label: 'Ок', onClick: this.onSuccessRegistrationDialogHide };

    private onSignInError = (status: number) => {
        if (status === 401) {
            this.setState({
                ...this.state,

                usernameError: 'Неверное имя пользователя или пароль'
            });
        }
    };

    private onSignUpSuccess = () => {
        this.setState({ ...this.state, successRegistrationDialog: true });
    };

    private onSignUpError = (status: number) => {
        const { username, password } = this.state;

        switch (status) {
            case 400:
                if (username.length < 2) {
                    this.setState({
                        ...this.state,

                        usernameError: 'Имя пользователя должно содержать как минимум 2 символа'
                    });
                } else if (password.length === 0) {
                    this.setState({
                        ...this.state,

                        passwordError: 'Пароль не должен быть пустым'
                    });
                }
                break;

            case 409:
                this.setState({
                    ...this.state,

                    usernameError: 'Пользователь с таким именем уже зарегистрирован'
                });
                break;
        }
    };

    private onSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        const { username, password } = this.state;

        this.setState({ ...this.state, usernameError: undefined, passwordError: undefined });
        this.props.onSignIn(username, password, this.onSignInError);
        event.preventDefault();
    };

    private onSignUp = (event: React.FormEvent<HTMLButtonElement>) => {
        const { username, password } = this.state;

        this.setState({ ...this.state, usernameError: undefined, passwordError: undefined });
        this.props.onSignUp(username, password, this.onSignUpSuccess, this.onSignUpError);
        event.preventDefault();
    };

    render() {
        const { locked } = this.props;
        const { username, password, usernameError, passwordError, successRegistrationDialog } = this.state;

        return (
            <div className="login-form">
                <form onSubmit={this.onSignIn}>
                    <TextField label="Имя пользователя:" disabled={locked} error={usernameError} value={username}
                               onChange={this.onUsernameChange} />

                    <PasswordField label="Пароль:" disabled={locked} error={passwordError} value={password}
                                   onChange={this.onPasswordChange} />

                    <Button type="submit" label="Вход" className="page-rightGap" raised primary disabled={locked} />
                    <Button type="button" label="Регистрация" raised disabled={locked} onClick={this.onSignUp} />
                </form>

                <Dialog title="Поздравляем" actions={[this.okDialogAction]}
                        onOverlayClick={this.onSuccessRegistrationDialogHide}
                        onEscKeyDown={this.onSuccessRegistrationDialogHide}
                        active={successRegistrationDialog}>
                    <p>
                        Вы успешно зарегистрированы!
                    </p>
                </Dialog>
            </div>
        );
    }
}
