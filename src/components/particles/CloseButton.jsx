import React from "react"

const CloseButton = ({ close }) => {
  return (
    <div className="zoom-close" onClick={close} style={closeButtonStyle}>
      <svg
      className='closeButton'
      width='20'
      height='20'
      viewBox='0 0 23 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.41421 -0.000151038L0 1.41406L21.2132 22.6273L22.6274 21.2131L1.41421 -0.000151038Z'
        fill='#000000'></path>
      <path
        d='M22.6291 1.41421L21.2148 0L0.00164068 21.2132L1.41585 22.6274L22.6291 1.41421Z'
        fill='#000000'></path>
    </svg>
    </div>
  )
}

const closeButtonStyle = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  zIndex: 1000000,
  padding: '10px',
  height: '20px',
  width: '20px'
};

export default CloseButton
