import React from 'react'
import './AboutCards.css'
import dart from '../../../assets/Images/Dart.svg'
import eye from '../../../assets/Images/Capa_1.svg'
import bulb from '../../../assets/Images/Group.svg'
const AboutCards = () => {
    return (
        <>
            <div className='about_cards_wrapper'>
            <div className='about_cards_content_wrapper all_Container'>

                <div className='about_card1'>
                    <img src={dart} />
                    <h3>Mission</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula</p>
                </div>
                <div className='about_card1'>
                    <img src={eye}/>
                    <h3>Vision</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula</p>
                </div>
                <div className='about_card1'>
                     <img src={bulb}/>
                    <h3>Values</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula</p>
                </div>
            </div>
            </div>
        </>
    )
}

export default AboutCards
