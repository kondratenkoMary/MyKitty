import React from 'react'
import {Popover, Overlay, Button, Row, Col, Dropdown, FormControl, Form, DropdownButton} from 'react-bootstrap'


function ModelMenu (props){


    return(
          <>
            <Button style={{height:'30px',width:'30px', padding:'3px', backgroundColor:'#ffffff', borderWidth:'0px'}}>
                    <img src='/assets/images/Frame (6).png' style={{height:'24px',width:'24px'}}></img>
            </Button>  
            <Button style={{height:'30px',width:'30px', padding:'3px', backgroundColor:'#ffffff', borderWidth:'0px'}}>
                    <img src='/assets/images/Frame (9).png' style={{height:'24px',width:'24px'}}></img>
            </Button>  
            <Button style={{height:'30px',width:'30px', padding:'3px', backgroundColor:'#ffffff', borderWidth:'0px'}}>
                    <img src='/assets/images/Frame (10).png' style={{height:'24px',width:'24px'}}></img>
            </Button>  
            <Button style={{height:'30px',width:'30px', padding:'3px', backgroundColor:'#ffffff', borderWidth:'0px'}}>
                    <img src='/assets/images/Frame (12).png' style={{height:'24px',width:'24px'}}></img>
            </Button> 
            {/* <Button style={{height:'30px',width:'30px', padding:'3px', backgroundColor:'#ffffff', borderWidth:'0px'}}>
                    <img src='/assets/images/Frame (6).png' style={{height:'24px',width:'24px'}}></img>
            </Button>  
            <Button style={{height:'30px',width:'30px', padding:'3px', backgroundColor:'#ffffff', borderWidth:'0px'}}>
                    <img src='/assets/images/Frame (6).png' style={{height:'24px',width:'24px'}}></img>
            </Button>                     */}
          </>
        )
      }

export default ModelMenu