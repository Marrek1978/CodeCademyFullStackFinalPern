import { useState } from 'react'
import { Link } from 'react-router-dom';

// type Props = {}

interface CardType {
  name: string;
  description: string;
  price: number;
  id: number;
  discount: number;
}

const SevenDaysCard: CardType = {
  name: '7 Day Subscription',
  description: 'Billed weekly',
  price: 5,
  id: 3,
  discount: 0,
};

const monthlyCard: CardType = {
  name: 'Monthly Subscription',
  description: 'Billed monthly',
  price: 10,
  id: 1,
  discount: 10,
};

const yearlyCard: CardType = {
  name: 'Yearly Subscription',
  description: 'Billed yearly',
  price: 100,
  id: 2,
  discount: 20,
};



// const CancelAnytimeCard: CardType = {
//   name: 'Cancel Anytime',
//   description: 'No commitments',
//   price: 0,
//   id: 4,
//   discount: 0,
// };


//load subscription data from backend
//set state to subscription data
// button should be disabled if no subscription is selected
//change button text to show 'change subscription'

//add query param to url, for subscription id example /checkout?subscriptionId=1
// add products to stripe
//make lookup table.

function RadioCards() {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <>
      < div className=' w-full m-auto flex gap-6 flex-wrap justify-center'>
        {[SevenDaysCard, monthlyCard, yearlyCard].map((option) => (
          <label key={option.id} className={`card w-96 bg-primary text-primary-content  ${selectedValue === option.id.toString() ? 'ring ring-offset-2 ring-primary' : ''}`}>
            <input
              type="radio"
              name="radio-card"
              className="hidden"
              value={option.id.toString()}
              checked={selectedValue === option.id.toString()}
              onChange={() => handleChange(option.id.toString())}
            />
            <div className="card-body">
              <h2 className="card-title">{option.name}</h2>
              <p>${option.price} {option.description}</p>

            </div>
          </label>
        ))}
      </div>

      <div>
        <h1 className='text-3xl mt-6'> Cancel Anytime</h1>
        <p>No Commitments</p>
      </div>


      <div className='mt-12 w-full'>
        <Link to={`/checkout?subscriptionId=${selectedValue}`}>
          <button
            className="btn btn-primary btn-outline w-80"
            disabled={!selectedValue}
          >
            Checkout
          </button>
        </Link>
      </div>
    </>
  );
}

export default RadioCards