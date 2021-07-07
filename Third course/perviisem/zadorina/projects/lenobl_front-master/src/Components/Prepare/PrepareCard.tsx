import React, { memo } from "react";
import { Row, Col } from "react-bootstrap";
import MainPrepareParams from "./MainPrepareParams";
import ExtsraPrepareParams from "./ExtsraPrepareParams";
import PageName from "../PageName";

const PrepareCard = () => {
    return (
        <div className="m-4 p-4 bg-white core-radius">
            <PageName>
                <Col style={{ paddingLeft: "24px" }}>Подготовка</Col>
            </PageName>
            <Col style={{ paddingLeft: "24px" }}>
                Сформировать служебные атрибуты проекта для распоряжения о начале работ по реинжинирингу процесса
            </Col>
            <div className="p-4">
                <Row>
                    <Col xs={7}>
                        <MainPrepareParams />
                    </Col>
                    <Col xs={1} />
                    <Col className="p-4" xs={4}></Col>
                </Row>
                {/* <Row>
                        <Pasport NPATypeList={props.NPATypeList} addDocument={props.addDocument}></Pasport>
                    </Row> */}
            </div>
        </div>
    );
};

export default memo(PrepareCard);
