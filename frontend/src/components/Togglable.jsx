import { useState, useImperativeHandle, forwardRef } from 'react'
import './ButtonStyle.css'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    if (props.onCancel && visible) {
        props.onCancel();
      }
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const cancelLabel = props.cancelLabel || 'cancel'

  return (
    <div className='togglable'>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.topCancel && <button onClick={toggleVisibility}>{cancelLabel}</button>}
        {props.children}
        {!props.topCancel && <button onClick={toggleVisibility}>{cancelLabel}</button>}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable