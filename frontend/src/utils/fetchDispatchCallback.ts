import { Dispatch } from 'redux';

export type FetchDispatchCallback = (fetch: Promise<Response>, dispatch: Dispatch) => void;
