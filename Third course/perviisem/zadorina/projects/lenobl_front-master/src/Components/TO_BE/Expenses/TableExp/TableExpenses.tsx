import React from 'react'
import {Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton} from 'react-bootstrap'
import ExpensesMenu from './ExpensesMenu'
import ExpensesFields from './ExpensesFields'

function TableExpenses (props){
  

    return(
          <>
            <Row>
                <ExpensesMenu setExpenseTableFlag={props.setExpenseTableFlag} ></ExpensesMenu>
            </Row>
            <br/>
            <Row>
                <ExpensesFields saveByPartCostTable={props.saveByPartCostTable} costByPartTable={props.costByPartTable} tempByPartTable={props.tempByPartTable}  saveLosTable={props.saveLosTable} saveStepTable={props.saveStepTable} projId={props.projId} saveCostTable={props.saveCostTable} AtAllExp1Table={props.AtAllExp1Table} AtAllExp2Table={props.AtAllExp2Table} AtAllLos1Table={props.AtAllLos1Table} AtAllLos2Table={props.AtAllLos2Table}  expenseTableFlag1={props.expenseTableFlag1}> </ExpensesFields>
            </Row>
                        
          </>
        )
      }

export default TableExpenses