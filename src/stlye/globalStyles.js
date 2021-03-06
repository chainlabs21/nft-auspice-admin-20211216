import styled from "styled-components";
import { Row } from "react-bootstrap";

export const CategorySelector = styled.div`
  padding: 10px 50px 10px 50px;
  border-radius: 5px 5px 0px 0px;
  font-size: 14px;

  text-align: center;
  color: black;
`;

export const MainCategorySelector = styled.div`
  font-size: 1.2rem;
  padding: 20px 10px 20px 10px;
  border-radius: 5px 5px 5px 5px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  color: black;
  cursor: pointer;
`;

export const CategoryRowWrapper = styled(Row)`
  width: 100%;
  height: 43px;
`;
export const CategoryMainRowWrapper = styled(Row)`
  margin-bottom: 5rem;
  .selected-category {
    background-color: #333333;
    color: white;
  }
`;

export const DropdownWrapper = styled.span`
  button {
    background-color: white;
    border-color: lightgrey;
    color: grey;
  }
`;
export const InputGroupWrapper = styled.span`
  input {
    border: 1px solid lightgrey;
  }
  button {
    background-color: white;
    border-color: lightgrey;
    color: grey;
  }
`;
export const DropdownItemWrapper = styled.span``;
export const FormWrapper = styled.span`
  input {
    border: 1px solid lightgrey;
  }

  button {
    background-color: white;
    border-color: lightgrey;
    color: grey;
  }
`;
export const ButtonWrapper = styled.span`
  button {
    width: 43px;
    height: 100%;
    padding: 0;
    background-color: white;
    border-color: lightgrey;
    color: grey;
  }
`;
export const ExcelWrapper = styled.span`
  button {
    background-color: white;
    border-color: lightgrey;
    color: grey;
    box-shadow: none;
    border: 1px solid lightgrey;
    width: 68px;
    height: 43px;
  }
`;
export const SubTitleWrapper = styled.div`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;
export const TableWrapper = styled.div`
  table {
    text-align: center;
  }
  margin-top: 2rem;
  /*
  tr {
    border: 1px solid grey;
  }
  thead {
    background-color: white;
    border: 1px solid grey;
  }
  tbody {
    border: 1px solid grey;
  }
  th {
    background-color: white;
    color: black;
    border: 1px solid grey;
  }
  td {
    background-color: white;
    color: black;
    border: 1px solid grey;
  }
  */
`;
