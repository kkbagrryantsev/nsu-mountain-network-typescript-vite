import React, {createContext, useRef, useState} from 'react';
import {useClickAway} from 'react-use';
import classNames from 'classnames';

import './styles/Dropdown.scss';

interface IActiveContext {
    isActive: boolean;
    setIsActive: React.Dispatch<any>;
}

const defaultState = {
    isActive: false,
    setIsActive: () => {},
};

export const ActiveContext = createContext<IActiveContext>(defaultState);

interface DropdownProps {
    children: React.ReactNode;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    children,
    className,
}: DropdownProps) => {
    const [isActive, setIsActive] = useState(false);

    const ref = useRef(null);

    useClickAway(ref, () => {
        setIsActive(false);
    });

    return (
        <ActiveContext.Provider value={{isActive, setIsActive}}>
            <div
                className={classNames(
                    "dropdown",
                    isActive ? "active" : '',
                    className
                )}
                ref={ref}>
                {children}
            </div>
        </ActiveContext.Provider>
    );
};

Dropdown.defaultProps = {
    className: '',
};

export default React.memo(Dropdown);
