import React from 'react'
import {Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton} from 'react-bootstrap'


function ExpensesMenu (props){


    return(
          <>
            <Button onClick={() => {props.setExpenseTableFlag('В целом',1)}} >В целом</Button>  
            <Button onClick={() => {props.setExpenseTableFlag('По участникам',1)}} >По участникам</Button>
            {/* <Button onClick={() => {props.setExpenseTableFlag('Показатели затрат',2)}} >Показатели затрат</Button>
            <Button onClick={() => {props.setExpenseTableFlag('Показатели потерь',2)}} >Показатели потерь</Button> */}
          </>
        )
      }

export default ExpensesMenu