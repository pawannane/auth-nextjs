import React from 'react'

const userProfile = ({params}: any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Profile page</h1>
      <hr />
      <p>Profile page <span className='py-2 bg-orange-400'>{params.id}</span> </p>
    </div>
  )
}

export default userProfile
