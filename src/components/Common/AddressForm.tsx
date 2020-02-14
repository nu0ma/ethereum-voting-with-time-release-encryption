import React, { FC, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

type AddressFormProps = {
  role: string;
  setAddress: (address: string) => void;
};

const AddressForm: FC<AddressFormProps> = ({ role, setAddress }) => {
  const [inputAddress, setInputAddress] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddress(inputAddress);
    console.log('submit');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Set {role}'s Address Form</label>
        <input
          placeholder="address"
          value={inputAddress}
          onChange={handleChange}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
      <p>{inputAddress}</p>
    </Form>
  );
};

export default AddressForm;
