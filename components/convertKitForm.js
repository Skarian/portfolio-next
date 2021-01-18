//In src/components/sub-form.component.js
import React, { useState } from 'react';

const ConvertKitForm = () => {
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
      {status === null ? (
        <div className="text-sm mt-2 mb-2 text-gray-500">Subscribe for 🔥 research!</div>
      ) : status === 'SUCCESS' ? (
        <label className="text-sm mt-2 mb-8 text-green-500 font-bold">
          Success! Please go confirm your subscription!
        </label>
      ) : status === 'ERROR' ? (
        <label className="text-sm mt-2  mb-8 text-red-500 font-bold">
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
          className="inline-flex text-white bg-green-500 border-0 py-1.5 px-6 focus:outline-none hover:bg-green-600 rounded-lg text-base animate-pulse"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default ConvertKitForm;
