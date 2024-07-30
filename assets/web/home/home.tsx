import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

interface Data {
  name: string;
  email: string;
  country: string;
}

interface Response {
  status: string;
  message: string;
  receivedData: Data;
}

interface Props {
  link : string
}

interface NativeName {
  common: string;
  official: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: {
    [key: string]: NativeName;
  };
}

interface Country {
  name: Name;
  cca2: string;
}

const Home: React.FC<Props> = (props : Props) => {
  const [data, setData] = useState<Data>({ name: '', email: '' , country: '' });
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const link = props.link;
  
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
    getCountry();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post<Response>(link, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(response.data);      
      localStorage.setItem('formData', JSON.stringify(data));
      
    } catch (error) {
      console.error('There was an error!', error);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const getCountry = async () => {
    try{
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
    }catch(error){
      console.error(error);
      
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <select
            name="country"
            value={data.country}
            onChange={handleChange}
          >
            {countries.map((country) => (
              <option key={country.cca2} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Send Data</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        response && (
          <div>
            <h3>Response from Backend:</h3>
            <p>Status: {response.status}</p>
            <p>Message: {response.message}</p>
            <p>Received Data: {JSON.stringify(response.receivedData)}</p>
          </div>
        )
      )}
    </div>
  );
};
export default Home;
