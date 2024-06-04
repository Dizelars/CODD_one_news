import { createPortal } from "react-dom"
import CloseButton from "./CloseButton"
import "./Modal.css"

const Modal = ({ children, close }) => {
  return createPortal(
    <div className='modalWindow'>
      {children}
      <CloseButton close={close} />
    </div>,
    document.querySelector("#modals")
  )
}

export default Modal
