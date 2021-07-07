import React from "react";
import { Button, Modal, Row, Col, ModalTitle, ModalFooter, ModalBody } from "react-bootstrap";
import TimeLine from "./TimeLine";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

function DevelopmentPlan(props) {
    const [data1, setData1] = React.useState("");
    const [data2, setData2] = React.useState("");
    const [show, setSow] = React.useState(false);

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-lg"
                show={show}
                onHide={() => {
                    setShow(false);
                }}
            >
                <ModalHeader>
                    <ModalTitle>Введите дату</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <input
                        type="date"
                        onChange={(e) => {
                            setData1(e.target.value);
                        }}
                    />
                    <input
                        type="date"
                        onChange={(e) => {
                            setData2(e.target.value);
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            setSow(false);
                        }}
                    >
                        close
                    </Button>
                    <Button>save</Button>
                </ModalFooter>
            </Modal>
            <Col xs={3}>
                <Row style={{ marginTop: "14px" }}>
                    <Button
                        onClick={() => {
                            setSow(true);
                        }}
                        variant="ligth"
                        style={{ width: "100%", borderBottom: "1px black" }}
                    >
                        1 Описание процесса "как есть"
                    </Button>
                </Row>
                <Row>
                    <Button variant="ligth" style={{ width: "100%" }}>
                        2 Анализ процесса "как есть"
                    </Button>
                </Row>
                <Row>
                    <Button variant="ligth" style={{ width: "100%" }}>
                        3 Моделирование "как должно"
                    </Button>
                </Row>
                <Row>
                    <Button variant="ligth" style={{ width: "100%" }}>
                        4 Планирование внедрения
                    </Button>
                </Row>
                <Row>
                    <Button variant="ligth" style={{ width: "100%" }}>
                        Вся разработка
                    </Button>
                </Row>
            </Col>
            <Col>
                <TimeLine data2={data2} data1={data1} />
            </Col>
        </>
    );
}

export default DevelopmentPlan;
