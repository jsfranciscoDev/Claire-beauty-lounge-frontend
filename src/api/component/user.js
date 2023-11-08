import axios from "axios";
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export default {
  login(payload) {
    return axios.post(`${baseURL}api/login`, payload);
  },
  register(payload) {
    return axios.post(`${baseURL}api/register`, payload);
  },
  userRole() {
    // return api.get('/api/user-role');
    return axios.get(`${baseURL}api/user-role`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  logout() {
    return axios.post(
      `${baseURL}api/logout`,
      { user_id: 1 },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  uploadPhoto(payload) {
    // return api.post('/api/upload-photo', {file: payload});
    return axios.post(
      `${baseURL}api/upload-photo`,
      { file: payload },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  fetchUser() {
    // return api.get('/api/get-user');
    return axios.get(`${baseURL}api/get-user`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  changePassword(payload) {
    return axios.post(
      `${baseURL}api/change-password`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  updateUserDetails(payload) {
    return axios.post(`${baseURL}api/update-user`, payload, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  timeIn(user_id, time, date, action) {
    return axios.post(
      `${baseURL}api/user-time-in`,
      { user_id, time, date, action },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  getDTR() {
    return axios.get(`${baseURL}api/get-user-records`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  sendOtp(mobile_num) {
    return axios.post(
      `${baseURL}api/get-otp`,
      { mobile_num },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  submitUserOtp(payload) {
    return axios.post(`${baseURL}api/submit-user-otp`, payload, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  sendAppointmentOtp() {
    return axios.post(
      `${baseURL}api/appointment-otp`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  submitAppointmentOtp(payload) {
    return axios.post(`${baseURL}api/submit-appointment-otp`, payload, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  submitRevoceryEmail(payload) {
    return axios.post(`${baseURL}api/submit-recovery-email`, payload, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  },
  sendRecoveryOtp(user_id) {
    return axios.post(
      `${baseURL}api/get-recovery-otp`,
      { user_id: user_id },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  recoveryChangePassword(payload) {
    return axios.post(
      `${baseURL}api/recovery-change-password`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  sendUserReviews(payload) {
    return axios.post(
      `${baseURL}api/send-feedback`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },

  sendUserReviews(payload) {
    return axios.post(
      `${baseURL}api/send-feedback`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  sendSupport(payload) {
    return axios.post(
      `${baseURL}api/send-support`,
       payload ,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  getAllsupport(payload) {
    return axios.post(
      `${baseURL}api/get-all-support?page=${payload}`,
       {} ,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  validateAccount(payload) {
    return axios.post(
      `${baseURL}api/validate-account`,
       {phone: payload} ,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
};
