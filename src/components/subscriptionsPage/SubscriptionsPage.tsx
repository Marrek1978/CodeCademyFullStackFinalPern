import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import RadioCards from './RadioCards'
import AuthContext from '../authContext/AuthContext';

function SubscriptionsPage() {
  const { isLoggedIn, userID } = useContext(AuthContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);


  useEffect(() => {
    if (!isLoggedIn || !userID) return setRedirectToLogin(true);
  }, [isLoggedIn, userID])

  return (
    <>
      {redirectToLogin && <Navigate to="/auth?type=login" />}
      <div className="m-8 w-full ">
        <h2 className="card-title">Choose your Subscription</h2>
        <div className="py-8 w-full ">
          <RadioCards />
        </div>
      </div>
    </>
  )

}

export default SubscriptionsPage