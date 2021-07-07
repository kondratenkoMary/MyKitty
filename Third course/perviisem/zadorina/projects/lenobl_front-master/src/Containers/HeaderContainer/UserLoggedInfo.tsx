import React, { FC, memo } from "react";
import { Badge, Button, NavItem } from "react-bootstrap";
import { logOff, logoutUser } from "../../Actions/userLoginActions";
import Icon from "../../Icon";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons/faEnvelope";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons/faAddressCard";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { IUserType } from "../../reducers/userLogin";
import HeaderItem, { ExitIcon, UserIcon } from "./HeaderItem";

export interface IUserLoggedInfoProps {
    user: IUserType | null;
}

const UserLoggedInfo: FC<IUserLoggedInfoProps> = ({ user }) => {
    const dispatch = useDispatch();

    const onClickLogout = () => {
        dispatch(logOff(user?.login));
        dispatch(push("/login"));
    };
    if (!user) {
        return null;
    }

    return (
        <>
            <div className="header-item__divider" />
            <HeaderItem label="Пользователь" icon={<UserIcon />}>
                {user.name || user.login}
            </HeaderItem>
            <HeaderItem onClick={onClickLogout} icon={<ExitIcon />}>
                Выход
            </HeaderItem>
            {false && (
                <NavItem className="mr-1">
                    <Button variant="warning">
                        <Icon icon={faEnvelope} />
                        <Badge hidden={user.unreadMessages < 1}>{user.unreadMessages}</Badge>
                    </Button>
                </NavItem>
            )}
        </>
    );
};

export default memo(UserLoggedInfo);
