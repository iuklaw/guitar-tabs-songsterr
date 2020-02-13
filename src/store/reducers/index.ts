import { combineReducers } from 'redux'
import TabsReducer from './TabsReducer'

export const rootReducer = combineReducers({
    TabsReducer
})

export type RootState = ReturnType<typeof rootReducer>