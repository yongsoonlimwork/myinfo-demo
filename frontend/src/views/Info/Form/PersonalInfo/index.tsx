import React from 'react';
import { IPersonInfo } from '@/api/myInfo';
import { FormHeaderText, FormWrapper, StyledForm } from '@/views/Info/Form/Common';
import TextInput from '@/components/TextInput';
import { formatDayMonthYear } from "@/utils";

interface IPersonalInfoProps {
  personInfo: IPersonInfo;
}

const PersonalInfo: React.FC<IPersonalInfoProps> = ({ personInfo }) => {
  const {
    uinfin,
    name,
    aliasname,
    marriedname,
    sex,
    dob,
    birthcountry,
    residentialstatus,
    nationality,
    race,
    marital,
    edulevel,
    passtype,
    employmentsector
  } = personInfo;

  return (
    <FormWrapper>
      <StyledForm>
        <FormHeaderText>Personal Info</FormHeaderText>
        <TextInput label="NRIC/FIN" value={uinfin.value} readonly={uinfin.source === '1'} />
        <TextInput label="Principal Name" value={name.value} readonly={name.source === '1'} />
        <TextInput label="Alias Name" value={aliasname.value} readonly={aliasname.source === '1'} />
        {marital.code === '2' && (
          <TextInput label="Married Name" value={marriedname.value} readonly={marriedname.source === '1'} />
        )}
        <TextInput label="Sex" value={sex.desc} readonly={sex.source === '1'} />
        <TextInput label="Date of Birth" value={formatDayMonthYear(dob.value)} readonly={dob.source === '1'} />
        <TextInput label="Country of Birth" value={birthcountry.desc} readonly={birthcountry.source === '1'} />
        <TextInput
          label="Residential Status"
          value={residentialstatus.desc}
          readonly={residentialstatus.source === '1'}
        />
        <TextInput label="Nationality" value={nationality.desc} readonly={nationality.source === '1'} />
        <TextInput label="Race" value={race.desc} readonly={race.source === '1'} />
        <TextInput label="Marital Status" value={marital.desc} readonly={marital.source === '1'} />
        <TextInput label="Education Level" value={edulevel.desc} readonly={edulevel.source === '1'} />
        <TextInput label="Pass Type" value={passtype.desc} readonly={passtype.source === '1'} />
        <TextInput label="Employment Sector" value={employmentsector.value} readonly={employmentsector.source === '1'} />
      </StyledForm>
    </FormWrapper>
  );
};

export default PersonalInfo;
