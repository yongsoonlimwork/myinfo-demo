import React from 'react';
import styled from 'styled-components';
import { ICpfContributionInfo } from '@/api/myInfo';
import { FormHeaderText } from '@/views/Info/Form/Common';
import { formatDayMonthYear, formatMonthYear, formatPrice } from '@/utils';
import NoDataTableBody from '@/views/Info/Form/Common/NoDataTableBody.tsx';

interface ICPFContributionTableProps {
  cpfContributions: ICpfContributionInfo;
}

const CPFContributionTable: React.FC<ICPFContributionTableProps> = ({ cpfContributions }) => {
  const { history } = cpfContributions;

  return (
    <>
      <FormHeaderText>CPF Contribution History</FormHeaderText>
      <StyledTable>
        <thead>
          <tr>
            <th>For Month</th>
            <th>Paid On</th>
            <th>Amount (S$)</th>
            <th>Employer</th>
          </tr>
        </thead>
        {history ? (
          <tbody>
            {history.map(({ month, date, amount, employer }) => (
              <tr>
                <td>{formatMonthYear(month.value)}</td>
                <td>{formatDayMonthYear(date.value)}</td>
                <td>{formatPrice(amount.value)}</td>
                <td>{employer.value}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <NoDataTableBody colSpan={4} />
        )}
      </StyledTable>
    </>
  );
};

export default CPFContributionTable;

const StyledTable = styled.table`
  width: 100%;

  th,
  td {
    padding: 5px 10px;
  }

  th {
    text-align: right;
  }

  tr > th:last-child {
    text-align: left;
  }

  td {
    text-align: right;
  }

  tr > td:last-child {
    text-align: left;
  }

  tbody > tr:nth-child(odd) {
    background: rgba(255, 255, 255, 10%);
  }
`;
