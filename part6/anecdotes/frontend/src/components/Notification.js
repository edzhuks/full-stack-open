import {useSelector} from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (<div>
      {notification.visible && <div style={style}>
        {notification.text}
      </div>}
    </div>
  )
}

export default Notification