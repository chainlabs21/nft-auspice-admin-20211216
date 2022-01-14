import { Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "../../store/reducer";
import { SubTitleWrapper } from "../../stlye/globalStyles";

const ManageTokenTable = () => {
  const { tokenList } = useSelector((state) => state.token);

  const setTokenUsable = () => {
    //dispatch here
  };

  return (
    <Card>
      <Card.Body>
        <SubTitleWrapper>토큰 관리</SubTitleWrapper>
        <Table className="tableHasNo">
          <Table striped bordered hover>
            <thead>
              <th>No</th>
              <th>토큰명</th>
              <th>Symbol</th>
              <th>Decimals</th>
              <th>Contract</th>
              <th>사용 여부</th>
            </thead>
            <tbody>
              {tokenList.map((token, i) => {
                return (
                  <tr>
                    <td>{token.no}</td>
                    <td>{token.name}</td>
                    <td>{token.symbol}</td>
                    <td>{token.decimals}</td>
                    <td>{token.contract}</td>
                    <td onClick={setTokenUsable}>
                      {token.usable ? <span>on</span> : <span>off</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Table>
      </Card.Body>
    </Card>
  );
};
export default ManageTokenTable;
