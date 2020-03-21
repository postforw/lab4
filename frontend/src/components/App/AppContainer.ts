import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { App, AppProps } from './App';
import { callBackend, setSession } from '../../store/application/actions';
import { updateHistory } from "../../store/areaPage/actions";
import { parseQuery } from "../../models/query";

type DispatchProps = Pick<AppProps, 'loadSession'>;

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return {
        loadSession(): void {
            try {
                const session = JSON.parse(localStorage.getItem('session') ?? 'null');

                if (session) {
                    dispatch(callBackend('history', async fetch => {
                        const response = await fetch;

                        if (response.ok) {
                            dispatch(setSession(session));
                            dispatch(updateHistory((await response.json()).map(parseQuery)))
                        }
                    }, session));
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}

export const AppContainer = connect(undefined, mapDispatchToProps)(App);
