import { MiddlewareAPI } from 'redux';

import { ApplicationActionType, ResetSessionAction, SetSessionAction } from '../store/application/actions';
import { clean } from '../store/areaPage/actions';

export function sessionHandler(action: SetSessionAction | ResetSessionAction, store: MiddlewareAPI) {
    switch (action.type) {
        case ApplicationActionType.SET_SESSION:
            localStorage.setItem('session', JSON.stringify((action as SetSessionAction).session));
            break;

        case ApplicationActionType.RESET_SESSION:
            localStorage.removeItem('session');

            store.dispatch(clean());
            break;
    }
}
