import { useState } from "react";
import { Card, Table, Row, Col, Container } from "react-bootstrap";
import PushAlertTable from "./PushAlertTable";
import ManageTokenTable from "../../components/table/ManageTokenTable";
import SettingModal from "../../components/modal/SettingModal";
import PageTitle from "../../components/PageTitle";
import { SubTitleWrapper } from "../../stlye/globalStyles";

const SettingOperate = () => {
  const [applyPercent, setApplyPercen] = useState(2.5);
  const [royalRange, setRoyalRange] = useState(20);
  const [royalStandard, setRoyalStandard] = useState(60);
  const [royalTerm, setRoyalTerm] = useState(2);
  const [referPrice, setReferPrice] = useState(1);
  const [referStandard, setReferStandard] = useState(25);
  const [referTerm, setReferTerm] = useState(4);

  const [royalRangeToogle, setRoyalRangeToggle] = useState(false);
  const [royalStandardToogle, setRoyalStandardToggle] = useState(false);
  const [royalTermToogle, setRoyalTermToggle] = useState(false);

  const [referPriceToogle, setReferPriceToggle] = useState(false);
  const [referStandardToogle, setReferStandardToggle] = useState(false);
  const [referTermToogle, setReferTermToggle] = useState(false);

  const handleRoyalRange = (value) => {
    //dispatch
    setRoyalRange(value);
    setRoyalRangeToggle(false);
  };
  const handleRoyalStandard = (value) => {
    //dispatch
    setRoyalStandard(value);
    setRoyalStandardToggle(false);
  };
  const handleRoyalTerm = (value) => {
    //dispatch
    setRoyalTerm(value);
    setRoyalTermToggle(false);
  };
  const handleReferPrice = (value) => {
    //dispatch
    setReferPrice(value);
    setReferPriceToggle(false);
  };
  const handleReferStandard = (value) => {
    //dispatch
    setReferStandard(value);
    setReferStandardToggle(false);
  };
  const handleReferTerm = (value) => {
    //dispatch
    setReferTerm(value);
    setReferTermToggle(false);
  };
  return (
    <Container>
      <Row>
        <Col>
          <PageTitle title={"운영 설정"} margin={5} />
        </Col>
      </Row>
      <Row className="setting-push-alert">
        <Col>
          <PushAlertTable />
        </Col>
      </Row>
      <Row>
        <Col>
          <ManageTokenTable />
        </Col>
      </Row>
      <Row className="royal-ref-settins">
        <Col>
          <Card>
            <Card.Body>
              <SubTitleWrapper>로얄티, 레퍼럴 설정</SubTitleWrapper>
              <Table>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>수수료 (트랜잭션 발생시킨 사람이 지불)</th>
                      <th colSpan={3}>로얄티</th>
                      <th colSpan={3}>레퍼럴</th>
                    </tr>
                    <tr>
                      <th>적용(%)</th>
                      <th>회원설정범위 (%이하)</th>
                      <th>지급기준 ($이상)</th>
                      <th>지급주기 (weeks 마다)</th>
                      <th>지급금액 (판매금액의%)</th>
                      <th>지급기준 (1건당 KLAY이상)</th>
                      <th>지급주기 (weeks 마다)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>{applyPercent}</td>
                    <td
                      onClick={() => {
                        setRoyalRangeToggle(true);
                      }}
                    >
                      {royalRange}
                    </td>
                    <td
                      onClick={() => {
                        setRoyalStandardToggle(true);
                      }}
                    >
                      {royalStandard}
                    </td>
                    <td
                      onClick={() => {
                        setRoyalTermToggle(true);
                      }}
                    >
                      {royalTerm}
                    </td>
                    <td
                      onClick={() => {
                        setReferPriceToggle(true);
                      }}
                    >
                      {referPrice}
                    </td>
                    <td
                      onClick={() => {
                        setReferStandardToggle(true);
                      }}
                    >
                      {referStandard}
                    </td>
                    <td
                      onClick={() => {
                        setReferStandardToggle(true);
                      }}
                    >
                      {referTerm}
                    </td>
                  </tbody>
                </Table>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <SettingModal
        show={royalRangeToogle}
        defaultValue={royalRange}
        onCancel={() => {
          setRoyalRangeToggle(false);
        }}
        onChange={(e) => {
          setRoyalRange(e.target.value);
        }}
        unit="%"
        title="로얄티 회원 설정 범위 설정 (%이하)"
        onSubmit={handleRoyalRange}
      />
      <SettingModal
        show={royalStandardToogle}
        defaultValue={royalStandard}
        onCancel={() => {
          setRoyalStandardToggle(false);
        }}
        onChange={(e) => {
          setRoyalStandard(e.target.value);
        }}
        unit="$"
        title="로얄티 지급 기준 설정 ($이상)"
        onSubmit={handleRoyalStandard}
      />
      <SettingModal
        show={royalTermToogle}
        defaultValue={royalTerm}
        onCancel={() => {
          setRoyalTermToggle(false);
        }}
        onChange={(e) => {
          setRoyalTerm(e.target.value);
        }}
        unit="weeks"
        title="로얄티 지급 주기 설정 (weeks 마다)"
        onSubmit={handleRoyalTerm}
      />
      <SettingModal
        show={referPriceToogle}
        defaultValue={referPrice}
        onCancel={() => {
          setReferPriceToggle(false);
        }}
        onChange={(e) => {
          setReferPrice(e.target.value);
        }}
        unit="%"
        title="레퍼럴 지급 금액 (판매 금액의 %)"
        onSubmit={handleReferPrice}
      />
      <SettingModal
        show={referStandardToogle}
        defaultValue={referStandard}
        onCancel={() => {
          setReferStandardToggle(false);
        }}
        onChange={(e) => {
          setReferStandard(e.target.value);
        }}
        unit="KLAY"
        title="레퍼럴 지급 기준 (1건당 KLAY이상)"
        onSubmit={handleReferStandard}
      />
      <SettingModal
        show={referTermToogle}
        defaultValue={referTerm}
        onCancel={() => {
          setReferTermToggle(false);
        }}
        onChange={(e) => {
          setReferTerm(e.target.value);
        }}
        unit="weeks"
        title="레퍼럴 지급 주기 설정 (weeks 마다)"
        onSubmit={handleReferTerm}
      />
    </Container>
  );
};
export default SettingOperate;
