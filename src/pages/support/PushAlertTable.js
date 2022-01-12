import { useState } from "react";
import { Card, Table } from "react-bootstrap";
import { SubTitleWrapper } from "../../stlye/globalStyles";
const PushAlertTable = () => {
  const [sellItem, setSellItem] = useState(false);
  const [bidItem, setBidItem] = useState(false);
  const [recvOffer, setRecvOffer] = useState(false);
  const [offerExpired, setOfferExpired] = useState(false);
  const [buySucceed, setBuySucceed] = useState(false);
  const [refSucceed, setRefSucceed] = useState(false);
  const [recvFeed, setRecvFeed] = useState(false);
  const [recvRoyal, setRecvRoyal] = useState(false);
  return (
    <Card>
      <Card.Body>
        <SubTitleWrapper>PUSH 알람 설정</SubTitleWrapper>
        <Table>
          <Table striped bordered hover>
            <thead>
              <th>내아이템판매</th>
              <th>내아이템입찰</th>
              <th>offer받을때</th>
              <th>내오퍼 Expired</th>
              <th>내가구매성공할때</th>
              <th>내레퍼럴이용 구매성공</th>
              <th>수수료받았을때</th>
              <th>로얄티받았을때</th>
            </thead>
            <tbody>
              <td
                onClick={() => {
                  //dispatch
                  setSellItem(!sellItem);
                }}
              >
                {sellItem ? <span>on</span> : <span>off</span>}
              </td>
              <td
                onClick={() => {
                  //dispatch
                  setBidItem(!bidItem);
                }}
              >
                {bidItem ? <span>on</span> : <span>off</span>}
              </td>
              <td
                onClick={() => {
                  //dispatch
                  setRecvOffer(!recvOffer);
                }}
              >
                {recvOffer ? <span>on</span> : <span>off</span>}
              </td>
              <td
                onClick={() => {
                  //dispatch
                  setOfferExpired(!offerExpired);
                }}
              >
                {offerExpired ? <span>on</span> : <span>off</span>}
              </td>
              <td
                onClick={() => {
                  //dispatch
                  setBuySucceed(!buySucceed);
                }}
              >
                {buySucceed ? <span>on</span> : <span>off</span>}
              </td>
              <td
                onClick={() => {
                  //dispatch
                  setRefSucceed(!refSucceed);
                }}
              >
                {refSucceed ? <span>on</span> : <span>off</span>}
              </td>
              <td
                onClick={() => {
                  //dispatch
                  setRecvFeed(!recvFeed);
                }}
              >
                {recvFeed ? <span>on</span> : <span>off</span>}
              </td>
              <td
                onClick={() => {
                  //dispatch
                  setRecvRoyal(!recvRoyal);
                }}
              >
                {recvRoyal ? <span>on</span> : <span>off</span>}
              </td>
            </tbody>
          </Table>
        </Table>
      </Card.Body>
    </Card>
  );
};
export default PushAlertTable;
