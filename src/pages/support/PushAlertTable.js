import { useState } from "react";
import { Card, Form, Table } from "react-bootstrap";
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
            <thead style={{ textAlign: "center" }}>
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
              <td>
                <Form.Group>
                  <div className="switch d-inline m-r-10">
                    <Form.Control
                      type="checkbox"
                      id="checked-sellItem"
                      defaultChecked={sellItem}
                      onChange={() => setSellItem(!sellItem)}
                    />
                    <Form.Label htmlFor="checked-sellItem" className="cr" />
                  </div>
                  <Form.Label>
                    {sellItem ? <span>on</span> : <span>off</span>}
                  </Form.Label>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <div className="switch d-inline m-r-10">
                    <Form.Control
                      type="checkbox"
                      id="checked-bidItem"
                      defaultChecked={bidItem}
                      onChange={() => setBidItem(!bidItem)}
                    />
                    <Form.Label htmlFor="checked-bidItem" className="cr" />
                  </div>
                  <Form.Label>
                    {bidItem ? <span>on</span> : <span>off</span>}
                  </Form.Label>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <div className="switch d-inline m-r-10">
                    <Form.Control
                      type="checkbox"
                      id="checked-recvOffer"
                      defaultChecked={recvOffer}
                      onChange={() => setRecvOffer(!recvOffer)}
                    />
                    <Form.Label htmlFor="checked-recvOffer" className="cr" />
                  </div>
                  <Form.Label>
                    {recvOffer ? <span>on</span> : <span>off</span>}
                  </Form.Label>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <div className="switch d-inline m-r-10">
                    <Form.Control
                      type="checkbox"
                      id="checked-offerExpired"
                      defaultChecked={offerExpired}
                      onChange={() => setOfferExpired(!offerExpired)}
                    />
                    <Form.Label htmlFor="checked-offerExpired" className="cr" />
                  </div>
                  <Form.Label>
                    {offerExpired ? <span>on</span> : <span>off</span>}
                  </Form.Label>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <div className="switch d-inline m-r-10">
                    <Form.Control
                      type="checkbox"
                      id="checked-buySucceed"
                      defaultChecked={buySucceed}
                      onChange={() => setBuySucceed(!buySucceed)}
                    />
                    <Form.Label htmlFor="checked-buySucceed" className="cr" />
                  </div>
                  <Form.Label>
                    {buySucceed ? <span>on</span> : <span>off</span>}
                  </Form.Label>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <div className="switch d-inline m-r-10">
                    <Form.Control
                      type="checkbox"
                      id="checked-refSucceed"
                      defaultChecked={refSucceed}
                      onChange={() => setRefSucceed(!refSucceed)}
                    />
                    <Form.Label htmlFor="checked-refSucceed" className="cr" />
                  </div>
                  <Form.Label>
                    {refSucceed ? <span>on</span> : <span>off</span>}
                  </Form.Label>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <div className="switch d-inline m-r-10">
                    <Form.Control
                      type="checkbox"
                      id="checked-recvFeed"
                      defaultChecked={recvFeed}
                      onChange={() => setRecvFeed(!recvFeed)}
                    />
                    <Form.Label htmlFor="checked-recvFeed" className="cr" />
                  </div>
                  <Form.Label>
                    {recvFeed ? <span>on</span> : <span>off</span>}
                  </Form.Label>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <div className="switch d-inline m-r-10">
                    <Form.Control
                      type="checkbox"
                      id="checked-recvRoyal"
                      defaultChecked={recvRoyal}
                      onChange={() => setRecvRoyal(!recvRoyal)}
                    />
                    <Form.Label htmlFor="checked-recvRoyal" className="cr" />
                  </div>
                  <Form.Label>
                    {recvRoyal ? <span>on</span> : <span>off</span>}
                  </Form.Label>
                </Form.Group>
              </td>
            </tbody>
          </Table>
        </Table>
      </Card.Body>
    </Card>
  );
};
export default PushAlertTable;
