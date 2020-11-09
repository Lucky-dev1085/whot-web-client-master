import React from 'react';
import { Route } from 'react-router-dom';

import ProfileForm from '../../components/ProfileForm';
import DeleteAccount from '../../components/DeleteAccount';
import ChangePassword from '../../components/ChangePassword';

const Profile = () => (
  <>
    <Route exact path="/account/profile" component={ProfileForm} />
    <Route exact path="/account/profile/delete" component={DeleteAccount} />
    <Route exact path="/account/profile/password" component={ChangePassword} />
  </>
);

export default Profile;
