import { useForm } from "react-hook-form";
import { LoginData } from "../../types/AuthTypes";

function ProfilePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => { }

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><img src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>
        <div className="card-body">
          <h2 className="card-title">Profile</h2>

          <form id='personal_details_form'
            className="card-body"
            onSubmit={handleSubmit(onSubmit)}
          >

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
            </div>

            First Name
            Last Name
            Address 
            Phone Number

            <div className="form-control mt-6 ">
              <button className="btn btn-primary  text-white font-semibold"
                type={'submit'}>
               Save Edits
              </button>
            </div>


          </form>


          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage