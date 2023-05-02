import React, { useCallback, useState } from 'react';
import CenterWrapper from '@/components/CenterWrapper';
import styled from 'styled-components';
import Loader from '@/components/Loader';
import myInfo from '@/api/myInfo';
import { IApiError } from '@/types/api';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onRetrieveClick = useCallback(async () => {
    const callback = `${window.location.origin}/callback`;
    setLoading(true);
    try {
      const { result } = await myInfo.getAuthorizeUrl({ callback });
      if (result) {
        window.location.href = result.authorizeUrl;
      } else {
        setLoading(false);
      }
    } catch (e) {
      alert((e as IApiError).message);
      setLoading(false);
    }
  }, []);

  return (
    <CenterWrapper>
      <MyInfoButton onClick={loading ? undefined : onRetrieveClick}>
        {loading && <StyledLoader />}Retrieve MyInfo
      </MyInfoButton>
    </CenterWrapper>
  );
};

export default Home;

const MyInfoButton = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid #c10000;
  background-color: red;
  padding: 20px;
  border-radius: 10px;
  color: white;
  font-size: 25px;
  font-weight: bold;

  &:hover {
    background-color: #c90000;
  }

  &:active {
    background-color: #a80000;
  }
`;

const StyledLoader = styled(Loader)`
  margin-right: 10px;
  width: auto;
  height: 25px;
`;
