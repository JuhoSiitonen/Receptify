import { useSelector } from "react-redux";


const Notifications = () => {
  const message = useSelector(({ notification }) => notification)

  const messageStyle = {
    position: 'fixed',
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  }

  const errorStyle = {
    ...messageStyle,
    color: 'red'
  }

  if (message.message === '') {
    return <></>
  }

  if (message.error) {
    return <div style={errorStyle}>{message.message}</div>
  }

  return <div style={messageStyle}>{message.message}</div>
}

export default Notifications