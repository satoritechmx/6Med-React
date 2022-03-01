import React, { Component } from "react";
import { Table } from "react-bootstrap";
import TableDataModel from "../models/TableDataModel";

const TableData = (props:TableDataModel): JSX.Element => {
  const stageOne:Array<Object> = [];
  const stageTwo:Array<Object> = [];
  const stageThree:Array<Object> = [];
  
  props.data.forEach(item => {
    switch (item.stage) {
      case 1:
        stageOne.push(item);
        break;
      case 2:
        stageTwo.push(item);
        break;
      case 3:
        stageThree.push(item);
        break;
    }
  })

  return (
    <React.Fragment>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>id</th>

            <th>Name</th>

            <th>Amount</th>

            <th>Stage</th>

            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(item => 
          <tr>
          <th>{item.id}</th>
          <th>{item.name}</th>
          <th>{item.amount}</th>
          <th>{item.stage}</th>
          <th>{item.created_at}</th>
        </tr>
          )}
        </tbody>
      </Table>

      <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Stage</th>

                  <th>Persons</th>

                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                  <th>1</th>
                  <th>{stageOne.length}</th>
                  <th>{props.totalOne}</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>{stageTwo.length}</th>
                  <th>{props.totalTwo}</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>{stageThree.length}</th>
                  <th>{props.totalThree}</th>
                </tr>
              </tbody>
            </Table>
    </React.Fragment>
  );
}

export default TableData;
