import React from 'react'

const HomeChooseContent = ({ data }) => {
    console.log(data)
    return (
        <>
            <div className='home_choose_us_right'>
                <h1 className='all_heading' dangerouslySetInnerHTML={{
                    __html: data?.headline || "WHY CHOOSE US"
                }}></h1>
                <h2 className='all_heading2' dangerouslySetInnerHTML={{
                    __html: data?.secondary_headline || "Guided by Peace, Rooted in Balance"
                }}></h2>
                <div className='home_choose_points_wrapper'>
                    {data?.options.length <= 0 && <>
                        <div className='home_choose_points'>
                            <h3>1</h3>
                            <h4>Lorem ipsum dolor</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula</p>
                        </div>

                        <div className='home_choose_points'>
                            <h3>2</h3>
                            <h4>Lorem ipsum dolor</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula</p>
                        </div>

                        <div className='home_choose_points'>
                            <h3>3</h3>
                            <h4>Lorem ipsum dolor</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula</p>
                        </div>
                    </>}

                    {data?.options.length > 0 && data?.options.map((e, i) => (
                        <div className='home_choose_points'>
                            {(e?.title || e?.description) && (
                                <h3>{i+1}</h3>
                            )}
                            <h4>{e?.title}</h4>
                            <p>{e?.description}</p>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default HomeChooseContent
