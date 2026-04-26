import React from 'react'

const DashboardLoader = () => {
    return (
        <>
            <div style={{
                width: '100%',
                height: '30vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                zIndex: '9',
                position:'absolute',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)'
            }}>

                <span class="loader"></span>
                <p style={{
                    color: 'var(--text-color)',
                    fontWeight: '600',
                }}>Loading...</p>
            </div>
        </>
    )
}

export default DashboardLoader
