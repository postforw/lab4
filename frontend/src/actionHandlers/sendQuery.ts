import { MiddlewareAPI } from 'redux';

import { callBackend, callBackendWithNotify } from '../store/application/actions';
import { addQuery, SendQueryAction } from '../store/areaPage/actions';
import { RootState } from '../reducer';
import { parseQuery } from "../models/query";

export function sendQuery(action: SendQueryAction, store: MiddlewareAPI) {
    const state = store.getState() as RootState;

    const x = action.x ?? state.areaPage.form.x;
    const y = action.y ?? state.areaPage.form.y;
    const r = action.r ?? state.areaPage.form.r;

    if (x !== undefined && y !== undefined && r !== undefined) {
        store.dispatch(callBackendWithNotify(callBackend(
            'areaCheck',
            async fetch => {
                const response = await fetch;

                if (!response.ok) {
                    return;
                }

                store.dispatch(addQuery(parseQuery(await response.json())));
            },
            state.application.session,
            'POST',
            { x, y, r }
        )));
    }
}
