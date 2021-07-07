import React from 'react'
import {Button, Table, FormControl, Dropdown, Row, Col, Card} from 'react-bootstrap'
import AtAllExp1Table from './AtAllExp1'
import AtAllExp2Table from './AtAllExp2'

import ByPatiExp1Table from './ByPatiExp1'
import ByPatiExp2Table from './ByPatiExp2'





function ExpensesFields (props) {
  
    return(
          <>
          {console.log(props.AtAllExp1Table)}
          
          {props.expenseTableFlag1 == 'В целом'?
            <Col xs = {6}>
              <AtAllExp1Table projId={props.projId} saveCostTable={props.saveCostTable} AtAllExp1Table={props.AtAllExp1Table}></AtAllExp1Table>
            </Col>
          :''}
          {props.expenseTableFlag1 == 'В целом'?
            <Col xs = {6}>
              <AtAllExp2Table projId={props.projId} saveCostTable={props.saveCostTable} AtAllExp2Table={props.AtAllExp2Table}></AtAllExp2Table>
            </Col>
          :''}
          {props.expenseTableFlag1 == 'По участникам'?
            <Col xs = {6}>
              <ByPatiExp1Table costByPartTable={props.costByPartTable} saveByPartCostTable={props.saveByPartCostTable} projId={props.projId} ></ByPatiExp1Table>
            </Col>
          :''}

          {props.expenseTableFlag1 == 'По участникам'?
            <Col xs = {6}>
              <ByPatiExp2Table tempByPartTable={props.tempByPartTable} saveByPartCostTable={props.saveByPartCostTable} projId={props.projId} ></ByPatiExp2Table>
            </Col>
          :''}
          </>
        )
      }

export default ExpensesFields