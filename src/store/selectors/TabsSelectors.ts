import { createSelector } from 'reselect'
import { RootState } from '../reducers'
import { Tab } from '../../services/ApiService'

export const selectTabsState = (rootState: RootState) => rootState.TabsReducer

export const selectTabsFilters = createSelector(
    selectTabsState,
    ({ filters }) => filters,
)

export const selectTabsLoading = createSelector(
    selectTabsState,
    ({ loading }) => loading,
)

export const selectAllTabs = createSelector(
    selectTabsState,
    ({ tabs }) => tabs,
)

export const selectFilteredTabs = createSelector(
    selectAllTabs,
    selectTabsFilters,
    (tabs, filters): ReadonlyArray<Tab> | undefined => tabs?.filter(
        (tab) => {
            for (const filter of filters) {
                if (tab.tabTypes.includes(filter)) {
                    return true
                }
            }

            return false
        },
    ),
)