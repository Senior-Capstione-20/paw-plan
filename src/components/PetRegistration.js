import React, { useState } from 'react';

function PetRegistration() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Breed:
        <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} required />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required min="0" max="100" />
      </label>
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Weight:
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required min="0" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PetRegistration;
