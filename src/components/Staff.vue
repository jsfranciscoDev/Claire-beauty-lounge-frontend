<script setup>
import { store } from "../store/staff";
import { onMounted, ref } from "vue";

import footerSection from "../components/footer.vue";
import navBar from "../components/nav.vue";
import banner from "../components/banner.vue";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const staffDetails = store();
const someDynamicValue = "Staff";

onMounted(() => {
  staffDetails.getStaff();
});
</script>

<template>
  <navBar />
  <banner :page_header="someDynamicValue"></banner>
  <div class="row justify-content-center pt-5 pb-5">
    <div
      class="col-md-10 heading-section text-center ftco-animate fadeInUp ftco-animated"
    >
      <h2 class="">Our Expert Staffs</h2>
      <p></p>
    </div>
  </div>
  <!-- STAFF SECTION -->
  <div class="container">
    <div class="row staff-cards">
      <div
        class="cards"
        v-for="(data, index) in staffDetails.staff"
        :key="index"
      >
        <div class="cards-image">
          <img :src="baseURL + data.path" />
        </div>
        <hr />
        <div class="cards-text">
          <h5>{{ data.name }}</h5>

          <label> Short Bio: </label>
          <p>{{ data.bio }}</p>

          <label> Expertise: </label>
          <p>{{ data.expertise }}</p>

          <label> Services: </label>
          <p>
            {{
              data.services
                .map((service) => service.service_category)
                .join(" , ")
            }}
          </p>
        </div>
       
      </div>
    </div>
  </div>
  <!-- STAFF SECTION END-->

  <footerSection></footerSection>
</template>
