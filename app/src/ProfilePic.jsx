import React from 'react';

import './ProfilePic.css'

const ProfilePic = () => {
  return (<div className='profile-pic'>
    <span>
      <img src={`${process.env.PUBLIC_URL}/profile_pic.jpg`}/>
    </span>
    <span className='full-name'>Samuel R. Knepper</span>
  </div>);
};

export default ProfilePic;
