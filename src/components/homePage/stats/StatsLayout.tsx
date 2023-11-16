import StatCard from './StatCard'

function StatsLayout() {
  return (
    <>
      <div className="container my-24 mx-auto md:px-6">
        <section className=" text-center">
          <h2 className="mb-16 text-3xl font-bold">
            What can it <u className="text-primary dark:text-primary-400">do?</u>
          </h2>
          <div className="flex gap-6 w-full justify-center flex-wrap  ">
            <StatCard
              //  daisyUIStatColor={}
              benefit='Boost Sales by '
              stat='70%'
              companyName='AlphaRetail Inc.'
              details='Switching to QuantumFusion led to a 70% increase in sales within the first quarter.'
            />
            <StatCard
              daisyUIStatColor='secondary'
              benefit='Save '
              stat='40'
              benefit2='Hours Per Week'
              companyName='BetaLogistics Co.'
              details='Automate mundane tasks and focus on what matters, saving an average of 40 hours per week.'
            />

            <StatCard
              daisyUIStatColor='secondary'
              benefit='Increase ROI by '
              stat='200%'
              companyName='GammaHealth Systems'
              details='Implementing QuantumFusion resulted in a 200% ROI within the first six months.'
            />

          </div>
        </section>
      </div>
    </>
  )
}

export default StatsLayout