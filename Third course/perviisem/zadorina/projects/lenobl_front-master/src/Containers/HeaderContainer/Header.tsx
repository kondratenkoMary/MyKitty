import React, { memo, useCallback } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import UserLoggedInfo from "./UserLoggedInfo";
import ContactInfo from "./ContactInfo";
import { push } from "connected-react-router";
import { mainPage } from "../../Router";
import Notifications, { NotificationsState } from "react-notification-system-redux";
import HeaderItem, { CalendarIcon } from "./HeaderItem";

const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timezone: "UTC"
};

const Header = () => {
    const { user, isLogged } = useSelector<StoreType, StoreType["user"]>(({ user }) => user);
    const dispatch = useDispatch();
    const notifications = useSelector<StoreType, NotificationsState>(({ notifications }) => notifications);

    const onClickBrand = useCallback(() => {
        dispatch(push(mainPage));
    }, []);

    return (
        <>
            <Notifications notifications={notifications} />
            <Navbar collapseOnSelect className="core-navbar p-4" sticky="top" expand="lg" variant="light">
                <img src="/assets/images/logo_polo.png" alt="ООО НПО Криста" width={50} height={50} />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand className="ml-4 pointer core-navbar__title" onClick={onClickBrand}>
                    ПРОЦЕССНЫЙ ОФИС ЛЕНИНГРАДСКОЙ ОБЛАСТИ
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="align-items-center">
                        <HeaderItem icon={<CalendarIcon />}>{new Date().toLocaleString("ru", options)}</HeaderItem>
                        {(isLogged && <UserLoggedInfo user={user} />) || <ContactInfo />}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default memo(Header);
