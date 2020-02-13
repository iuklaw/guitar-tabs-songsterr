import { Reducer } from 'redux'
import { Tab, TabType } from '../../services/ApiService'
import { Actions as TabsActions } from '../actions/TabsActions'

export type InitialState = Readonly<{
    tabs: ReadonlyArray<Tab> | null,
    loading: boolean
    filters: ReadonlyArray<TabType>
}>

const recipeInitialState: InitialState = {
    tabs: null,
    loading: false,
    filters: ["PLAYER", "TEXT_GUITAR_TAB", "CHORDS", "TEXT_BASS_TAB"]
}

export default ((state = recipeInitialState, action): InitialState => {
    switch (action.type) {
        case 'GET_TABS':
            return { ...state, tabs: action.payload }
        case 'SET_FILTERS':
            return { ...state, filters: action.payload }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        default:
            return state
    }
}) as Reducer<InitialState, TabsActions>