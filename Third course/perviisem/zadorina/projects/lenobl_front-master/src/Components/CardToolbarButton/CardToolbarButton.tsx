import React, { FC, memo, useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { useRouteMatch } from "react-router";

export interface ICardToolbarButtonProps {
    image: string;
    caption: string;
    xs?: number;
    to: string;
    onClick?: VoidFunction;
    append?: boolean;
    bottomText?: () => React.ReactNode;
    actions?: () => React.ReactNode;
}

const CardToolbarButton: FC<ICardToolbarButtonProps> = ({
    caption,
    actions,
    bottomText,
    append,
    to,
    xs,
    image,
    onClick
}) => {
    const dispatch = useDispatch();
    const router = useSelector<StoreType, StoreType["router"]>(({ router }) => router);
    let match = useRouteMatch();
    const pathName = router.location.pathname;
    const pathTo = `${match.url}${to}`;

    const onClickButton = useCallback(() => {
        if (pathTo !== pathName) {
            dispatch(push(append ? pathTo : to));
            onClick?.();
        }
    }, [to, pathTo, append, pathName]);
    const isActive = append ? pathName !== pathTo : pathName !== to;

    return (
        <Col>
            <Button className="btn-style" variant={isActive ? "secondary" : "primary"} onClick={onClickButton}>
                {actions?.()}
                <div className="d-flex pl-5 align-items-center">
                    <div>
                        <img src={`/assets/images/${image}`} alt={""} />
                    </div>
                    <h3 className="d-flex mb-0 align-items-center ml-4">{caption}</h3>
                </div>
                {bottomText?.()}
            </Button>
        </Col>
    );
};

export default memo(CardToolbarButton);
