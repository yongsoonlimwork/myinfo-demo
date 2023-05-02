import React from "react";
import styled from "styled-components";

interface INoDataTableBodyProps {
  colSpan?: number;
}

const NoDataTableBody: React.FC<INoDataTableBodyProps> = ({colSpan = 1}) => {
  return (
    <StyledTBody>
      <tr>
        <td colSpan={colSpan}>
          No Data Available
        </td>
      </tr>
    </StyledTBody>
  )
}

export default NoDataTableBody;

export const StyledTBody = styled.tbody`
  tr {
    background-color: transparent !important;
  }

  td {
    text-align: center !important;
    padding: 40px 50px !important;
    border: 1px solid gray !important;
  }
`;
