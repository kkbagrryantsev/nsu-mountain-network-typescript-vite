import React, {useContext} from 'react';

import {ActiveContext} from '~/components/dropdown/Dropdown';

interface DropdownToggleProps {
    children: React.ReactNode;
}

const DropdownToggle: React.FC<DropdownToggleProps> = ({
    children,
}: DropdownToggleProps) => {
    const {isActive, setIsActive} = useContext(ActiveContext);

    return (
        <div
            className={"flex justify-center items-center hover:cursor-pointer"}
            onClick={() => setIsActive(!isActive)}>
            {children}
        </div>
    );
};

export default React.memo(DropdownToggle);
