import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getStripeSessionStatus } from "../../axiosApi/axiosApi";


const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');
    console.log("🚀 ~ file: Return.tsx:14 ~ useEffect ~ sessionId:", sessionId)

    const fetchSessionStatus = async () => {
      try {
        if (!sessionId) return
        const axiosResponse = await getStripeSessionStatus(sessionId);
        console.log("🚀 ~ file: Return.tsx:28 ~ useEffect ~ axiosResponse:", axiosResponse)
        setStatus(axiosResponse?.data.status);
        setCustomerEmail(axiosResponse?.data.customer_email);
      } catch (error) { console.log("🚀 ~ file: Return.tsx:16 ~ useEffect ~ error", error) }
    }

    fetchSessionStatus()
  }, []);

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