import { useSelector } from "react-redux";


const Notifications = () => {
  const message = useSelector(({ notification }) => notification)

  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message === '') {
    return <></>
  }
  return <div style={messageStyle}>{message}</div>
}

export default Notifications