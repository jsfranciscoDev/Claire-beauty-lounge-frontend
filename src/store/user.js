import user from "../api/component/user.js";
import { defineStore } from "pinia";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

export const userStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
    email: {
      status: "",
      message: "",
    },
    otp_id: null,
    user_password: {},
    support_data: {},
    support_concern: {},
    email:{}
  }),
  actions: {
    async submitRevoceryEmail() {
      try {
        const response = await user.submitRevoceryEmail(this.user);
        if (response.data.status == "success") {
          return response;
        } else {
          this.email = response.data;
        }
      } catch (error) {}
    },
    async sendRecoveryOtp(payload) {
      try {
        const response = await user.sendRecoveryOtp(payload);
        this.otp_id = response.data.otp_id;
      } catch (error) {}
    },
    async submitUserOtp(userOtp) {
      let payload = {
        otp_id: this.otp_id,
        user_otp: userOtp,
      };
      try {
        const response = await user.submitUserOtp(payload);

        if (response.data.status == "failed") {
          Swal.fire({
            title: response.data.title,
            text: response.data.message,
            icon: "warning",
            confirmButtonText: "OK",
          });
        }

        if (response.data.status == "verified") {
          Swal.fire({
            title: response.data.title,
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK",
          });

          return response.data.status;
        }
      } catch (error) {}
    },
    async recoveryChangePassword(user_id) {
      let payload = {
        password: this.user_password.password,
        confirm_password: this.user_password.confirm_password,
        username: this.user_password.email,
        user_id: user_id,
      };
      try {
        const response = await user.recoveryChangePassword(payload);
        if (response.data.status == "failed") {
          this.user_password.error = response.data.message;
        } else if (response.data.status == "success") {
          this.user_password = {};
          Swal.fire({
            title: "Password Successfully Changed!",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
        return response;
      } catch (error) {}
    },
    async sendSupport() {

      try {
        const response = await user.sendSupport(this.support_data);
        return response;
      } catch (error) {}

  
    },
    async getAllsupport(page) {
      try {
        const response = await user.getAllsupport(page);
        this.support_concern = response.data.support;
        return response;
      } catch (error) {}
    },
    async sendsupportReply() {
      try {
        const response = await user.sendsupportReply(this.email);
        return response;
      } catch (error) {}
    },
    async userRole(payload) {
      try {
        await user.userRole(payload).then(response => {
          this.role = response.data
        });
    
      } catch (error) {
        this.user.error = error.response.data.errors;
      }
    },
    
  },
});
