import {
  Container,
  Row,
  Col,
  Table,
  Card,
  DropdownButton,
  Dropdown,
  Spinner,
  Button,
  InputGroup,
  FormControl,
  ButtonGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Datetime from "react-datetime";

import styled from "styled-components";
import moment from "moment";
import { FaRegCalendarAlt } from "react-icons/fa";
import Select from "react-select";
import { FiRefreshCcw } from "react-icons/fi";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import {
  InputGroupWrapper,
  ButtonWrapper,
  DropdownWrapper,
  ExcelWrapper,
  DropdownItemWrapper,
  FormWrapper,
  TableWrapper,
} from "../../stlye/globalStyles";

const MAX_FILTER_NUMBER = 3;

const FunctionalTable = ({
  passtheCount=()=>{},
  keyList,
  tableData,
  wrapName = false,
  title = false,
  refresh = false,
  refreshCallback = () => {},
  search = false,
  datePicker = false,
  excel = false,
  clean = false,
  onSelect =()=>{},
  selectItem,
  selectCreateItem
}) => {
  const [dataArr, setDataArr] = useState([]);
  const [showCount, setShowCount] = useState(20);
  const [searchCategory, setSearchCategory] = useState("");
  const [refinedKeyList, setRefinedKeyList] = useState(keyList);
  const [searchValue, setSearchValue] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [originDataArr, setOriginDataArr] = useState([]);
  const [hasParentCategory, setHasParentCategory] = useState(false);

  const [filterArr, setFilterArr] = useState(0);
  const [filterTargetArr, setFilterTargetArr] = useState([]);
  const [filterTitleArr, setFilterTitleArr] = useState([]);
  const showCountList = [20, 40, 60, 80];

  passtheCount(showCount);

  const typeOption = [
    { value: 0, label: "큰 아이템 목록" },
    { value: 1, label: "작은 아이템 목록" },
    { value: 2, label: "유저 목록" },
    { value: 3, label: "링크 목록" },
  ];

  const handleRefresh = () => {
    //dispatch
    refreshCallback();
    setDataArr(originDataArr);
  };

  const categorySearch = () => {
    sortSearching();
  };

  const dateSearch = () => {
    if (fromDate === undefined || toDate === undefined) {
      alert("유효한 날짜를 선택해 주십시오.");
      return;
    }
    sortSearching();
  };
  const handleFilter = () => {
    sortSearching();
  };

  const sortSearching = () => {
    const temp = [];
    //search
    let filterIndexArr = [-1, -1, -1];
    let searchIndex = -1;
    let dateIndex = -1;
    refinedKeyList.forEach((key, i) => {
      filterTitleArr.forEach((title, j) => {
        if (key.title === title) {
          filterIndexArr[j] = i;
        }
      });
      if (key.title === searchCategory) {
        searchIndex = i;
      }
      if (key.isDate) {
        dateIndex = i;
      }
    });

    if (searchIndex === -1 && dateIndex === -1) {
      alert("유효하지 않은 검색조건 입니다.");
      return;
    }

    setDataLoading(true);
    //filtering
    let fullData = [...originDataArr];
    let filteredData = [...originDataArr];
    const indexList = [];

    fullData.forEach((data, i) => {
      filterIndexArr.forEach((index, j) => {
        if (index !== -1) {
          if (
            filterArr[j].convertInt[data[index]] !== filterTargetArr[j] &&
            filterArr[j].convertInt[data[index]] !== "전체" &&
            filterTargetArr[j] !== "전체"
          ) {
            console.log(i);
            indexList.push(i);
          }
        }
      });
    });

    const deleteTemp = [];
    filteredData.forEach((v, i) => {
      let trigger = true;
      indexList.forEach((idx) => {
        if (i === idx) {
          trigger = false;
        }
      });
      if (trigger) {
        deleteTemp.push(v);
      }
    });
    filteredData = [...deleteTemp];

    if (filteredData.length === 0) {
      setDataArr(filteredData);
      setDataLoading(false);
      return;
    }

    if (searchIndex === -1 || searchValue === "") {
      filteredData.forEach((data) => {
        temp.push(data);
      });
    } else {
      filteredData.forEach((data) => {
        if (data[searchIndex] === searchValue) {
          console.log(data)
          temp.push(data);
        }
      });
    }

    if (fromDate !== undefined && toDate !== undefined) {
      const resultArr = [];
      temp.forEach((data) => {
        const date = moment(data[dateIndex], "YYYY-MM-DD ");
        if (date.isBetween(fromDate, toDate)) {
          resultArr.push(data);
        }
      });

      if (resultArr.length > showCount) {
        setDataArr(resultArr.slice(0, showCount));
        setDataLoading(false);
        return;
      }

      setDataArr(resultArr);
      setDataLoading(false);
    } else {
      if (temp.length > showCount) {
        setDataArr(temp.slice(0, showCount));
        setDataLoading(false);
        return;
      }

      setDataArr(temp);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const tempArr = [];
    for (var i = 0; i < tableData.length; i++) {
      const temp = [];
      Object.entries(tableData[i]).forEach(([key, value]) => {
        temp.push(value);
      });
      tempArr.push(temp);
    }
    setOriginDataArr(tempArr);

    function sliceArr(arr, number) {
      if (arr.length > showCount) {
        const slicedArr = arr.slice(0, number);
        return slicedArr;
      }
      return arr;
    }

    //slice
    const slicedArr = sliceArr(tempArr, showCount);

    setDataArr(slicedArr);
    setDataLoading(false);
  }, [tableData, showCount]);

  //hasParentCategory
  // 큰 카테고리를 리스트에서 제거
  // 정제된 키리스트 생성
  useEffect(() => {
    const temp = [...keyList];

    temp.forEach((v, i) => {
      if (v.search) {
        setSearchCategory(v.title);
        return;
      }
    });
    temp.forEach((v, i) => {
      if (v.hasChildren) {
        setHasParentCategory(true);
        temp.splice([i], 1);
      }
    });
    setRefinedKeyList(temp);
    return;
  }, [keyList]);

  // 필터 init
  useEffect(() => {
    const temp = [];
    const targetTemp = [];
    const titleTemp = [];
    //init
    for (var i = 0; i < MAX_FILTER_NUMBER; i++) {
      targetTemp.push("");
      titleTemp.push("");
    }
    setFilterTitleArr(targetTemp);
    setFilterTargetArr(titleTemp);
    keyList.forEach((v, i) => {
      if (v.filter) {
        temp.push(v);
      }
    });
    setFilterArr(temp);
  }, [keyList]);

  return (
    <>
      <Row className={wrapName ? wrapName : ""}>
        <Col>
          <Card>
            <Card.Body>
              <Container
                className={clean ? "d-none" : ""}
                style={{ marginBottom: "1.5rem", marginTop: "1rem" }}
              >
                <h3
                  className={title ? "" : "d-none"}
                  style={{ display: "inline-block", margin: 0 }}
                >
                  {title}
                </h3>

                <FuncWrapper className={search ? "" : "d-none"}>
                  <InputGroup style={{ marginRight: "50px" }}>
                    <InputGroupWrapper>
                      <DropdownButton
                        style={{ marginRight: "1rem" }}
                        variant="secondary"
                        className="dropdown-btn searchCategoryBtn"
                        as={InputGroup.Prepend}
                        title={searchCategory}
                      >
                        {keyList.map((key, i) => {
                          if (key.search) {
                            return (
                              <Dropdown.Item
                                variant="secondary"
                                key={i}
                                onClick={() => setSearchCategory(key.title)}
                              >
                                {key.title}
                              </Dropdown.Item>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </DropdownButton>
                    </InputGroupWrapper>
                    <FormWrapper>
                      <FormControl
                        variant="secondary"
                        aria-describedby="basic-addon1"
                        placeholder={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </FormWrapper>
                    <InputGroup.Append>
                      <Button variant="secondary" onClick={categorySearch}>
                        검색
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </FuncWrapper>
                <FuncWrapper
                  className={datePicker ? "dateBox" : "dateBox d-none"}
                >
                  <span>
                    <FaRegCalendarAlt
                      style={{
                        fontSize: "32px",
                        marginRight: "10px",
                      }}
                    />
                  </span>
                  <FuncWrapper>
                    <Datetime
                      timeFormat={false}
                      closeOnClickOutside
                      inputProps={{ placeholder: "From" }}
                      onChange={(e) => setFromDate(e)}
                    />
                  </FuncWrapper>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      marginLeft: "1.5rem",
                    }}
                  >
                    ~
                  </span>
                  <span>
                    <FaRegCalendarAlt
                      style={{
                        fontSize: "32px",
                        marginLeft: "30px",
                        marginRight: "10px",
                      }}
                    />
                  </span>
                  <FuncWrapper>
                    <Datetime
                      timeFormat={false}
                      closeOnClickOutside
                      inputProps={{ placeholder: "To" }}
                      onChange={(e) => {
                        setToDate(e);
                      }}
                    />
                  </FuncWrapper>
                  <FuncWrapper>
                    <Button onClick={dateSearch} variant="secondary">
                      검색
                    </Button>
                  </FuncWrapper>
                </FuncWrapper>
                <RightIcons>
                  <Container
                    style={{
                      display: "flex",
                      marginBottom: "1rem",
                      height: "43px",
                    }}
                  >
                    {filterArr.length > 0 ? (
                      <>
                        {filterArr.map((v, i) => {
                          return (
                            <DropdownWrapper
                              style={{
                                marginLeft: "0.5rem",
                                marginRight: "0.5rem",
                              }}
                            >
                              <DropdownButton
                                title={filterArr[i].title}
                                variant="secondary"
                                className="searchCategoryBtn"
                              >
                                {filterArr[i].convertInt.map((label, j) => (
                                  <Dropdown.Item
                                    as="button"
                                    onClick={(e) => {
                                      const temp = filterTitleArr;
                                      temp[i] = filterArr[i].title;
                                      setFilterTitleArr(temp);
                                      const targetTemp = filterTargetArr;
                                      targetTemp[i] = e.target.innerHTML;
                                      setFilterTargetArr(targetTemp);
                                      sortSearching();
                                    }}
                                    key={j}
                                    className="show-count"
                                  >
                                    {label}
                                  </Dropdown.Item>
                                ))}
                              </DropdownButton>
                            </DropdownWrapper>
                          );
                        })}
                      </>
                    ) : null}
                    <DropdownButton
                      title={showCount}
                      className="numFilterBtn"
                      variant="secondary"
                      style={{ marginLeft: "1rem", marginRight: "0.5rem" }}
                    >
                      {showCountList.map((count, i) => (
                        <Dropdown.Item
                          as="button"
                          onClick={() => {
                            setShowCount(count);
                          }}
                          key={i}
                          className="show-count"
                        >
                          {count}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                    <RightWrapper className={refresh ? "" : "d-none"}>
                      <ButtonWrapper style={{ marginRight: "0.5rem" }}>
                        <Button
                          className="reBtn"
                          variant="secondary"
                          onClick={handleRefresh}
                        >
                          <FiRefreshCcw style={{ fontSize: "18px" }} />
                        </Button>
                      </ButtonWrapper>
                    </RightWrapper>
                    <RightWrapper className={excel ? "excel-export" : "d-none"}>
                      <ExcelWrapper>
                        <ReactHTMLTableToExcel
                          id="table-xls-button"
                          className="download-table-xls-button"
                          table="table-to-xls"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="EXCEL"
                        />
                      </ExcelWrapper>
                    </RightWrapper>
                  </Container>
                </RightIcons>
              </Container>

              {dataLoading ? (
                <Spinner animation="border" role="status"></Spinner>
              ) : (
                <TableWrapper>
                  <Table responsive id="table-to-xls" bordered>
                    {" "}
                    {hasParentCategory ? (
                      <thead>
                        <tr>
                          {keyList.map((key, i) => {
                            if (
                              !keyList[i].hasChildren &&
                              !keyList[i].isChildren
                            ) {
                              return (
                                <th
                                  key={i}
                                  rowSpan={2}
                                  style={{
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {key.title}
                                </th>
                              );
                            }
                            if (!keyList[i].isChildren) {
                              return (
                                <th key={i} colSpan={keyList[i].numChildren}>
                                  {key.title}
                                </th>
                              );
                            }
                          })}
                        </tr>
                        <tr>
                          {keyList.map((key, i) => {
                            if (key.isChildren) {
                              return <th key={i}>{keyList[i].title}</th>;
                            }
                          })}
                        </tr>
                      </thead>
                    ) : (
                      <thead>
                        <tr>
                          {keyList.map((key, i) => {
                            return <th key={i}>{key.title}</th>;
                          })}
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {dataArr.map((data, i) => (
                        <tr key={i} onClick={()=>{onSelect([data[6], data[5], data[3]])}}>
                          {data.map((v, j) => {
                            if (refinedKeyList[j] === undefined) {
                              return null;
                            }
                            if (refinedKeyList[j].displayNull) {
                              return null;
                            }
                            if (refinedKeyList[j].isButton){
                              return(<td key={j} style={{
                                textAlign: 'center', 
                                verticalAlign: 'middle'
                              }}>
                               <Button onClick={e=>{selectCreateItem(v)}}> 선택</Button>
                               
                              </td>)
                            }
                            if (refinedKeyList[j].isSelect){
                              return(<td key={j}
                              style={{
                                textAlign: 'center', 
                                verticalAlign: 'middle'
                              }}>
                                <label className="check-task custom-control custom-checkbox d-flex justify-content-center done-task">
                                  <input type="checkbox" className="custom-control-input" onChange={e=>{selectItem({[v]: e.target.checked});console.log(e.target.checked)}}/>
                                  <span className="custom-control-label"/>
                                </label>
                              </td>)
                            }
                            if (refinedKeyList[j].isImage) {
                              return (<td key={j}>
                                
                                <img src={v} style={{width: '128px', height:'128px', marginTop:'15px', marginBottom:'15px'}}/>
                                </td>);
                            }
                            if (refinedKeyList[j].isSecret) {
                              return null;
                              
                            }
                            if (refinedKeyList[j].Videoable) {
                              //console.log(v[0])
                              if (v[0]=='image'){
                                return (<td key={j}>
                                  <img src={v[1]} style={{width: '128px', height:'128px', marginTop:'15px', marginBottom:'15px'}}/>
                                  </td>);
                              }
                                else
                                return(
                                  <td key={j}>
                                  <video
                                    muted
                                    autoPlay
                                    id="video"
                                    className="imageBox"
                                    //ref={video}
                                    onClick={() => {}}
                                    style={{width: '128px', height:'128px', marginTop:'15px', marginBottom:'15px'}}
                                  >
                                    <source src={v[1]} />
                                  </video>
                                  </td>
                                )
                              

                            }

                            // if (refinedKeyList[j].Videoable) {
                            //   let {type} = tableData[i]
                            //   if (!type){return;}
                            //   if (type=='image')
                            //   return (<td key={j}>
                                
                            //     <img src={v} style={{width: '128px', height:'128px', marginTop:'15px', marginBottom:'15px'}}/>
                            //     </td>);
                            //     else
                            //     return(
                            //       <td key={j}>
                            //       <video
                            //         id="video"
                            //         className="imageBox"
                            //         //ref={video}
                            //         onClick={() => {}}
                            //         style={{width: '128px', height:'128px', marginTop:'15px', marginBottom:'15px'}}
                            //       >
                            //         <source src={v} />
                            //       </video>
                            //       </td>
                            //     )
                              
                            // }
                            if (refinedKeyList[j].hasCallback) {
                              return (
                                <td key={j} style={{
                                  textAlign: 'center', 
                                  verticalAlign: 'middle'
                                  , fontSize: '24px'
                                  , cursor: 'pointer'
                                }} onClick={() => v.callback(i)}>
                                  {v.icon}
                                </td>
                              );
                            }
                            if (refinedKeyList[j].convertInt) {
                              return (
                                <td key={j} style={{
                                  textAlign: 'center', 
                                  verticalAlign: 'middle'
                                }}>
                                  {refinedKeyList[j].convertInt[v]}
                                </td>
                              );
                            }
                            if (refinedKeyList[j].convertIntComplex) {
                              return (
                                <td key={j} style={{
                                  textAlign: 'center', 
                                  verticalAlign: 'middle'
                                }}>
                                  {refinedKeyList[j].convertIntComplex.find(obj=>{return obj.value == v}).label}
                                </td>
                              );
                            }
                            if (refinedKeyList[j].isCategoryType) {
                              return (
                                <td key={j} style={{
                                  textAlign: 'center', 
                                  verticalAlign: 'middle'
                                }}>
                                  {typeOption[v].label}
                                </td>
                              );
                            }
                            if (refinedKeyList[j].href) {
                              return (
                                <td key={j}>
                                  <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`${refinedKeyList[j].href + v}`}
                                  >
                                    {v}
                                  </a>
                                </td>
                              );
                            }
                            return (
                              <td
                                key={j}
                                style={{
                                  maxWidth: "140px",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  wordBreak: "break-all",
                                  tableLayout: "fixed",
                                  textAlign: 'center', 
                                  verticalAlign: 'middle'
                                }}
                              >
                                {v}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TableWrapper>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const FuncWrapper = styled.div`
  display: inline-flex;
  input {
    max-width: 200px;
  }
`;
const RightIcons = styled.div`
  display: inline-block;
  float: right;

  .numFilterBtn {
    width: 68px;

    .dropdown-toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: inherit;
      height: 100%;
      padding: 0;
      line-height: 14px;
    }

    .dropdown-menu {
      width: inherit;
      min-width: unset;

      button {
        width: 100%;
        height: 28px;
        padding: 0 0 0 18px;
        margin: 0;
      }
    }
  }
`;
const RightWrapper = styled.div`
  display: inline-block;
`;
const OptionWrapper = styled.div`
  margin-bottom: 2rem;
`;

export default FunctionalTable;