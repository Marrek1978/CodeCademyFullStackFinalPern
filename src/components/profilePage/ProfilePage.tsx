import { set, useForm } from "react-hook-form";
import { ProfileData } from "../../types/AuthTypes";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../authContext/AuthContext";
import { Navigate } from "react-router-dom";
import { getUserDataAxios } from '../../axiosApi/axiosApi'

function ProfilePage() {

  const { isLoggedIn, userID } = useContext(AuthContext);
  const [userData, setUserData] = useState<ProfileData>();
  // const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [phone, setPhone] = useState<string>();


  const {
    register,
    setValue,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<ProfileData>();

  console.log("🚀 ~  userData State Var:", userData)

  useEffect(() => {
    if (isLoggedIn && userID) {
      const getUserData = async () => {
        try {
          const response = await getUserDataAxios(userID)
          setUserData(response.data.user)
        } catch (err) { throw new Error('error') }
      }
      getUserData()
    }
  }, [isLoggedIn, userID])


  useEffect(() => {

    if (!userData) return
    setValue('email', userData.email)
    setValue('password', userData.password)
    setValue('firstName', userData.firstName)
    setValue('lastName', userData.lastName)
    setValue('address', userData.address)
    setValue('phone', userData.phone)


  }, [userData, setValue])





  if (!isLoggedIn) return <Navigate to="/auth" />;


  const onSubmitPersonal = async (data: ProfileData) => {
    console.log(data)
  }
  const onSubmitCC = async (data: ProfileData) => {
    console.log(data)
  }

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl w-full ">
        <div className="card-body flex-row w-full flex-wrap gap-12  ">

          <div className="  w-full max-w-lg">
            <h2 className="card-title">Profile</h2>
            <form id='personal_details_form'
              className="card-body max-w-3xl"
              onSubmit={handleSubmit(onSubmitPersonal)}
            >

              <div className="form-control max-w-lg">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", {
                    required: "An email is required.",
                  })}  // This should correctly register the email input
                />

              </div>
              <div className="text-[#e91111] font-medium text-sm">
                {errors.email?.message as React.ReactNode}
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "A password is required.",
                    minLength: {
                      value: 5,
                      message: "Password min length is 5 characters",
                    },
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errors.password?.message as React.ReactNode}
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
                  {...register("firstName", {
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
                  {errors.firstName?.message as React.ReactNode}
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
                  {...register("lastName", {
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
                  {errors.lastName?.message as React.ReactNode}
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
                  {...register("address", {
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
                  {errors.address?.message as React.ReactNode}
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
                  {...register("phone", {
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
                  {errors.phone?.message as React.ReactNode}
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
              className="card-body  "
              onSubmit={handleSubmit(onSubmitCC)}
            >
              {/* 
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Credit Card Numbers</span>
                </label>
                <input
                  type="text"
                  placeholder="Credit Card Number"
                  className="input input-bordered"
                  {...register("cardNumber", {
                    required: "Card number is required",
                    pattern: {
                      value: /^\d{13,16}$/,
                      message: "Invalid card number"
                    },
                    // You can add more complex validation here
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errors.cardNumber?.message as React.ReactNode}
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
                  {...register("expirationDate", {
                    required: "Expiration date is required",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                      message: "Invalid expiration date"
                    },
                    // Additional validation to check if the date is in the future
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errors.expirationDate?.message as React.ReactNode}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Credit Card Numbers</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="CVV"
                  {...register("cvv", {
                    required: "CVV is required",
                    pattern: {
                      value: /^\d{3,4}$/,
                      message: "Invalid CVV"
                    },
                    // Additional validation based on card type can be added
                  })}
                />
                <div className="text-[#e91111] font-medium text-sm mt-2">
                  {errors.expirationDate?.message as React.ReactNode}
                </div>
              </div> */}



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