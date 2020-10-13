import { notification as antdNotification } from "antd";

export default (notification) => {
  const { config, type, ...details } = notification;
  antdNotification[type]({
    ...details,
    ...config,
  });
};
