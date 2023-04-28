import styled from 'styled-components';

const CenterWrapper: FCC = ({ children }) => {
  return (
    <OuterContainer>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
};

export default CenterWrapper;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;
