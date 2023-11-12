<script setup>
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import { store } from "../store/index";
import Swal from "sweetalert2";
import Support from "../components/Support.vue";
import moment from "moment";
import navBar from "../components/nav.vue";

const userData = store();
const accountCreated = ref(false);
const selectedServices = ref("");
const selectedStaff = ref("");
const verification = ref(false);
const isVisible = ref(false);
const countdownMinutes = 3;
const countdownTime = ref(countdownMinutes * 60);
let countdownInterval;

const handlerServiceChange = (event) => {
  selectedServices.value = event.target.value;
  userData.getStaffDropdown(selectedServices.value);
};

const handlerStaffChange = (event) => {
  selectedStaff.value = event.target.value;
};

const viewAppointments = ref(true);

const oneTimePassword = ref(["", "", "", "", "", ""]);

const Appointment = reactive({
  user_id: "",
  service_id: "",
  date: "",
  time: "",
  user_staff: "",
});

const userSendAppointment = () => {
  (Appointment.user_id = userData.user_details.id),
    (Appointment.service_id = selectedServices),
    (Appointment.user_staff = selectedStaff);

  Swal.fire({
    title: "Book an appointment?",
    text: "Are you sure do you want to book an appointment? Please make sure the details are correct.",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Yes!`,
  }).then((result) => {
    if (result.isConfirmed) {
      if (userData.user_appointment != null) {
        if (
          userData.user_appointment?.detail != "Cancelled" &&
          userData.user_appointment?.detail != "Completed" &&
          userData.user_appointment?.detail != "Reschedule"
        ) {
          Swal.fire({
            title: "Oh no ! Do you have an existing appointment",
            text: "Please cancel the ongoing appointment with us before proceeding with booking.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Confirm!`,
          }).then((result) => {
            if (result.isConfirmed) {
              showAppointments.value = true;
            }
          });
        } else {
          userData.sendAppointment(Appointment).then((e) => {
            if (e.data.status == "success") {
              showAppointments.value = true;
              Swal.fire({
                title: "Appointment Booked!",
                text: e.data.message,
                icon: "success",
                confirmButtonText: "OK",
              });
            }
          });
        }
      } else {
        userData.sendAppointment(Appointment).then((e) => {
          if (e.data.status == "success") {
            showAppointments.value = true;
            Swal.fire({
              title: "Appointment Booked!",
              text: e.data.message,
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        });
      }
    }
  });
};

const sendOtp = () => {
  verification.value = true;
  userData.sendAppointmentOtp();
  countdownInterval = setInterval(() => {
    countdownTime.value -= 1;
    if (countdownTime.value <= 0) {
      clearInterval(countdownInterval);

      // Perform any action you want after the countdown ends
    }
  }, 1000);
  setTimeout(() => {
    verification.value = false;
    clearInterval(countdownInterval);
    countdownTime.value = countdownMinutes * 60;
  }, 180000);
};

const validateDate = () => {
  const currentDate = moment().format("MM/DD/YYYY");
  const appointmentDate = moment.tz(Appointment.date, "Asia/Manila");

  if (appointmentDate.isBefore(currentDate)) {
    Swal.fire({
      title: "Invalid Date",
      text: "Please check the details. You cannot book an appointment in the past.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  } else {
    showAppointments.value = false;
    userData.fetchallAppointments(Appointment.date);
    isVisible.value = true;
  }
};
const showAppointments = ref(true);

function toggleView() {
  showAppointments.value = !showAppointments.value;
}

onMounted(() => {
  userData.fetchUser();
  userData.getServicesDropdown();
  userData.fetchAppointment();
  userData.getStaffDropdown();
});

onBeforeMount(() => {
  userData.fetchUser();
  userData.getServicesDropdown();
  userData.fetchAppointment();
  userData.getStaffDropdown();
});

const getStatusClass = (status) => {
  switch (status) {
    case "Cancelled":
      return "text-danger";
    case "Pending":
      return "text-warning"; // Bootstrap class for warning color
    case "Reschedule":
      return "text-info"; // Bootstrap class for info color
    case "Approved":
      return "text-success"; // Bootstrap class for success color
    case "Completed":
      return "text-primary"; // Bootstrap class for primary color
    default:
      return ""; // Default class, if none of the statuses match
  }
};

const sendVerification = () => {
  const userOtp = oneTimePassword.value.join("");
  userData.submitAppointmentOtp(userOtp).then((e) => {
    if (e == "verified") {
      verification.value = false;
      userData.sendAppointment(Appointment);
      clearInterval(countdownInterval);
      countdownTime.value = countdownMinutes * 60;
    }
  });
};

const updateAppointment = (appointment_id, status, message) => {
  let data = {
    id: appointment_id,
    status: status,
  };

  Swal.fire({
    title: `${message} Appointment?`,
    text: "Please make sure the details correct",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Yes, ${message} it!`,
  }).then((result) => {
    if (result.isConfirmed) {
      userData.updateAppointment(data);
    }
  });
};

const paginate = (page) => {
  userData.fetchallAppointments(Appointment.date, page);
};

const calculateEstimatedEndTime = (startDateTime, estimatedHours) => {
  const endTime = moment(startDateTime).add(moment.duration(estimatedHours));
  return endTime.format("MMMM Do YYYY, h:mm:ss a");
};
</script>

<template>
  <navBar />
  <div class="row vh-100">
    <div class="col-md-6 pl-0">
      <div
        class="appointment-container"
        :style="{
          opacity: userData.user_appointment?.detail === 'Cancelled' ? 0.5 : 1,
        }"
        v-if="showAppointments"
      >
        <div class="appoimtment-selection-header" v-if="isVisible">
          <span @click="toggleView">View Appointments</span>
        </div>
        <div class="card" v-if="userData.user_appointment">
          <div class="header">
            <div class="content">
              <span :class="getStatusClass(userData.user_appointment.detail)">{{
                userData.user_appointment?.detail
              }}</span>
              <p class="message">
                {{ userData.user_appointment?.service }}
              </p>

              <p class="message">
                {{ userData.user_appointment?.staff_name }}
              </p>

              <p class="message">
                {{
                  moment(userData.user_appointment?.date).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )
                }}
              </p>

              <p class="message" v-if="userData.user_appointment?.remarks">
                {{ userData.user_appointment?.remarks }}
              </p>
            </div>
            <div class="actions mt-3">
              <button
                v-if="userData.user_appointment.detail != 'Completed'"
                class="track"
                type="button"
                @click="
                  updateAppointment(
                    userData.user_appointment.appointment_id,
                    2,
                    'Cancel'
                  )
                "
                :disabled="userData.user_appointment.detail == 'Cancelled'"
              >
                Cancel
              </button>
              <button v-else>
                <router-link to="/send-reviews" style="color: black; text-wrap: nowrap;">Leave us a review</router-link>
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <span>No Appointment Records.</span>
        </div>
      </div>
      <div class="appointment-container" v-else>
        <div class="appoimtment-selection-header" v-if="isVisible">
          <span @click="toggleView">View Schedule</span>
        </div>

        <div
          class="table-container"
          v-if="userData.selected_date_appointment.data.data"
        >
          <div class="table-responsive bg-white">
            <table class="table mb-0">
              <thead>
                <tr>
                  <th scope="col">Staff Name</th>
                  <th scope="col">Date and Hours</th>
                  <th scope="col">Estimated End Time</th>
                </tr>
              </thead>
              <tbody
                v-for="(data, index) in userData.selected_date_appointment.data"
                :key="index"
              >
                <tr>
                  <td>{{ data.name }}</td>
                  <td>
                    {{ moment(data?.date).format("MMMM Do YYYY, h:mm:ss a") }}
                  </td>
                  <td>
                    {{
                      calculateEstimatedEndTime(data.date, data.estimated_hours)
                    }}
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              v-if="userData.selected_date_appointment.total > 5"
              class="table-pagination"
            >
              <div>
                <button
                  @click="
                    paginate(
                      userData.selected_date_appointment.current_page - 1
                    )
                  "
                  v-if="userData.selected_date_appointment.prev_page_url"
                >
                  <i class="fa fa-angle-left"></i>
                </button>
                <button
                  @click="
                    paginate(
                      userData.selected_date_appointment.current_page + 1
                    )
                  "
                  v-if="userData.selected_date_appointment.next_page_url"
                >
                  <i class="fa fa-angle-right"></i>
                </button>
              </div>
              <div>
                <span>
                  Page {{ userData.selected_date_appointment.current_page }} -
                  {{ userData.selected_date_appointment.last_page }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <h6>No booking on the selected date and time.</h6>
          <span
            >You can book at your most convenient time between 8 am and 10
            pm.</span
          >
        </div>
      </div>
    </div>
    <div
      class="col-md-6 login-form d-flex align-items-center justify-content-center"
    >
      <div
        class="row align-items-center justify-content-center"
        v-if="!verification"
      >
        <div class="form-input">
          <div
            class="alert alert-danger"
            role="alert"
            v-if="userData.user.errorWarning"
          >
            {{ userData.user.errorWarning }}
          </div>
          <div class="alert alert-info" role="info" v-if="accountCreated">
            Account has been successfully created.
          </div>
          <p>RESERVATION</p>
          <h2>Make an Appointment</h2>
          <form @submit.prevent="userSendAppointment">
            <div class="form-group">
              <label for="password">Services:</label>
              <select
                v-model="selectedServices"
                class="select-dropdown"
                @change="handlerServiceChange"
                style="width: 100%"
                required
              >
                <option disabled value="">Select Services</option>
                <option
                  v-for="data in userData.service_dropdown"
                  :value="data.id"
                >
                  {{ data.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="password">Select Staff:</label>
              <select
                v-model="selectedStaff"
                class="select-dropdown"
                @change="handlerStaffChange"
                style="width: 100%"
                required
              >
                <option disabled value="">Select Staff</option>
                <option
                  v-for="data in userData.staff_dropdown"
                  :value="data.id"
                >
                  {{ data.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="password">Date:</label>
              <input
                type="date"
                class="form-control"
                v-model="Appointment.date"
                required
                @change="validateDate()"
              />
            </div>
            <div class="form-group">
              <label for="password">Time:</label>
              <input
                type="time"
                class="form-control"
                v-model="Appointment.time"
                required
              />
            </div>
            <button type="submit" class="btn login-btn mb-2" @click="login">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <support></support>
</template>

<style>
.appoimtment-selection-header {
  position: absolute;
  right: 0;
  top: 100px;
}

.appoimtment-selection-header span {
  cursor: pointer;
  font-weight: bold;
}
.appointment-container {
  display: grid;
  place-items: center;
  height: 100%;
  position: relative;
}

.card {
  overflow: hidden;
  position: relative;
  text-align: left;
  border-radius: 0.5rem;
  max-width: 290px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background-color: #fff;
}

.dismiss {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: black;
  border: 2px solid #d1d5db;
  font-size: 1rem;
  font-weight: 300;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  transition: 0.3s ease;
}

.dismiss:hover {
  background-color: #ee0d0d;
  border: 2px solid #ee0d0d;
  color: #fff;
}

.header {
  padding: 1.25rem 1rem 1rem 1rem;
}

.image {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background-color: #e2feee;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  animation: animate 0.6s linear alternate-reverse infinite;
  transition: 0.6s ease;
}

.image svg {
  color: #0afa2a;
  width: 2rem;
  height: 2rem;
}

.content {
  margin-top: 0.75rem;
  text-align: center;
}

.title {
  color: #066e29;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
}

.message {
  margin-top: 0.5rem;
  color: #595b5f;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.actions {
  margin: 0.75rem 1rem;
}

.history {
  display: inline-flex;
  padding: 0.5rem 1rem;
  background-color: #1aa06d;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  justify-content: center;
  width: 100%;
  border-radius: 0.375rem;
  border: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.track {
  display: inline-flex;
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  color: #242525;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  justify-content: center;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.is-pending {
  color: rgb(233, 212, 23);
}

.is-approved {
  color: rgb(21, 184, 34);
}

.form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 380px;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: black;
}

.message {
  color: #a3a3a3;
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
}

.inputs {
  margin-top: 10px;
}

.inputs input {
  width: 32px;
  height: 32px;
  text-align: center;
  border: none;
  border-bottom: 1.5px solid #d2d2d2;
  margin: 0 10px;
}

.inputs input:focus {
  border-bottom: 1.5px solid royalblue;
  outline: none;
}

.action {
  margin-top: 24px;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background-color: royalblue;
  color: white;
  cursor: pointer;
  align-self: end;
}

.otp-form {
  position: relative;
}

.count-down-timer {
  position: absolute;
  left: 10px;
  bottom: 10px;
}
</style>
