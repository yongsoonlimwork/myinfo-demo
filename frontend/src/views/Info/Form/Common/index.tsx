import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormHeaderText = styled.div`
  font-size: 25px;
  font-weight: 400;
  margin: 30px 0 20px;
`;

export const StyledForm = styled.form`
  & > * {
    margin-bottom: 15px;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
