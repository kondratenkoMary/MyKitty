import React from "react";
import { Button, Accordion, Card, Row, Col, Badge } from "react-bootstrap";
import { CardTypes, CARD_TYPES_NAME, CARD_TYPES_LOGO } from "../constants/cardTypes";
import { getCostTable } from "../Actions/rest.ts";

function CardTypeButton(props) {
    return (
        <Button
            onClick={() => {
                if (props.cardType == 1 || props.cardType == 2) {
                    props.gerAllNPATypes();
                }
                if (props.cardType == 1) {
                    props.getFileTablePrepare(props.id);
                }
                if (props.cardType == 2) {
                    props.getAllEventType();
                    props.getAllDecisionType();
                    props.getDkDataByEventType(1, props.id);
                    props.getTempByPartTable(props.id, 13, 9);
                    props.getCostByPartTable(props.id, 13, 9);
                    props.getTempByPartTable(props.id, 14, 13);
                    props.getCostByPartTable(props.id, 14, 13);
                    props.getFileTableITOGO(props.id);
                    props.getFileTableAsIsEXPENSES(props.id);
                    props.getLosTable2(props.id, 13, 9);
                    props.getLosTable(props.id, 13, 9);
                    props.getLosTable2(props.id, 14, 13);
                    props.getLosTable(props.id, 14, 13);
                    props.getFileTableAutomation(props.id);
                    props.getFileTableToBeOPERATING(props.id);
                    props.getTempTable(props.id, 13, 9);
                    props.getCostTable(props.id, 13, 9);
                    props.getTempTable(props.id, 14, 13);
                    props.getCostTable(props.id, 14, 13);
                    props.getFileTableAnalisEXTRA(props.id);
                    props.getFileTableToBeEXTRA(props.id);
                    props.getFileTableToBeMODEL(props.id);
                    props.getFileTableToBeEXPENSES(props.id);
                    props.getFileTableEXTRA(props.id);
                    props.getFileTableREASON(props.id, Number(7));
                    props.getFileTableMODEL(props.id);
                    props.getFileTablePasport(props.id);
                    props.getFileTableSIPOC(props.id);
                    props.getProjectPasport(props.id);
                }
                if (props.cardType == 2) {
                    props.getWorks(props.id);
                    props.getWorkPlans(props.id);
                    props.getWorkFacts(props.id);
                }
                if (props.cardType == 3) {
                    props.getDkDataByEventType(1, props.id);
                    props.getImplementationDataByEventType(1, props.id);
                }
                props.setCardtype(props.cardType);
            }}
            style={{ backgroundColor: "#59B1FF", width: "100%", height: "200px" }}
        >
            <Row>
                <Col>
                    <img src={"/assets/images/" + CARD_TYPES_LOGO[props.cardType]} alt={""}></img>
                </Col>
            </Row>
            <Row>
                <Col>{CARD_TYPES_NAME[props.cardType]}</Col>
            </Row>
        </Button>
    );
}

class CardMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // let curatorList = ''
        // if (this.props.prepareData != undefined && this.props.prepareData!= null && this.props.prepareData.curators!= undefined &&  this.props.prepareData.curators!= null){
        //     for (let i = 0; i< this.props.prepareData.curators.length; i++){
        //         curatorList = curatorList+','+ this.props.prepareData.curators[i].name;
        //     }
        //     curatorList = curatorList.substr(1,curatorList.length)
        // }
        return (
            <>
                {/* {console.log(this.props,'cardMenu 1 ')} */}
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                ^
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Row>
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => {
                                            this.props.setOpenProjectFlag(false);
                                            this.props.setCardtype("");
                                        }}
                                    >
                                        На главную страницу
                                    </Button>
                                </Row>
                                <Row style={{ textRendering: "auto" }}>
                                    <Col
                                        style={{
                                            overflow: "hidden",
                                            whoteSpace: "nowrap",
                                            borderRadius: "10px",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                            padding: "0px",
                                            border: "1px solid #59B1FF"
                                        }}
                                        xs={1}
                                    >
                                        <Badge style={{ width: "100%", overflow: "hidden" }} variant="Light">
                                            <h5 style={{ textOverflow: "clip" }}>
                                                {" "}
                                                {this.props.processType == 1 ? "Услуга" : "Процесс"}{" "}
                                            </h5>
                                        </Badge>
                                    </Col>
                                    <Col
                                        style={{
                                            overflow: "hidden",
                                            whoteSpace: "nowrap",
                                            borderRadius: "10px",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                            padding: "0px",
                                            border: "1px solid #59B1FF"
                                        }}
                                        xs={8}
                                    >
                                        <Badge style={{ width: "100%", overflow: "hidden" }} variant="Light">
                                            {" "}
                                            <h5 style={{ textOverflow: "ellipsis" }}>
                                                {this.props.prepareData != null &&
                                                this.props.prepareData.project != undefined
                                                    ? // this.props.prepareData.project.name.substr(0,70).length == 70?this.props.prepareData.project.name.substr(0,70) +'...'
                                                      // :
                                                      this.props.prepareData.project.name
                                                    : // .substr(0,70)
                                                      ""}
                                            </h5>{" "}
                                        </Badge>
                                    </Col>
                                    <Col
                                        style={{
                                            overflow: "hidden",
                                            borderRadius: "10px",
                                            marginTop: "5px",
                                            marginBottom: "5px",
                                            padding: "0px",
                                            border: "1px solid #59B1FF"
                                        }}
                                        xs={3}
                                    >
                                        <Badge style={{ width: "100%", overflow: "hidden" }} variant="Light">
                                            {" "}
                                            <h5 style={{ textOverflow: "clip" }}>
                                                {" "}
                                                {this.props.prepareData != undefined &&
                                                this.props.prepareData != null &&
                                                this.props.prepareData.curators != undefined &&
                                                this.props.prepareData.curators != null &&
                                                this.props.prepareData.curators.length != 0
                                                    ? this.props.prepareData.curators.length != 1
                                                        ? this.props.prepareData.curators[0].name +
                                                          "(+" +
                                                          (this.props.prepareData.curators.length - 1) +
                                                          ")"
                                                        : this.props.prepareData.curators[0].name
                                                    : ""}{" "}
                                            </h5>{" "}
                                        </Badge>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <CardTypeButton
                                            setCardtype={this.props.setCardtype}
                                            cardType={CardTypes.REPORTS}
                                        ></CardTypeButton>
                                    </Col>
                                    <Col>
                                        {/* {console.log(this.props,'this.props')} */}
                                        <CardTypeButton
                                            id={
                                                this.props.prepareData != null &&
                                                this.props.prepareData != undefined &&
                                                this.props.prepareData.project != null &&
                                                this.props.prepareData.project != undefined
                                                    ? this.props.prepareData.project.id
                                                    : ""
                                            }
                                            getFileTablePrepare={this.props.getFileTablePrepare}
                                            gerAllNPATypes={this.props.gerAllNPATypes}
                                            getFileTable={this.props.getFileTable}
                                            setCardtype={this.props.setCardtype}
                                            cardType={CardTypes.PREPARE}
                                        ></CardTypeButton>
                                    </Col>
                                    <Col>
                                        <CardTypeButton
                                            getAllEventType={this.props.getAllEventType}
                                            getAllDecisionType={this.props.getAllDecisionType}
                                            getDkDataByEventType={this.props.getDkDataByEventType}
                                            getTempByPartTable={this.props.getTempByPartTable}
                                            getCostByPartTable={this.props.getCostByPartTable}
                                            getFileTableITOGO={this.props.getFileTableITOGO}
                                            getFileTableAsIsEXPENSES={this.props.getFileTableAsIsEXPENSES}
                                            getLosTable2={this.props.getLosTable2}
                                            getLosTable={this.props.getLosTable}
                                            getFileTableAutomation={this.props.getFileTableAutomation}
                                            getFileTableToBeOPERATING={this.props.getFileTableToBeOPERATING}
                                            getTempTable={this.props.getTempTable}
                                            getCostTable={this.props.getCostTable}
                                            getFileTableAnalisEXTRA={this.props.getFileTableAnalisEXTRA}
                                            getFileTableToBeEXTRA={this.props.getFileTableToBeEXTRA}
                                            getFileTableToBeMODEL={this.props.getFileTableToBeMODEL}
                                            getFileTableToBeEXPENSES={this.props.getFileTableToBeEXPENSES}
                                            getFileTableREASON={this.props.getFileTableREASON}
                                            getFileTableEXTRA={this.props.getFileTableEXTRA}
                                            getWorks={this.props.getWorks}
                                            getWorkPlans={this.props.getWorkPlans}
                                            getWorkFacts={this.props.getWorkFacts}
                                            getFileTableMODEL={this.props.getFileTableMODEL}
                                            getFileTableSIPOC={this.props.getFileTableSIPOC}
                                            getProjectPasport={this.props.getProjectPasport}
                                            id={
                                                this.props.prepareData != null &&
                                                this.props.prepareData != undefined &&
                                                this.props.prepareData.project != null &&
                                                this.props.prepareData.project != undefined
                                                    ? this.props.prepareData.project.id
                                                    : ""
                                            }
                                            getFileTablePasport={this.props.getFileTablePasport}
                                            setCardtype={this.props.setCardtype}
                                            gerAllNPATypes={this.props.gerAllNPATypes}
                                            cardType={CardTypes.DEVELOPMENT}
                                        ></CardTypeButton>
                                    </Col>
                                    <Col>
                                        <CardTypeButton
                                            getDkDataByEventType={this.props.getDkDataByEventType}
                                            id={
                                                this.props.prepareData != null &&
                                                this.props.prepareData != undefined &&
                                                this.props.prepareData.project != null &&
                                                this.props.prepareData.project != undefined
                                                    ? this.props.prepareData.project.id
                                                    : ""
                                            }
                                            getImplementationDataByEventType={
                                                this.props.getImplementationDataByEventType
                                            }
                                            setCardtype={this.props.setCardtype}
                                            cardType={CardTypes.INTRODUCTION}
                                        ></CardTypeButton>
                                    </Col>
                                    <Col>
                                        <CardTypeButton
                                            setCardtype={this.props.setCardtype}
                                            cardType={CardTypes.POSTMONITOR}
                                        ></CardTypeButton>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        );
    }
}

CardMenu.defaultProps = {
    cardType: null
};

export default CardMenu;
