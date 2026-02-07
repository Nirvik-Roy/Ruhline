import React from 'react'
import Button from '../../../Components/Button/Button.jsx'
const HomeAboutContent = ({ data }) => {
    return (
        <>
            <div className='home_about_right'>
                <h4 className='all_heading' dangerouslySetInnerHTML={{
                    __html: data?.headline || "ABOUT US"
                }}></h4>
                <h2 className='all_heading2' dangerouslySetInnerHTML={{
                    __html: data?.secondary_headline || "Align your body. Center your mind."
                }}></h2>
                <p dangerouslySetInnerHTML={{
                    __html: data?.description || "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum exercitationem ullam."
                }}></p>
                {/* <Button children={'Learn More'} styles={{ padding: '15px 40px',  marginTop: '10px' }} /> */}
            </div>
        </>
    )
}

export default HomeAboutContent
