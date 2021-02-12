//In src/components/sub-form.component.js
import { useState } from 'react';

const ConvertKitForm = ({ turnOffCaption }) => {
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState('');

  //FORM_URL should be the same as the form action url pointed out above
  const FORM_URL = `https://app.convertkit.com/forms/1903147/subscriptions`;

  //this is a placeholder text
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      const response = await fetch(FORM_URL, {
        method: 'post',
        body: data,
        headers: {
          accept: 'application/json',
        },
      });
      setEmail('');
      const json = await response.json();
      if (json.status === 'success') {
        setStatus('SUCCESS');
        return;
      }
    } catch (err) {
      setStatus('ERROR');
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  return (
    <form action={FORM_URL} method="post" onSubmit={handleSubmit}>
      {status === null && turnOffCaption !== true ? (
        <div className="text-sm mt-2 mb-2 text-gray-900">Subscribe for 🔥 research!</div>
      ) : status === 'SUCCESS' ? (
        <label className="text-sm mt-2 mb-8 text-green-900 font-bold">
          Success! Please go confirm your subscription!
        </label>
      ) : status === 'ERROR' ? (
        <label className="text-sm mt-2  mb-8 text-red-900 font-bold">
          Oops, Something went wrong! try again.
        </label>
      ) : null}
      <div>
        <input
          type="email"
          aria-label="Your email"
          className=" w-1/2 bg-gray-100 rounded border border-gray-300 focus:border-green-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mr-2"
          //The name attribute should be the same as on you selected form.
          name="email_address"
          placeholder="Your email address"
          onChange={handleInputChange}
          value={email}
          required
        />

        <button
          type="submit"
          className="inline-flex text-md leading-tight font-medium bg-green-300 border-1 py-2.5 px-6 focus:outline-none hover:bg-green-500 rounded-lg text-green-900"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default ConvertKitForm;

ConvertKitForm.defaultProps = {
  turnOffCaption: false,
};
