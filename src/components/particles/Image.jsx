import { useState, useEffect } from "react"
import Modal from "./Modal"

const Image = ({ src, zoomable = false }) => {
  const [isActive, setIsActive] = useState(false)

  const zoomHandler = () => {
    setIsActive(true)
  }

  const closeHandler = () => {
    setIsActive(false)
  }

  useEffect(() => {
    if (isActive) {
      openPopup()
    } else {
      closePopup()
    }
  }, [isActive])

  return (
    <>
      <img
        className={zoomable ? "zoomable" : ""}
        src={src}
        alt=''
        onClick={zoomable ? zoomHandler : null}
      />
      {isActive && (
        <Modal close={closeHandler}>
          <img src={src} alt='' />
        </Modal>
      )}
    </>
  )
}

let bodyOverflow = document.querySelector("body")
let scrollPosition = 0

function closePopup() {
  bodyOverflow.style.removeProperty("overflow")
  bodyOverflow.style.removeProperty("position")
  bodyOverflow.style.removeProperty("top")
  bodyOverflow.style.removeProperty("width")
  window.scrollTo(0, scrollPosition)
}

function openPopup() {
  scrollPosition = window.scrollY
  bodyOverflow.style.overflow = "hidden"
  bodyOverflow.style.position = "fixed"
  bodyOverflow.style.top = `-${scrollPosition}px`
  bodyOverflow.style.width = "100%"
}

export default Image
