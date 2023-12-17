import { useContext, useEffect, useState } from 'react';
import RadioCard from './RadioCard'
import AuthContext from '../authContext/AuthContext';
import { Navigate } from 'react-router-dom';

function SubscriptionsPage() {
  const { isLoggedIn, userID } = useContext(AuthContext);
  console.log("🚀 ~ file: SubscriptionsPage.tsx:8 ~ SubscriptionsPage ~ userID:", userID, '-')
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  console.log('subscripotions page')

  useEffect(() => {
    if (!isLoggedIn || !userID) return setRedirectToLogin(true);
  }, [isLoggedIn, userID])

  return (
    <>
      {redirectToLogin && <Navigate to="/auth?type=login" />}
      <div className="m-8 w-full ">
        <h2 className="card-title">Choose your Subscription</h2>
        <div className="py-8 w-full ">
          <RadioCard />
        </div>
      </div>
    </>
  )

}

export default SubscriptionsPage