import React, { useState, useEffect } from 'react'
import {FiArrowUp} from 'react-icons/fi'
import './ScrollButton.css'

const ScrollButton = () => {

    const [isVisible, setVisible] = useState(false)

    useEffect(() => {
            document.addEventListener('scroll', (e) => {
                toggleVisibility()
            })
    }, [])

    const toggleVisibility = () => {
        if(window.pageYOffset > 400) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }


    return (
        <div className="scroll-to-top">
            {isVisible && (
                <div onClick={scrollToTop}>
                    <FiArrowUp  size={64} color="#0080FF"/>
                </div>
            )}
        </div>
    )
}

export default ScrollButton
