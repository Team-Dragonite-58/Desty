import React from 'react'

export default function Navbar() {


    return (
        <div className='flex justify-center'>
            <nav className='flex justify-center	justify-between w-9/12'>
                <div className=''>
                    Logo
                </div>
                <div>
                    <div className=''>
                        login
                    </div>
                    <div className=''>
                        signup
                    </div>
                </div>
            </nav>
        </div>
    )
}