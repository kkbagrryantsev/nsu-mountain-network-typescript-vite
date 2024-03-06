import React from 'react';

interface DropdownMenuProps {
    children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    children,
}: DropdownMenuProps) => {
    return <div className={"dropdownMenu"}>{children}</div>;
};

export default React.memo(DropdownMenu);
