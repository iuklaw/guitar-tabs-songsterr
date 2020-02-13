import React, { FC, useRef, useCallback, ComponentProps, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFiltersAction, loadTabsAction } from '../store/actions/TabsActions'
import { FaGuitar } from "react-icons/fa";
import { GiGuitar } from "react-icons/gi";
import { MdQueueMusic, MdPlayArrow } from "react-icons/md";
import { TabType } from '../services/ApiService';
import { selectTabsFilters } from '../store/selectors/TabsSelectors';
import './SearchBar.css'

type CheckboxItemType = Readonly<{
    id: TabType
    name: string
    icon: ReactNode
}>

const filters: ReadonlyArray<CheckboxItemType> = [
    { id: "TEXT_GUITAR_TAB", name: 'Guitar', icon: <FaGuitar size={64} className="filter-icons" /> },
    { id: "TEXT_BASS_TAB", name: 'Bass', icon: <GiGuitar size={64} className="filter-icons" /> },
    { id: "CHORDS", name: 'Chords', icon: <MdQueueMusic size={64} className="filter-icons" /> },
    { id: "PLAYER", name: 'Player', icon: <MdPlayArrow size={64} className="filter-icons" /> },
]

const SearchBar: FC = () => {
    const inputElement = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()

    const storeFilters = useSelector(selectTabsFilters)

    const handleFormSubmit = useCallback<Required<ComponentProps<'form'>>['onSubmit']>(
        (event) => {
            const { current: element } = inputElement

            if (element) {
                event.preventDefault()
                dispatch(loadTabsAction(element.value))
            }
        },
        [dispatch]
    )

    const enableFilter = useCallback(
        (filter: TabType) => { 
            const filtersSet = new Set(storeFilters)

            filtersSet.add(filter)

            dispatch(setFiltersAction(Array.from(filtersSet)))
        },
        [storeFilters, dispatch],
    )

    const disableFilter = useCallback(
        (filter: TabType) => {
            const filtersSet = new Set(storeFilters)

            filtersSet.delete(filter)

            dispatch(setFiltersAction(Array.from(filtersSet)))
        },
        [storeFilters, dispatch],
    )

    return (
        <div className="search-bar">
            <form onSubmit={handleFormSubmit}>
                <input ref={inputElement} required type="search" placeholder="Look for a song or artist" />
                <button value="Submit">Search</button>
            </form>
            <div className="filters-container">
                {filters.map((filter) => {
                    const isChecked = storeFilters.includes(filter.id)

                    return <div key={filter.id} className="checkbox-container">
                        <label htmlFor={filter.id} className="item-name">{filter.name}</label>
                        <input
                            id={filter.id}
                            type="checkbox"
                            name={filter.name}
                            value={filter.name}
                            checked={isChecked}
                            onChange={isChecked ? disableFilter.bind(undefined, filter.id) : enableFilter.bind(undefined, filter.id)}
                        />
                        <label htmlFor={filter.id} id='top-label' className={"checkbox-icon-" + (isChecked ? 'blue' : 'black')}>{filter.icon}</label>
                    </div>
                })}
            </div>
        </div>
    )
}

export default SearchBar
