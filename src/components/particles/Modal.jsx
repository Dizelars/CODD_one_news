import CloseButton from "./CloseButton"
import "./Modal.css"

const Modal = ({ children, close }) => {
  return (
    <div className='modalWindow'>
      {children}
      <CloseButton close={close} />
    </div>
  )
}

export default Modal
