import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { profile } from './ProfileForm.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import Toast from '../../components/Toast';
import UserDetailsForm from './UserDetailsForm';
import Otp from './Otp';

const ProfileForm = ({
  profileSuccess,
  profileError,
  resetAuthSuccess,
  resetAuthError,
  openMobileOtp,
  isResetOtp
}) => {
  useEffect(() => {
    return () => {
      profileError && resetAuthError();
      profileSuccess && resetAuthSuccess();
    };
  }, [profileSuccess, profileError, resetAuthSuccess, resetAuthError]);

  return (
    <div className={profile}>
      <nav>
        <h5>EDIT PROFILE</h5>
        {!openMobileOtp && (
          <Link to="/account/profile/password">CHANGE PASSWORD?</Link>
        )}
      </nav>
      {openMobileOtp ? <Otp /> : <UserDetailsForm />}

      {profileSuccess && (
        <Toast
          message={
            isResetOtp
              ? 'We’ve sent you a new one time password'
              : 'Profile updated successfully'
          }
          close={resetAuthSuccess}
        />
      )}

      {profileError && (
        <Toast type="error" message={profileError} close={resetAuthError} />
      )}
    </div>
  );
};

export default UserConsumer(ProfileForm);
