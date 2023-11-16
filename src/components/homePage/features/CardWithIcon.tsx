
type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function CardWithIcon({ icon, title, description }: Props) {
  return (
    <>
      <div className="card w-96 bg-base-100  ">
        <figure className="text-primary">{icon}</figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-left">{description}</p>
          {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Learn More</button>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default CardWithIcon