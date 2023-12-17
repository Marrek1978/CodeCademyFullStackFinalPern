import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { Toaster, toast } from 'sonner'

import { CardData, ProfileData } from "../../types/Types";
import AuthContext from "../authContext/AuthContext";
import { getUserCardDetailsAxios, getUserDataAxios, submitCardDetails, submitUserDetails } from '../../axiosApi/axiosApi'


function ProfilePage() {

  const { isLoggedIn, setIsLoggedIn, userID, setUserID } = useContext(AuthContext);
  const [userData, setUserData] = useState<ProfileData>();
  const [userCCData, setUserCCData] = useState<CardData>();
  const [toastMessage, setToastMessage] = useState<string | null>();
  const [toastSuccessMessage, setToastSuccessMessage] = useState<string | null>();
  const [redirectToLogin, setRedirectToLogin] = useState(false);


  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    setValue: setValuePersonal,
    // watch,
    formState: { errors: errorsPersonal },
  } = useForm<ProfileData>();

  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    formState: { errors: errorsCard },
    setValue: setValueCard,
  } = useForm<CardData>();


  useEffect(() => {
    if (toastMessage === null || toastMessage === undefined) return;
    toast.warning(toastMessage, {
      position: 'top-center',
      duration: 3000,
      action: {
        label: 'Close',
        onClick: () => console.log('Close'),
      },
    })
  }, [toastMessage])

  useEffect(() => {
    if (toastSuccessMessage === null || toastSuccessMessage === undefined) return;
    toast.success(toastSuccessMessage, {
      position: 'top-center',
      duration: 3000,
      action: {
        label: 'Close',
        onClick: () => console.log('Close'),
      },
    })
  }, [toastSuccessMessage])


  useEffect(() => {
    if (!isLoggedIn || !userID) return setRedirectToLogin(true);

    const getUserData = async () => {
      try {
        const response = await getUserDataAxios(userID as string)
        if (response.data?.error) {
          setToastMessage(response.data.error)
          setRedirectToLogin(true)
          setIsLoggedIn(false)
          setUserID(null)
        } else {
          setUserData(response.data.user)
        }
      } catch (err) {
        setRedirectToLogin(true)
      }
    }
    getUserData()

    const getUserCCData = async () => {

      try {
        const response = await getUserCardDetailsAxios(userID as string)
        if (response.data?.error) return setToastMessage(response.data.error)
        setUserCCData(response.data.userCCData) // user or type = 'notAuthed' ==> redirect to login
      } catch (err) {
        setToastMessage((err as Error).message)
      }
    }
    getUserCCData()

  }, [isLoggedIn, userID, setUserID, setIsLoggedIn])


  useEffect(() => {
    if (!userData) return
    setValuePersonal('email', userData.email)
    setValuePersonal('password', userData.password)
    setValuePersonal('firstname', userData.firstname)
    setValuePersonal('lastname', userData.lastname)
    setValuePersonal('address', userData.address)
    setValuePersonal('phone', userData.phone)
  }, [userData, setValuePersonal])


  useEffect(() => {
    if (!userCCData) return
    setValueCard('cardnumber', userCCData.cardnumber)
    setValueCard('expirationdate', userCCData.expirationdate)
    setValueCard('cvv', userCCData.cvv)
  }, [userCCData, setValueCard])


  if (!isLoggedIn) return <Navigate to="/auth" />;

  const onSubmitPersonal = async (data: ProfileData) => {
    if (!userID) return
    const response = await submitUserDetails(data, userID)
    if (response.data.error) return setToastMessage(response.data.error)
    setToastSuccessMessage('Saved User Details')
  }


  const onSubmitCC = async (data: CardData) => {
    if (!userID) return
    const response = await submitCardDetails(data, userID)
    if (response.data.error) return setToastMessage(response.data.error)
    setToastSuccessMessage('Saved Credit Card Details')
  }


  return (
    <>
      <div>
        <Toaster richColors />
      </div>

      {redirectToLogin && <Navigate to="/auth?type=login" />}

      <div className="card lg:card-side bg-base-100 shadow-xl w-full ">
        <div className="card-body flex-row w-full flex-wrap gap-12  ">

          <div className="  w-full max-w-lg">
            <h2 className="card-title">Profile</h2>
            <form id='personal_details_form'
              className="card-body max-w-3xl"
              onSubmit={handleSubmitPersonal(onSubmitPersonal)}
            >

              <div className="form-control max-w-lg">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...registerPersonal("email", {
                    required: "An email is required.",
                  })}  // This should correctly registerPersonal the email input
                />

              </div>
              <div className="text-[#e91111] font-medium text-sm">
                {errorsPersonal.email?.message as React.ReactNode}
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                {/* <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...registerPersonal("password", {
                    required: "A password is required.",
                    minLength: {
                      value: 5,
                      message: "Password min length is 5 characters",
                    },
                  })}
                /> */}
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errorsPersonal.password?.message as React.ReactNode}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  {...registerPersonal("firstname", {
                    required: "A first name is required.",
                    maxLength: {
                      value: 20,
                      message: "First name max length is 20 characters",
                    },
                    minLength: {
                      value: 3,
                      message: "First name min length is 3 characters",
                    },
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errorsPersonal.firstname?.message as React.ReactNode}
                </div>
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  {...registerPersonal("lastname", {
                    required: "A last name is required.",
                    maxLength: {
                      value: 20,
                      message: "First name max length is 20 characters",
                    },
                    minLength: {
                      value: 3,
                      message: "First name min length is 3 characters",
                    },
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errorsPersonal.lastname?.message as React.ReactNode}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Home Address"
                  className="input input-bordered"
                  {...registerPersonal("address", {
                    required: "An address is required.",
                    minLength: {
                      value: 5,
                      message: "Address is too short."
                    },
                    maxLength: {
                      value: 100,
                      message: "Address is too long."
                    }
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errorsPersonal.address?.message as React.ReactNode}
                </div>
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered"
                  {...registerPersonal("phone", {
                    required: "Phone number is required.",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number format"
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be 10 digits"
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number must be 10 digits"
                    }
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errorsPersonal.phone?.message as React.ReactNode}
                </div>
              </div>


              <div className="form-control mt-6 ">
                <button className="btn btn-primary  text-white font-semibold"
                  type={'submit'}>
                  Save Profile Information
                </button>
              </div>
            </form>
          </div>


          {/* //*********   CREDIT CARD INFO  ********************************  */}

          <div className="w-full max-w-lg">
            <h2 className="card-title">Credit Card Info</h2>
            <form id='cc_details_form'
              className="card-body"
              onSubmit={handleSubmitCard(onSubmitCC)}
            >

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Credit Card Numbers</span>
                </label>
                <input
                  type="text"
                  placeholder="Credit Card Number"
                  className="input input-bordered"
                  {...registerCard("cardnumber", {
                    required: "Card number is required",
                    pattern: {
                      value: /^\d{13,16}$/,
                      message: "Invalid card number"
                    },
                    // You can add more complex validation here
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errorsCard.cardnumber?.message as React.ReactNode}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Credit Card Numbers</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="MM/YY"
                  {...registerCard("expirationdate", {
                    required: "Expiration date is required",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                      message: "Invalid expiration date"
                    },
                    // Additional validation to check if the date is in the future
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errorsCard.expirationdate?.message as React.ReactNode}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">CVV Numbers</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="CVV"
                  {...registerCard("cvv", {
                    required: "CVV is required",
                    pattern: {
                      value: /^\d{3,4}$/,
                      message: "Invalid CVV"
                    },
                    // Additional validation based on card type can be added
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errorsCard.cvv?.message as React.ReactNode}
                </div>
              </div>



              <div className="form-control mt-6 ">
                <button className="btn btn-primary  text-white font-semibold"
                  type={'submit'}>
                  Save Credit Card Information
                </button>
              </div>
            </form>
          </div>

        </div>
      </div >
    </>
  )
}

export default ProfilePage