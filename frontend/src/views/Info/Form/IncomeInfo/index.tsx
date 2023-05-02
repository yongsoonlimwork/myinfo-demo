import React, { useMemo } from 'react';
import { INOAHistory, IPersonInfo } from '@/api/myInfo';
import { FormHeaderText, FormWrapper, StyledForm } from '@/views/Info/Form/Common';
import styled from 'styled-components';
import TextInput from '@/components/TextInput';
import CPFContributionTable from '@/views/Info/Form/IncomeInfo/CPFContributionTable.tsx';
import CPFAccountBalTable from '@/views/Info/Form/IncomeInfo/CPFAccountBalTable.tsx';
import { formatPrice } from '@/utils';
import NoDataTableBody from '@/views/Info/Form/Common/NoDataTableBody.tsx';

const rowTitles = ['Year of Assessment', 'Employment', 'Trade', 'Interest', 'Rent', 'Total Income', 'Tax Clearance'];
const noaKeys: (keyof INOAHistory)[] = [
  'yearofassessment',
  'employment',
  'trade',
  'interest',
  'rent',
  'amount',
  'taxclearance'
];
const formatValueAsPriceRows = [1, 2, 3, 4, 5];

interface IIncomeInfoProps {
  personInfo: IPersonInfo;
}

const IncomeInfo: React.FC<IIncomeInfoProps> = ({ personInfo }) => {
  const { noahistory, ownerprivate, housingtype, cpfbalances, cpfcontributions } = personInfo;
  const { noas } = noahistory;

  const noaContent = useMemo(() => {
    let tBody: React.ReactNode;
    if (noas) {
      const rows = rowTitles.map((rowTitle, index) => {
        const dataCells = [rowTitle];
        for (const noa of noas) {
          const value = noa[noaKeys[index]].value;
          dataCells.push(formatValueAsPriceRows.includes(index) ? formatPrice(value) : value);
        }
        return (
          <tr>
            {dataCells.map((value) => (
              <td>{value}</td>
            ))}
          </tr>
        );
      });
      tBody = <tbody>{rows}</tbody>;
    } else {
      tBody = <NoDataTableBody />;
    }
    return <NOATable>{tBody}</NOATable>;
  }, [noas]);

  return (
    <FormWrapper>
      <StyledForm>
        <FormHeaderText>Notice of Assessment (History)</FormHeaderText>
        {noaContent}
        <FormHeaderText>Other Income Information</FormHeaderText>
        <TextInput
          label="Ownership of Private Residential Property"
          value={ownerprivate.value ? 'Yes' : 'No'}
          readonly={ownerprivate.source === '1'}
        />
        {ownerprivate.value && (
          <TextInput label="Property Type" value={housingtype.desc} readonly={housingtype.source === '1'} />
        )}
        <CPFAccountBalTable cpfBalances={cpfbalances} />
        <CPFContributionTable cpfContributions={cpfcontributions} />
      </StyledForm>
    </FormWrapper>
  );
};

export default IncomeInfo;

const NOATable = styled.table`
  width: 100%;

  tr:nth-child(1),
  tr:nth-child(6),
  tr:nth-child(7) {
    td {
      font-weight: bold;
    }
  }

  td {
    text-align: right;
    padding: 5px 10px;
  }

  tr > td:nth-child(1) {
    text-align: left;
  }
`;
