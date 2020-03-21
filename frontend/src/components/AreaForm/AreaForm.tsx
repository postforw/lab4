import React from 'react';
import { Button } from 'react-toolbox/lib/button';

import { UpdateFormAction } from '../../store/areaPage/actions';
import { ButtonsField } from '../ButtonsField/ButtonsField';
import { NumberField } from '../NumberField/NumberField';

import './AreaForm.css';

export interface AreaFormProps {

    locked: boolean;

    x?: number;
    y?: number;
    r?: number;

    onChange(property: UpdateFormAction['property'], value?: number | null): void;
    onSubmit(): void;
}

interface AreaFormState {

    x?: number | null;
    y?: number | null;
    r?: number | null;

    yError: boolean;
}

export class AreaForm extends React.Component<AreaFormProps, AreaFormState> {

    private static errorMessages = {
        y: 'Y должен быть числом и входить в интервал (-5, 3)'
    };

    private static availableX = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(v => [String(v), v] as const);
    private static availableR = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(v => [String(v), v] as const);

    state: AreaFormState = { yError: false };

    componentDidUpdate(
        prevProps: Readonly<AreaFormProps>,
        prevState: Readonly<AreaFormState>,
        snapshot?: any
    ): void {
        if (
            this.state.yError !== (
                this.props.y === undefined && this.state.y !== undefined
            )
        ) {
            this.setState({
                ...this.state,

                yError: !this.state.yError
            });
        }

        (['x', 'y', 'r'] as const).forEach(property => {
            if (prevState[property] !== this.state[property]) {
                this.props.onChange(property, this.state[property]);
            }
        });
    }

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (this.validateParameters()) {
            this.props.onSubmit();
        }

        event.preventDefault();
    };

    private validateParameters() {
        const { x, y, r } = this.props;

        return x !== undefined && y !== undefined && r !== undefined;
    }

    render() {
        const { locked } = this.props;
        const { x, y, r, yError } = this.state;

        return (
            <div className="area-form">
                <form onSubmit={this.onSubmit}>
                    <ButtonsField label="Параметр X:" availableValues={AreaForm.availableX} value={x} disabled={locked}
                                 onChange={x => this.setState({ ...this.state, x })} />

                    <NumberField label="Параметр Y:" hint="(-5, 3)" value={y} maxLength={16}
                                 error={yError && AreaForm.errorMessages.y} disabled={locked}
                                 onChange={y => this.setState({ ...this.state, y })} />

                    <ButtonsField label="Параметр R:" availableValues={AreaForm.availableR} value={r} disabled={locked}
                                 onChange={r => this.setState({ ...this.state, r })} />

                    <Button type="submit" label="Проверить" raised primary
                            disabled={locked || !this.validateParameters()} />
                </form>
            </div>
        );
    }
}
