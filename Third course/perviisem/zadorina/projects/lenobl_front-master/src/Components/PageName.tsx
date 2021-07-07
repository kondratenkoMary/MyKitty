import React, { FC, memo } from "react";

export interface IPageNameProps {
    children: React.ReactNode;
}

const PageName: FC<IPageNameProps> = ({ children }) => <div className="page-name">{children}</div>;

export default memo(PageName);
