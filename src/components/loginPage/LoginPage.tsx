import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { set, useForm } from "react-hook-form"
import { loginUserAxios, registerUserAxios } from '../../axiosApi/axiosApi.js'


import { Navigate } from 'react-router-dom'

import type { LoginData } from "../../types/AuthTypes.js";
import AuthContext from "../authContext/AuthContext.js";


function LoginPage() {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>();
  const type = searchParams.get("type"); //join or login
  const [loginType, setLoginType] = useState(type || "login"); //join or login
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  const { userID, setUserID } = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>();


  useEffect(() => {
    if (type === undefined || type === null) return;
    setLoginType(type);
  }, [type]);


  useEffect(() => {
    console.log('useEffect')
    console.log("🚀 ~ file: LoginPage.tsx:41 ~ useEffect ~ isLoggedIn:", isLoggedIn)
    if (isLoggedIn) {
      setRedirectToProfile(true);
    }
  }, [isLoggedIn])

  const bgImageUrl = import.meta.env.BASE_URL + "fabio-oyXis2kALVg-unsplash.jpg";

  const btnText = loginType === "login" ? "Login" : "Register";
  const linkText = loginType === "login" ? "Register Here" : "Login Here";
  const linkType = loginType === "login" ? "join" : "login";

  const onSubmit = async (data: LoginData) => {  //{email: 'asdf@asd', password: 'asdfadsf'}

    if (loginType === 'login') {
      try {
        const resData = await loginUserAxios(data);

        if (resData.data?.authed) {
          setIsLoggedIn(true);
          setUserID(resData.data?.user_id);
          setRedirectToProfile(true);
        }
      } catch (error) {
        setErrorMessage(error as string);
      }
    }

    if (loginType === 'join') {
      try {
        const resData = await registerUserAxios(data);
        if (resData.data?.authed) setRedirectToLogin(true);
      } catch (error) {
        setErrorMessage(error as string);
      }
    }

    // try {
    //   const res = await registerUserAxios(data);

    //   if (res.data.authed) {
    //     setRedirect(true);
    //   }

    //   if (res.data.error) {
    //     setErrorMessage(res.data.error);
    //   }
    // } catch (err) {
    //   setErrorMessage(err);
    // }
  };

  return (
    <>
      {redirectToProfile && <Navigate to="/profile" />}
      {redirectToLogin && <Navigate to="/auth?type=login" />}
      <div
        className="hero bg-base-200 my-6 h-[800px] "
        style={{ backgroundImage: `url(/images/${bgImageUrl})` }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse shadow-xl">
          <div className="text-center lg:text-left ">
            <h1 className="text-5xl font-bold  text-white">Login now!</h1>
            <p className="py-6 font-semibold text-white">
              Login or register to view the latest product features!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
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
                  placeholder="password"
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

                <div className="flex w-full justify-between">
                  <label className="label">
                    <Link to="#" className="label-text-alt link link-hover">
                      Remeber Me
                    </Link>
                  </label>
                  <label className="label">
                    <Link to="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </Link>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6 ">
                <button className="btn btn-primary  text-white font-semibold"
                  type={'submit'}>
                  {btnText}
                </button>
              </div>
              <label className="label flex justify-center">
                <Link
                  to={`/auth?type=${linkType}`}
                  className="label-text-alt link link-hover max-w-max  "
                >
                  {linkText}
                </Link>
              </label>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-0 mb-0 text-center font-semibold">OR</p>
              </div>

              {/* <!-- Social login buttons --> */}
              <button className="btn btn-primary  text-white font-semibold">
                <figure>
                  <img
                    src="/images/icons8-google-50.png"
                    height="16x"
                    width="16px"
                  ></img>
                </figure>
                Continue with Google
              </button>

              <button className="btn btn-primary  text-white font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                Continue with FaceBook
              </button>

              <button className="btn btn-primary  text-white font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Continue with Twitter
              </button>

              <button className="btn btn-primary  text-white font-semibold">
                <figure>
                  <img
                    src="/images/github-mark-white.png"
                    height="16px"
                    width="16px"
                  ></img>
                </figure>
                Continue with GitHub
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;