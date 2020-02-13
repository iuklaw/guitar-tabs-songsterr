import ApiService, { Query, TabType, Tab } from '../../services/ApiService'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers'
import { Action } from 'redux'

type getTabsActionType = Action<'GET_TABS'> & Readonly<{
    payload: ReadonlyArray<Tab>
}>

type setFiltersActionType = Action<'SET_FILTERS'> & Readonly<{
    payload: ReadonlyArray<TabType>
}>

type setLoadingActionType = Action<'SET_LOADING'> & Readonly<{
    payload: boolean
}>

export type Actions =
    | getTabsActionType
    | setLoadingActionType
    | setFiltersActionType

export function setLoadingAction(payload: setLoadingActionType['payload']): setLoadingActionType {
    return {
        type: 'SET_LOADING',
        payload,
    }
}

export function getTabsAction(payload: getTabsActionType['payload']): getTabsActionType {
    return {
        type: 'GET_TABS',
        payload,
    }
}

export function loadTabsAction(query: Query): ThunkAction<void, RootState, void, Actions> {
    return async (dispatch) => {
        dispatch(setLoadingAction(true))

        try {
            dispatch(getTabsAction(await ApiService.getTabs(query)))
        } catch (error) {
            console.error(error)
        }

        dispatch(setLoadingAction(false))
    }
}

export function setFiltersAction(payload: setFiltersActionType['payload']): setFiltersActionType {
    return {
        type: 'SET_FILTERS',
        payload,
    }
}
