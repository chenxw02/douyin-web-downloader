import { ElMessage, ElMessageBox } from 'element-plus';

export const message = {
  warn: (msg: string) => {
    ElMessage.warning({
      message: msg,
      duration: 2000,
    });
  },
  error: (msg: string) => {
    ElMessage.error({
      message: msg,
      duration: 2000,
    });
  },
  success: (msg: string) => {
    ElMessage.success({
      message: msg,
      duration: 2000,
    });
  },
  info: (msg: string) => {
    ElMessage.info({
      message: msg,
      duration: 2000,
    });
  },
};

export const messageBox = {
  alert: (msg: string) => {
    ElMessageBox.alert(msg, '错误');
  },
};
