import React, { FC } from 'react'
import { FaGuitar } from "react-icons/fa";
import { GiGuitar } from "react-icons/gi";
import { MdQueueMusic, MdPlayArrow } from "react-icons/md";
import { Tab } from '../services/ApiService';


type IProps = {
    tab: Tab
    index: number
}

const TabItem: FC<IProps> = ({ tab, index }) => {
    const tabItems = tab.tabTypes.map((type, i) => {
        switch (type) {
            case "PLAYER":
                return <div key={i} className="tab-item-icon"><div>Player</div> <MdPlayArrow size={32} color='#0080FF' /> </div>
            case "TEXT_GUITAR_TAB":
                return <div key={i} className="tab-item-icon"><div>Guitar</div> <FaGuitar size={32} color='#0080FF' /> </div>
            case "CHORDS":
                return <div key={i} className="tab-item-icon"><div>Chords</div> <MdQueueMusic size={32} color='#0080FF' /></div>
            case "TEXT_BASS_TAB":
                return <div key={i} className="tab-item-icon"><div>Bass</div> <GiGuitar size={32} color='#0080FF' /></div>
            default:
                return null
        }
    })

    return (
        <div className="tab-item">
            <div className="tab-item-index">{index}.</div>
            <a target="_blank" rel="noopener noreferrer" href={`http://www.songsterr.com/a/wa/song?id=${tab.id}`}><b><i>{tab.title}</i></b></a>
            <div className="artist">by <strong>{tab.artist.name}</strong></div>
            <div className="tab-item-types">{tabItems}</div>
            <hr />
        </div>
    )
}

export default TabItem
