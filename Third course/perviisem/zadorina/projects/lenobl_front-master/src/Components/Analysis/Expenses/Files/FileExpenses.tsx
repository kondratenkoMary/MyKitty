import React from 'react'
import {Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton} from 'react-bootstrap'
import ExpensesMenu from './ExpensesMenu'
import ExpensesFields from './ExpensesFields'

function FileExpenses (props){


    return(
          <>
            <Row>
                {/* <ExpensesMenu></ExpensesMenu> */}
            </Row>
            <br/>
            
                <ExpensesFields Expensesfile={props.Expensesfile} projId={props.projId} addDocument={props.addDocument} saveFile={props.saveFile} ></ExpensesFields>
                                 
          </>
        )
      }

export default FileExpenses