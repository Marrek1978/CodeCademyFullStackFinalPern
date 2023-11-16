
function Hero() {

  const imageUrl = import.meta.env.BASE_URL + 'trevor-vannoy-UNzohJgG8W0-unsplash.jpg';

  return (
    <>
      <div className="hero h-[600px]" style={{ backgroundImage: `url(/images/${imageUrl})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">QuantumFusion: The Greatest Software Ever Created!</h1>
            <p className="mb-5">Revolutionize Your Business with Unmatched Performance, Security, and Support</p>
            <button className="btn btn-primary">Get Started with QuantumFusion Today</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero