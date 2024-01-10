import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../authContext/AuthContext";
import { getStripeSessionStatuAxios, submitSubToDbAxios } from "../../axiosApi/axiosApi";


const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [subFrequency, setSubFrequency] = useState();
  console.log("🚀 ~ file: Return.tsx:12 ~ Return ~ subFrequency:", subFrequency)
  const { userID } = useContext(AuthContext);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    const fetchSessionStatus = async () => {
      try {
        console.log("🚀 ~ file: Return.tsx:16 ~ useEffect ~ sessionId", sessionId)
        if (!sessionId) return
        const axiosResponse = await getStripeSessionStatuAxios(sessionId);
        setStatus(axiosResponse?.data.status);
        setCustomerEmail(axiosResponse?.data.customer_email);
        setSubFrequency(axiosResponse?.data.subFrequency);
      } catch (error) { console.log("🚀 ~ file: Return.tsx:16 ~ useEffect ~ error", error) }
    }

    fetchSessionStatus()
  }, []);


  //status === commplete => send to db
  useEffect(() => {


    console.log('useEffect status', status)
    if (status !== 'complete') return;
    if (!subFrequency) return;
    if (!userID) return;
    // have userId
    //have subscription type

    //send to db
    const submitSubscription = async () => {
      console.log('submiting')
      try {
        const axiosResponse = await submitSubToDbAxios(userID, subFrequency);
        console.log("🚀 ~ file: Return.tsx:48 ~ submitSubscription ~ axiosResponse:", axiosResponse)
      } catch (error) { console.log("🚀 ~ file: Return.tsx:16 ~ useEffect ~ error", error) }
    }
    submitSubscription()


  }, [status, subFrequency, userID]);

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.


        </p>
      </section>
    )
  }

  return null;
}

export default Return