import React, { memo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { setGlobalAddingFlag } from "../../../Actions/actions";
import { useDispatch } from "react-redux";

const CreateNewProject = () => {
    const dispatch = useDispatch();

    return (
        <Col lg={3} md={6} xs={12}>
            <div
                onClick={() => {
                    dispatch(setGlobalAddingFlag(true));
                }}
                className="core-card core-card__new"
            >
                <Row>
                    <Col>
                        <img src={"/assets/images/plusbtn.png"} alt={""} />
                    </Col>
                </Row>
                <Row>
                    <Col>Создать новый кейс</Col>
                </Row>
            </div>
        </Col>
    );
};

export default memo(CreateNewProject);
