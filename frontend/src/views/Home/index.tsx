import React, { useCallback, useState } from 'react';
import CenterWrapper from '@/components/CenterWrapper';
import styled from 'styled-components';
import Loader from '@/components/Loader';
import axios from 'axios';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onRetrieveClick = useCallback(async () => {
    const callbackURL = `${window.location.origin}/callback`;
    console.log(callbackURL);
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/get-authorize-url', {
        params: { callback_url: callbackURL }
      });
      console.log(response.data);
      window.location.href = response.data;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CenterWrapper>
      <MyInfoButton onClick={loading ? undefined : onRetrieveClick}>
        {loading && <Loader />}Retrieve MyInfo
      </MyInfoButton>
    </CenterWrapper>
  );
};

export default Home;

const MyInfoButton = styled.button`
  border: 1px solid #c10000;
  background-color: red;
  padding: 20px;
  border-radius: 10px;
  color: white;
  font-size: 15px;
  font-weight: bold;

  &:hover {
    background-color: #c90000;
  }

  &:active {
    background-color: #a80000;
  }
`;
