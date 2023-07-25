import React from 'react'

export default function UserInfo() {

    return (
        <div className='flex justify-between h-48 items-center w-9/12'>
            <div className='pl-6 items-center flex' >
                <img className='h-10 pr-6' src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' alt='sumthin bruh' />
                <div >
                    <h1>Name</h1>
                    <h3>@username</h3>
                </div>
            </div>
            <div>
                current location
            </div>
        </div>
    )
}