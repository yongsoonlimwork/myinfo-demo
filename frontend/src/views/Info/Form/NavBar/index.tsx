import React from 'react';
import styled, { css } from "styled-components";
import { EInfoPageType } from '@/views/Info';

interface INavBarProps {
  page?: EInfoPageType;
  setPage: (page: EInfoPageType) => void;
}

const NavBar: React.FC<INavBarProps> = ({ page, setPage }) => {
  return (
    <Container>
      <Button active={page === EInfoPageType.CONTACT} onClick={() => setPage(EInfoPageType.CONTACT)}>
        Contact Info
      </Button>
      <Button active={page === EInfoPageType.PERSONAL} onClick={() => setPage(EInfoPageType.PERSONAL)}>
        Personal Info
      </Button>
      <Button active={page === EInfoPageType.INCOME} onClick={() => setPage(EInfoPageType.INCOME)}>
        Income Info
      </Button>
      <Button active={page === EInfoPageType.OTHER} onClick={() => setPage(EInfoPageType.OTHER)}>
        Other Info
      </Button>
    </Container>
  );
};

export default NavBar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface IButtonProps {
  active?: boolean;
}

const Button = styled.div<IButtonProps>`
  padding: 0 3px 5px;

  ${({ active }) => (active ? css`
    pointer-events: none;
    border-bottom: 2px solid white;
  ` : css`
    cursor: pointer;
    border-bottom: 2px solid transparent;
  `)}
`;
