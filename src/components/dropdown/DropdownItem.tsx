import React, {useContext} from 'react';

import {ActiveContext} from '~/components/dropdown/Dropdown';

import './styles/Dropdown.scss';

interface DropdownItemProps {
    children: React.ReactNode;
    onSelect?: any;
    closeOnSelect?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
    children,
    onSelect,
    closeOnSelect,
}: DropdownItemProps) => {
    const {setIsActive} = useContext(ActiveContext);

    const onClick = () => {
        onSelect?.();
        if (closeOnSelect) {
            setIsActive(false);
        }
    };

    return (
        <div className={"dropdownMenu__dropdownItem"} onClick={onClick}>
            {children}
        </div>
    );
};

DropdownItem.defaultProps = {
    onSelect: undefined,
    closeOnSelect: true,
};

export default React.memo(DropdownItem);
