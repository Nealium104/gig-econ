import React from 'react'

const Conditional = ({ showWhen, children }) => {
  return showWhen ? <>{children}</> : null
}

export default Conditional


