import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import TabItem from './TabItem';
import Loading from './Loading';
import './Tabs.css'
import { selectTabsLoading, selectFilteredTabs } from '../store/selectors/TabsSelectors';


const Tabs: FC = () => {
    const loading = useSelector(selectTabsLoading)
    const filteredArr = useSelector(selectFilteredTabs)

    if (loading) return <Loading />

    if (!filteredArr) return null

    if (filteredArr.length === 0) return <p className='no-results'>No results</p>

    return (
        <div className="tabs-container">
            <div className="heading">You found {filteredArr.length} {filteredArr.length === 1 ? 'song' : 'songs'}</div>
            <div className={'tab-list'}>
                {filteredArr.map(
                    (tab, index) => <TabItem tab={tab} index={index + 1} key={tab.id} />
                )}
            </div>
        </div>
    )
}

export default Tabs