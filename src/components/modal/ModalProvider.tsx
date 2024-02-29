import ReactDOM from "react-dom";

export const ModalProvider = () => {
    return ReactDOM.createPortal(
        <div className={"modalProvider"} id={'modalProvider'}>
        </div>,
        document.body
    )
}