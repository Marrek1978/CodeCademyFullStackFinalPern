import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
const stripePromise = loadStripe("pk_test_51Mr2XVAhpVvmqSVAD0ZnTYJwKTbQe7nvxrvaIx0uoBWgvOuiU9Y61qvi9RvRqbe5RNvhbk3R8gvtqdbE1LwAvIJs00jd7JuuPJ");

import RedirectToLogin from '../redirects/RedirectToLogin';
import { getStripSessionAxios } from '../../axiosApi/axiosApi';


const CheckoutForm = () => {

  const subscriptionId = new URLSearchParams(window.location.search).get('subscriptionId');
  console.log("🚀 ~ file: CheckoutForm.tsx:15 ~ CheckoutForm ~ subscriptionId:", subscriptionId)

  const redirectToLogin = RedirectToLogin();
  const [clientSecret, setClientSecret] = useState<string>();


  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (!subscriptionId) return;
        const axiosResponseClientSecret = await getStripSessionAxios(subscriptionId);
        setClientSecret(axiosResponseClientSecret as string);
      } catch (error) { console.log("🚀 ~ file: CheckoutForm.tsx:16 ~ CheckoutForm ~ error", error) }
    };

    fetchClientSecret();
  }, [subscriptionId]);

  return (
    <>
      {redirectToLogin && <Navigate to="/auth?type=login" />}

      <div id="checkout" className='py-8'>

        <div className='w-full flex justify-center'>
          <div className='max-w-xl w-full'>
            <h1 className="text-2xl font-bold">Checkout</h1>
            <p className="text-gray-500">Test the Checkout by using these fake credit cards</p>
            <div className='mt-4 grid grid-cols-2 justify-items-start '>
              <div>
                Payment succeeds
              </div>
              <div>
                4242 4242 4242 4242
              </div>
              <div>
                Payment requires authentication
              </div>
              <div>
                4000 0025 0000 3155
              </div>
              <div>
                Payment is declined
              </div>
              <div>
                4000 0000 0000 9995
              </div>
            </div>

          </div>
        </div>


        {clientSecret && (
          <div className="card my-8 py-8 bg-base-100  w-full  ">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}


      </div>
    </>
  )
}

export default CheckoutForm