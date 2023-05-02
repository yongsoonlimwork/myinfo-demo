import React from 'react';
import { FormHeaderText } from '@/views/Info/Form/Common';
import styled from 'styled-components';
import { ICpfBalanceInfo } from '@/api/myInfo';
import { formatPrice } from '@/utils';
import NoDataTableBody from '@/views/Info/Form/Common/NoDataTableBody.tsx';

interface ICPFAccountBalTableProps {
  cpfBalances: ICpfBalanceInfo;
}

const CPFAccountBalTable: React.FC<ICPFAccountBalTableProps> = ({ cpfBalances }) => {
  const { oa, sa, ma } = cpfBalances;
  const noDataAvailable = !oa && !sa && !ma;

  return (
    <>
      <FormHeaderText>CPF Account Balance</FormHeaderText>
      <StyledTable>
        {noDataAvailable ? (
          <NoDataTableBody />
        ) : (
          <tbody>
            <tr>
              <td>Ordinary Account (OA) (S$)</td>
              <td>{oa ? formatPrice(oa.value) : '-'}</td>
            </tr>
            <tr>
              <td>Special Account (SA) (S$)</td>
              <td>{sa ? formatPrice(sa.value) : '-'}</td>
            </tr>
            <tr>
              <td>Medisave Account (MA) (S$)</td>
              <td>{ma ? formatPrice(ma.value) : '-'}</td>
            </tr>
          </tbody>
        )}
      </StyledTable>
    </>
  );
};

export default CPFAccountBalTable;

const StyledTable = styled.table`
  width: 100%;

  td {
    text-align: left;
    padding: 5px 10px;
  }

  tr > td:nth-child(2) {
    text-align: right;
    font-weight: bold;
  }
`;
