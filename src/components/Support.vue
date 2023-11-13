<script setup>
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import { userStore } from "../store/user";
const Support = userStore();
import Swal from "sweetalert2";

const SupportSend = () => {
  Support.sendSupport().then(response => {
      console.log(response);
      if(response.data.message == 'success'){
        Swal.fire({
                title: "Send Successfully!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "OK",
              });
              SupportVisible.value = false;
              Support.support_data = {};
      }
  });
};

const SupportVisible = ref(false);
const OpenSupport = () => {
  SupportVisible.value = !SupportVisible.value;
};
</script>

<template>
  <div class="support-container">
    <div class="form" v-if="SupportVisible">
      <form @submit.prevent="SupportSend">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter your name"
            v-model="Support.support_data.name"
            required
          />

          <br />

          <label for="name">Email Address</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter your email"
            v-model="Support.support_data.email"
            required
          />
          <br />
          <label for="question">How can we help you?</label>
          <textarea
            name=""
            id=""
            cols="30"
            class="form-control"
            rows="6"
            v-model="Support.support_data.message"
            required
          ></textarea>
        </div>
        <button type="submit" class="">Send</button>
      </form>
    </div>
    <button @click="OpenSupport" v-if="!SupportVisible">Ask Question <span><i class="fa fa-question-circle"></i></span></button>
    <button @click="OpenSupport" v-else="">Cancel</button>
  </div>
</template>

<style>
.support-container {
  position: fixed;
  bottom: 50px;
  left: 40px;
  z-index: 999 !important;
}

.form {
  margin-bottom: 25px;
}

.form button {
  width: 100%;
}
</style>
