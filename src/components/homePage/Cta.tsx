import { Link } from "react-router-dom"

function Cta() {
  return (
    <>
      <section className="w-full flex justify-center mb-24">
        <div className="card lg:card-side bg-base-100 shadow-xl max-h-[300px]   ">
          <figure><img src="public\images\tech.webp" height='100px' alt="Album" /></figure>
          <div className="card-body flex justify-center ">
            <h2 className="card-title text-2xl">Ready to Experience the Future?</h2>
            <div className="card-actions justify-end mt-6">
              <Link to='/auth'>
                <button className="btn btn-primary mt-0">Start Your Free Trial Now</button>
              </Link>
            </div>
          </div>
        </div>
      </section >
    </>

  )
}

export default Cta