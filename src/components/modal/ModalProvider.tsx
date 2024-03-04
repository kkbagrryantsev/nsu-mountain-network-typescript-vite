import ReactDOM from "react-dom";
import "./styles/ModalProvider.scss"

export const ModalProvider = () => {
    return ReactDOM.createPortal(
        <div className={'modalWrapper'} id={'modalProvider'}/>,
        document.body
    )
}