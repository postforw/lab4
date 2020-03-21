import React from 'react';

import { TextField, TextFieldProps } from '../TextField/TextField';

interface NumberFieldProps extends TextFieldProps {

    trimValue: boolean;
    value?: number | null;

    onChange(value?: number | null): void;
}

interface NumberFieldState {

    value: string;
}

export class NumberField extends React.Component<NumberFieldProps, NumberFieldState> {

    static defaultProps: NumberFieldProps = { trimValue: true, onChange() {} };

    state: NumberFieldState = { value: '' };

    private onChange = (value: string) => {
        if (this.props.trimValue) {
            value = value.trim();
        }

        if (this.props.maxLength !== undefined && value.length > this.props.maxLength) {
            return;
        }

        this.setState({ ...this.state, value });
    };

    private static verifyNumber(value: string) {
        if (!value.trim()) {
            return undefined;
        }

        value = value.replace(',', '.');
        if (isNaN(+value)) {
            return null;
        }

        return +value;
    }

    componentDidUpdate(
        prevProps: Readonly<NumberFieldProps>,
        prevState: Readonly<NumberFieldState>,
        snapshot?: any
    ): void {
        if (prevProps.value !== this.props.value && this.props.value) {
            if (+this.state.value !== this.props.value) {
                this.setState({ ...this.state, value: String(this.props.value) });
            }
        }

        if (prevState.value !== this.state.value) {
            const value = NumberField.verifyNumber(this.state.value);

            if (NumberField.verifyNumber(prevState.value) !== value) {
                this.props.onChange(value);
            }
        }
    }

    render() {
        const fieldProps = { ...this.props };

        delete fieldProps.trimValue;
        delete fieldProps.value;
        delete fieldProps.onChange;
        delete fieldProps.maxLength;

        return (
            <TextField type="text" {...fieldProps} value={this.state.value} onChange={this.onChange} />
        );
    }
}
