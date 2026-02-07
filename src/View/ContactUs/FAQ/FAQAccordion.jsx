import React, { useState } from 'react'
import down from '../../../assets/Images/Chevron.svg'
import right from '../../../assets/Images/Chevron Right.svg'
const FAQAccordion = ({ faqMentor, faqMentee }) => {
    const [faqIndex, setfaqIndex] = useState([]);

    const setIndex = (i) => {
        if (faqIndex.includes(i)) {
            setfaqIndex(prev => prev.filter(e => e !== i));

        } else {
            setfaqIndex([
                ...faqIndex,
                i
            ])
        }
    }

    const faqData = [
        {
            id: 1,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
        {
            id: 2,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
        {
            id: 3,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
        {
            id: 4,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
        {
            id: 5,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
    
    ]
    return (
        <>
            <div className='faq_accordion_wrapper'>
                {faqMentor?.length <= 0 && <p style={{
                    textAlign: 'center',
                }}>No faq for mentor is available...</p>}
                {faqMentor?.map((e) => (
                    <div className='faq_accordion' onClick={(() => { setIndex(e.id) })}>
                        <div className='faq_head_wrapper'>
                            <h3>{e?.heading}</h3>
                            {faqIndex.includes(e.id) && <div className='down_img56'>
                                <img src={down} />
                            </div>}

                            {!faqIndex.includes(e.id) && <div className='down_img57'>
                                <img src={right} />
                            </div>}
                        </div>
                        {faqIndex.includes(e.id) && <p dangerouslySetInnerHTML={{
                            __html: e?.description || "Meet our Founder"
                        }}></p>}
                    </div>
                ))}
                {faqMentee?.length <=0 && <p style={{
                    textAlign:'center',
                }}>No faq for mentee is available...</p>}
                {faqMentee?.map((e) => (
                    <div className='faq_accordion' onClick={(() => { setIndex(e.id) })}>
                        <div className='faq_head_wrapper'>
                            <h3>{e?.heading}</h3>
                            {faqIndex.includes(e.id) && <div className='down_img56'>
                                <img src={down} />
                            </div>}

                            {!faqIndex.includes(e.id) && <div className='down_img57'>
                                <img src={right} />
                            </div>}
                        </div>
                        {faqIndex.includes(e.id) && <p dangerouslySetInnerHTML={{
                            __html: e?.description || "Meet our Founder"
                        }}></p>}
                    </div>
                ))}
            </div>
        </>
    )
}

export default FAQAccordion
