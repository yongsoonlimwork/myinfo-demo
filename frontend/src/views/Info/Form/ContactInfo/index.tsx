import React from 'react';
import { IPersonInfo } from '@/api/myInfo';
import { FormHeaderText, FormWrapper, StyledForm } from '@/views/Info/Form/Common';
import TextInput from '@/components/TextInput';

interface IContactInfoProps {
  personInfo: IPersonInfo;
}

const ContactInfo: React.FC<IContactInfoProps> = ({ personInfo }) => {
  const { mobileno, email, regadd, hdbtype } = personInfo;
  const { prefix, areacode, nbr } = mobileno;
  const { block, street, building, floor, unit, postal } = regadd;

  return (
    <FormWrapper>
      <StyledForm>
        <FormHeaderText>Contact Info</FormHeaderText>
        <TextInput label="Mobile Number" value={`${prefix.value}${areacode.value}${nbr.value}`} />
        <TextInput label="Email Address" value={email.value} readonly={email.source === '1'} />
        <FormHeaderText>Registered Address</FormHeaderText>
        <TextInput label="Block Number" value={block.value} />
        <TextInput label="Street Name" value={street.value} />
        <TextInput label="Building Name" value={building.value} />
        <TextInput label="Floor & Unit No" value={`#${floor.value}-${unit.value}`} />
        <TextInput label="Postal Code" value={postal.value} />
        <TextInput label="Type of Housing" value={hdbtype.desc} readonly={hdbtype.source === '1'} />
      </StyledForm>
    </FormWrapper>
  );
};

export default ContactInfo;
