import React from 'react'
import { useTable, useRowSelect } from 'react-table'
import styled from 'styled-components'
// import Datetime from 'react-datetime' 
import {Modal, Button, Col, Row, DropdownButton, Table as BootstrapTable, Tooltip, OverlayTrigger, ButtonToolbar, Dropdown} from 'react-bootstrap' 


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const EditableCell =({
  value: initialValue,
  row: {index},
  column: {id},
  updateMyData,
  unitsTableData: unitsTableData,
  unitsForParamData: unitsForParamData,
  mod:mod,
  props:props,
  }) =>{

    // console.log(unitsTableData,'unitsForParamsunitsForParamsunitsForParams');

    const [name,setName] =React.useState(initialValue)
    const [value,setValue] =React.useState(initialValue)
    const [unitsForParams,setUnitsForParams] = React.useState()
    const onChange = e =>{
      setValue(e.target.value)
    }
    const onChangeDrop = (value,name) => {
      setValue(value);
      setName(name);
    }

    const onBlur = () => {
      updateMyData(index, id, value)
    }
    
    React.useMemo(() => {
      setValue(initialValue);
      setUnitsForParams(unitsTableData != undefined?
        unitsTableData.map( (el,idx) => {
        if (el.id === initialValue && (id == 'paramsName' || id == 'unitsName')){
          mod == 'params'?
          setName(el.name):
          setName(el.name+', '+el.units.name);
        }
        console.log(id == 'unitsName','llllllllllllllllllllll');
        return(
          mod == 'params'?
          <Dropdown.Item key = {el.id} onClick = {() => { onChangeDrop(el.id, el.name); updateMyData(index, id, el.id) }} >{el.name}</Dropdown.Item>
          :<Dropdown.Item key = {el.id} onClick = {() => { onChangeDrop(el.id, el.name+', '+el.units.name); updateMyData(index, id, el.id) }} >{el.name+', '+el.units.name}</Dropdown.Item>
        )
      } ):null)
      ;
    }, [initialValue,unitsTableData])
    
      if (id != "id" && id != "code" && id != 'date'){
        if (id == 'unitsName' && mod == 'params'){
          return(<DropdownButton title={name}>
                  {unitsForParams}
                </DropdownButton> )
        }else{
          if(id == 'paramsName' && mod == 'values'){
            return(<DropdownButton title={name}>
              {unitsForParams}
            </DropdownButton> )
          }else{
            if (id =='fromReport'){
              return(
                <DropdownButton title={value === true? 'да':'нет'}>
                  <Dropdown.Item onClick={()=>updateMyData(index, id, true)}>да</Dropdown.Item>
                  <Dropdown.Item onClick={()=>updateMyData(index, id, false)}>нет</Dropdown.Item>
                </DropdownButton>
              )
            }
          }
          return <input style={{width:'100%'}} value={value} onChange={onChange} onBlur={onBlur} />
        }
      }else{
        if (value != undefined){
          return value
        }else{
          return ''
        }
      }
  }

const defaultColumn = {
  Cell:EditableCell,
}

function Table({ columns, data, props, updateMyData, mod, unitsForParamData, unitsTableData}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData,
    unitsTableData,
    unitsForParamData,
    props,
    mod,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    // hooks.visibleColumns.map(columns =>{
    //   columns().map((el1) =>{
    //     if (el1.id == 'unitsName'){
    //       return{
    //         id: el.id,
    //         Header: el.Header,
    //         Cell: ({row}) =>(
    //           <DropdownButton title={'выберите еденицу измерения'}>
    //             {/* {unitsForParams} */}
    //           </DropdownButton>
    //         )
    //       }
    //     }
    //   })
    //   return columns
    // } )
    }
  )
  if (selectedRowIds != props.selectedRowIds){
    props.changeSelectedRowIds(selectedRowIds);
  }

  return (
      <BootstrapTable striped bordered size='sm' hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
            )
          })}
        </tbody>
        </BootstrapTable>
  )
}


function CustomTable(props) {


  let columns = React.useMemo(() => {
    if (props.unitsTableMod === true){
      return([
            {
              Header: '№',
              accessor: 'code',
            },
            {
              Header: 'наименование',
              accessor: 'name',
            },
      ])
    }
    if (props.paramsTableMod === true){
      return([
            {
              Header: 'Код',
              accessor: 'code',
            },
            {
              Header: 'Параметр из отчета',
              accessor: 'fromReport',
            },
            {
              Header: 'Наименование показателя',
              accessor: 'name',
            },
            {
              Header: 'Единица измерения',
              accessor: 'unitsName',
            },
      ])
    }
    if (props.valueTableMod === true){
      return([ 
            {
              Header: 'Значение параметра',
              accessor: 'value'
            },
            {
              Header: 'Дата',
              accessor: 'date'
            },
           {
             Header: 'Наименование параметра',
             accessor: 'paramsName',
           },      
      ])
    }
  }
  ,[props.unitsTableMod,props.paramsTableMod,props.valueTableMod])

    let data1 = React.useMemo(() => {
      if (props.paramsTableMod === true){
            return(
              props.props != undefined?
                props.props.map((el,idx) => {
                  return{
                    code:el.code,
                    id:el.id,
                    name:el.name,
                    fromReport:el.fromReport,
                    unitsId:el.units.id,
                    unitsName:el.units.name,
                    unitsDesc:el.units.desc,
                  }
                })
               :null
            )
      }
      if (props.unitsTableMod === true){
        // console.log(props.props,'props.props');
        return(
          props.props != undefined?
            props.props.map((el,idx) => {
              return{
                code:idx+1,
                id:el.id,
                name:el.name,
                desc:el.desc,
              }
            })
          :null
        )
      }
      if(props.valueTableMod === true){
        return(
          props.props != undefined?
            props.props.map((el,idx) =>{
              return{
                Id:el.id,
                value:el.value,
                paramsCode:el.params.code,
                paramsId:el.params.id,
                paramsName:el.params.id,
                fromReport:el.paramsfromReport,
                unitsId:el.params.units.id,
                unitsName:el.params.units.name,
                unitsDesc:el.params.units.desc,
              }
            })
          :null
        )
      }
    },[props.paramsTableMod,props.unitsTableMod,props.valueTableMod,props.props]) 
    
    const [data, setData] = React.useState(data1)
    console.log(data,'data');
    React.useEffect((data1) => {updateState();},[data1]); 

  const updateState = () =>{
    let data1
    if (props.props != undefined){
      if (props.unitsTableMod === true){
        data1= props.props.map((el,idx) => {
          return{
            code:idx+1,
            id:el.id,
            name:el.name,
            desc:el.desc,
          }
        })
        console.log(data1,'data12');
      }
    if(props.paramsTableMod === true){
        data1 = props.props.map((el,idx) => {
          return{
            code:idx+1,
            id:el.id,
            name:el.name,
            fromReport:el.fromReport,
            unitsId:el.units.id,
            unitsName:el.units.id,
            unitsDesc:el.units.desc,
          }
        })
      }
    if(props.valueTableMod === true){
      data1 = props.props.map((el,idx) =>{
        let eLdate = String(el.dateUnv.id).slice(0,4)+'.'+String(el.dateUnv.id).slice(4,6)+'.'+String(el.dateUnv.id).slice(6,8)
        return{
          Id:el.id,
          value:el.value,
          date:eLdate,
          paramsCode:el.params.code,
          paramsId:el.params.id,
          paramsName:el.params.id,
          fromReport:el.paramsfromReport,
          unitsId:el.params.units.id,
          unitsName:el.params.units.id,
          unitsDesc:el.params.units.desc,
        }
      })
    }
    }
    setData(data1);
    // console.log(data,'data');
    } 
  
  const updateMyData = (rowIndex, columnId, value) =>{
    setData(old => 
        old.map((row,index) =>{
          if (index === rowIndex){
            if (columnId == "code" || columnId == "id" ){
              return{
                ...old[rowIndex],
                [columnId]:Number(value) || null
              }
            }else{
              return{
                ...old[rowIndex],
                [columnId]:value || ''
              }
            }
          }
          return row
        })
    )
    console.log(value);
  }

  const deleteAllSelectedRow = (data) =>{
    for (let i in data.selectedRowIds){
      data.deleteTableData(data.props[i].id,props.unitsTableMod,props.paramsTableMod)
    }
  }

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectUnitId, setSelectUnitId] = React.useState(null);
  const [newName,setNewName] = React.useState(null);
  const [newDesc,setNewDesc] = React.useState(null);
  const [newData,setNewData] = React.useState(null);
  const[newFromReport, setNewFromReport] = React.useState(false);
  const[selectParamId,setSelectParamId] = React.useState(null);
  const[newValue,setNewValue] = React.useState(null);


  const getTooltip = (data) => {
    return (<Tooltip id="tooltip">{data}
    </Tooltip>);
  }  

  // console.log(props.unitsTableData,'props.unitsTableDataprops.unitsTableDataprops.unitsTableData')
  let unitsForParams
  props.unitsTableData != undefined ?
  unitsForParams = props.unitsTableData.map( (el) => {
    return(
      <Dropdown.Item eventKey = {el.id} onClick = {() => { setSelectUnitId(el.id); }} >{el.name}</Dropdown.Item>
    )
  } ):null
  let paramsForValues
  props.paramsTableData != undefined ?
  paramsForValues = props.paramsTableData.map( (el) => {
    return(
      <Dropdown.Item key = {el.id} onClick = {() => {setSelectParamId(el.id)}}>{el.name}</Dropdown.Item>
    )
  } ):null


  let today = new Date()

  return (
    <Styles>
      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-lg"
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            props.unitsTableMod ? 
            <div>
              <Row>
                <Col xs = {4}>
                  Название
                </Col>
                <Col xs = {7}>
                  <input onChange = { (e) => {setNewName(e.target.value); } }></input>
                </Col>
              </Row>
              <Row>
                <Col xs = {4}>
                  Описание
                </Col>
                <Col xs = {7}>
                  <input onChange = { (e) => {setNewDesc(e.target.value); } }></input>
                </Col>
              </Row>
            </div>
            :''
          } 
          {
          props.paramsTableMod?
            <div>
              <Row>
                <Col xs={4}>
                  Название
                </Col>
                <Col xs={7}>
                  <input onChange = { (e) => {setNewName(e.target.value); } }></input>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  Отображать в отчете?
                </Col>
                <Col xs={7}>
                  <DropdownButton title = {newFromReport?'да':'нет'}>
                    <Dropdown.Item onClick={ () => setNewFromReport(true)} >отображать</Dropdown.Item>
                    <Dropdown.Item onClick={ () => setNewFromReport(false)} >не отображать</Dropdown.Item> 
                  </DropdownButton>
                </Col>
              </Row>
              <Row>
                <Col>
                  <DropdownButton id="dropdown-units" title='выберите еденицу измерения'>
                    {unitsForParams}
                  </DropdownButton>
                </Col>
              </Row>
            </div>
            :''
          }
          {
            props.valueTableMod?
            <div>
              <Row>
                <Col xs={4}>
                  Значение
                </Col>
                <Col xs={7}>
                  <input onChange = { (e) => {setNewValue(e.target.value); } }></input>
                </Col>
              </Row>
              {/* <Row>
                <Col xs={4}>
                  Дата
                </Col>
                <Col xs={7}>
                  
                  <Datetime locale='ru' value={newData != null ? newData : '' } dateFormat="YYYY-MM-DD" timeFormat={false} onChange={(e)=>{setNewData(e.format('YYYY-MM-DD')); console.log(newData)}}/>
                </Col>
              </Row> */}
              <Row>
                <Col xs = {4}>
                  Параметр
                </Col>
                <Col xs = {7}>
                  <DropdownButton title={'выберите параметр'}>
                    {paramsForValues}
                  </DropdownButton>
                </Col>
              </Row>
            </div>
            :''
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ () => {handleClose; 
            if(props.valueTableMod){
              props.onAddNewRowToTable(props.unitsTableMod,props.paramsTableMod,props.valueTableMod,selectParamId,newValue,props.paramsTableData[selectParamId-1].code,props.paramsTableData[selectParamId-1].description,props.paramsTableData[selectParamId-1].fromReport,props.paramsTableData[selectParamId-1].name,props.paramsTableData[selectParamId-1].units.description,props.paramsTableData[selectParamId-1].units.id,props.paramsTableData[selectParamId-1].units.name)
            }
            else{
              if(props.unitsTableMod){
                props.onAddNewRowToTable(props.unitsTableMod,props.paramsTableMod,props.valueTableMod,newName,newDesc)
              }
              else{
                if(props.paramsTableMod){
                  props.onAddNewRowToTable(props.unitsTableMod,props.paramsTableMod,props.valueTableMod,newName,selectUnitId,newFromReport,)
                }
              }
            }
           } }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <ButtonToolbar>
        <OverlayTrigger placement="top" overlay={getTooltip('Обновить')}>
          <Button variant='secondary' onClick={() => updateState()}><i className="fas fa-redo fa-1x" aria-hidden='true'></i></Button>
        </OverlayTrigger>      
        <OverlayTrigger placement="top" overlay={getTooltip('Сохранить изменения')}>
          <Button variant='secondary' onClick={() => {
            if(props.valueTableMod == true){
              props.onupdateTableData(props.props,data,props.paramsTableMod,props.unitsTableMod,props.valueTableMod)
            }else{
              props.onupdateTableData(props.props,data,props.paramsTableMod,props.unitsTableMod,props.valueTableMod)}}
          }>
          <i className="fas fa-check-circle fa-1x" aria-hidden='true'></i>
          </Button>
        </OverlayTrigger>      
        <OverlayTrigger placement="top" overlay={getTooltip('Добавить')}>
        <Button variant='secondary' onClick={() => {handleShow()}}><i className="fas fa-plus-circle fa-1x" aria-hidden='true'></i></Button>
        </OverlayTrigger>      
        <OverlayTrigger placement="top" overlay={getTooltip('Удалить выделенные')}>
        <Button variant='secondary' onClick = { () => {deleteAllSelectedRow(props)}}><i className="fas fa-minus-circle fa-1x" aria-hidden='true'></i></Button>
        </OverlayTrigger> 
      </ButtonToolbar>
          {console.log(props.unitsTableData != undefined,'dawdwad')}
      {props.props != undefined && data != undefined && data.length != 0 && (props.unitsTableMod === true || props.unitsTableData != undefined)?
        <Table columns={columns} data={data} updateMyData={updateMyData} props = {props} mod = {props.paramsTableMod? 'params':'values'} unitsForParamData={props.unitsTableData} unitsTableData={props.paramsTableMod? props.unitsTableData: props.paramsTableData} />
        :''
      }
    </Styles>
  )   
}

export default CustomTable
