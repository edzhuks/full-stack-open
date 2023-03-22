import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const message = useNotificationValue();
  if (message === null) {
    return null;
  }
  if (message.good) {
    return <div className="success">{message.text}</div>;
  }
  return <div className="error">{message.text}</div>;
};

export default Notification;
