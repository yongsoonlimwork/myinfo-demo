import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CenterWrapper from '@/components/CenterWrapper';
import Loader from '@/components/Loader';
import { ROUTES } from '@/constants';

const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (code) {
      // Has code query param, navigate to info page to get data
      navigate(ROUTES.INFO_PAGE, {
        state: {
          code,
          state
        }
      });
    } else {
      // Callback page is accessed without code query param, redirect back to homepage
      navigate(ROUTES.HOME);
      alert('An issue occurred, please try again');
    }
  }, [navigate, searchParams]);

  return (
    <CenterWrapper>
      <Loader />
    </CenterWrapper>
  );
};

export default Callback;
