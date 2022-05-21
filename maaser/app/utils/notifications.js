import { notification } from 'antd';

const NotificationType = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const showSuccessNotification = (message, description) => {
  notification[NotificationType.SUCCESS]({
    message,
    description,
  });
};

export const showErrorNotification = (message, description) => {
  notification[NotificationType.ERROR]({
    message,
    description,
  });
};

export const showInfoNotification = (message, description) => {
  notification[NotificationType.INFO]({
    message,
    description,
  });
};
