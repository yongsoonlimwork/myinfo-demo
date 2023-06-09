import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { ROUTES } from '@/constants';
import styled from 'styled-components';
import Callback from '@/views/Callback';
import Home from '@/views/Home';
import Info from '@/views/Info';

const App: React.FC = () => {
  return (
    <Container>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CALLBACK} element={<Callback />} />
        <Route path={ROUTES.INFO_PAGE} element={<Info />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`;
