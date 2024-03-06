import React from 'react';

import '~/components/dropdown/styles/Dropdown.scss';

interface DropdownStaticItemProps {
    children: React.ReactNode;
}

const DropdownStaticItem: React.FC<DropdownStaticItemProps> = ({
    children,
}: DropdownStaticItemProps) => {
    return (
        <div className={"dropdownMenu__dropdownStaticItem"}>
            {children}
        </div>
    );
};

export default React.memo(DropdownStaticItem);
