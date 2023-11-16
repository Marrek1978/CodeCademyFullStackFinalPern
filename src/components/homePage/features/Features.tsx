import CardWithIcon from "./CardWithIcon"
import { KeyIcon, TruckIcon, WrenchIcon } from "../../icons/Icons"

function Features() {
  return (
    <>
      <div className="container my-24 mx-auto md:px-6">
        <section className=" text-center">
          <h2 className="mb-16 text-3xl font-bold">
            Why is it so <u className="text-primary dark:text-primary-400">great?</u>
          </h2>
          <div className="flex gap-6 w-full justify-center flex-wrap  ">
            <CardWithIcon
              title='24/7 Expert Support'
              description='Our dedicated team of experts is available around the clock to ensure your operations never skip a beat.'
              icon={WrenchIcon}
            />
            <CardWithIcon
              title='Unbreakable Security'
              description="With QuantumFusion's state-of-the-art encryption and compliance measures, your data is in the safest hands possible."
              icon={KeyIcon}
            />

            <CardWithIcon
              title='Blazing Fast Performance'
              description='Experience unparalleled speed and efficiency, powered by our proprietary algorithms and optimized cloud infrastructure.'
              icon={TruckIcon}
            />

          </div>
        </section>
      </div>
    </>
  )
}

export default Features