import React, { Component, useEffect, useState, useLayoutEffect } from "react";
import {
  Container,
  Row,
  InputGroup,
  FormControl,
  Col,
  Button,
  Table,
} from "react-bootstrap";
import TableData from "./components/TableData";
import { faker } from "@faker-js/faker";

import Api from "./api/Api";
import AppModel from "./models/AppModel";
import ApiModel from "./models/ApiModel";
import produce from "immer";

const App = (): JSX.Element => {
  const [list, setList] = useState<ApiModel[]>([]);
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [listLength, setListLength] = useState<number>(0);
  const [activeTotal, setActiveTotal] = useState<boolean>(false);
  const [listFilter, setListFilter] = useState<Array<Object>>([]);

  useLayoutEffect(() => {
    let i = 0;
    setList([]);
    while (i < 100) {
      setList((prev) => [
        ...prev,
        {
          id: faker.datatype.uuid().toString(),
          name: faker.name.firstName(),
          amount: faker.datatype.float(),
          stage: faker.datatype.number({
            min: 1,
            max: 3,
          }),
          created_at: faker.date.future().toDateString(),
        },
      ]);
      setListLength(list.length);
      i++;
    }
  }, []);

  const filterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const filterStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const filterEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const filtered = React.useMemo(() => {
    return list.filter((item) => {

      if (item.name.length > 0 && item.created_at.length > 0) {
        return (
          item.name.includes(name) &&
          item.created_at.includes(startDate) &&
          item.created_at.includes(endDate)
        );
      }
    });
  }, [name, startDate, endDate, list]);

  const stage1 = filtered.reduce(
    (prev, next) => (next.stage === 1 ? prev + next.amount : prev),
    0
  );

  const stage2 = filtered.reduce(
    (prev, next) => (next.stage === 2 ? prev + next.amount : prev),
    0
  );

  const stage3 = filtered.reduce(
    (prev, next) => (next.stage === 3 ? prev + next.amount : prev),
    0
  );

  return (
    <React.Fragment>
      <Container fluid className="min-vh-100 p-5">
        <Row>
          <Col lg={3}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Name"
                aria-label="Name"
                onChange={filterName}
              />
            </InputGroup>
          </Col>
          <Col lg={3}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Start Date"
                aria-label="StartDate"
                onChange={filterStartDate}
              />
            </InputGroup>
          </Col>
          <Col lg={3}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="EndDate"
                aria-label="EndDate"
                onChange={filterEndDate}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <TableData data={filtered} totalOne={stage1} totalTwo={stage2} totalThree={stage3}/>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default App;
