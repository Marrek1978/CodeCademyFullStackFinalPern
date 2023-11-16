interface StatCardProps {
  daisyUIStatColor?: string;
  benefit?: string;
  benefit2?: string;
  stat?: string;
  companyName?: string;
  details?: string
}

function StatCard({ daisyUIStatColor = 'primary', benefit = 'Boost Sales by', benefit2,  stat = '60%', companyName='CyberDyne', details='yolo' }: StatCardProps) {
  
  return (
  <>
    <div className="card card-compact w-96   ">
      <div className="stats ">

        <div className="stat">
          <div className="stat-title text-base-content font-bold ">{benefit}</div>
          <div className={`stat-value text-${daisyUIStatColor}`}>{stat}</div>
          <div className="stat-title text-base-content font-bold ">{benefit2}</div>
        </div>

      </div>
      <div className="card-body">
        <h2 className="card-title text-left text-sm text-base-content/70">{companyName}</h2>
        <p className="text-left text-base">{details}.</p>
        {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div> */}
      </div>
    </div>
  </>
)
}

export default StatCard