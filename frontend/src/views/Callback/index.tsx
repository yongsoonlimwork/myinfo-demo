import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      console.log(`${key}: ${value}`);
    }
  }, [searchParams]);

  return <div>Callback Page</div>;
};

export default Callback;
