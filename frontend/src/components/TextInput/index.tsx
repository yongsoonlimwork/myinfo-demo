import React from 'react';
import styled from 'styled-components';

interface ITextInputProps {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  readonly?: boolean;
}

const TextInput: React.FC<ITextInputProps> = ({ label, value = '', onChange, error, readonly }) => {
  return (
    <InputWrapper>
      <InputLabel>
        <InputLabelText>{label}</InputLabelText>
        {readonly ? <StyledText>{value}</StyledText> : <StyledInput type="text" value={value} onChange={onChange} />}
      </InputLabel>
      <InputError>{error}</InputError>
    </InputWrapper>
  );
};

export default TextInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputLabelText = styled.div`
  font-size: 14px;
`;

interface IStyledInputProps {
  invalid?: boolean;
}

const StyledText = styled.div`
  font-size: 14px;
  min-height: 20px;
`;

const StyledInput = styled.input<IStyledInputProps>`
  border: ${({ invalid }) => (invalid ? '1px solid red' : '1px solid transparent')};
  background-color: transparent;
  color: white;
  font-size: 14px;
`;

const InputError = styled.div`
  color: red;
`;
