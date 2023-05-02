import React from 'react';
import loading from '@/assets/loading.gif';

interface ILoaderProps {
  className?: string;
}

const Loader: React.FC<ILoaderProps> = ({ className }) => {
  return <img src={loading} alt="" className={className} />;
};

export default Loader;
