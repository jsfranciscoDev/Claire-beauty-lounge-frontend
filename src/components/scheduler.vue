
<template>
    <div>
     
    <Qalendar 
      :events="events"
      :config="config"
    >
    </Qalendar>

    </div>
  </template>
  
<script setup>
import { reactive, ref, onMounted, onBeforeMount, watch } from "vue";
import { Qalendar } from "qalendar";
import { store } from "../store/index";

const userData = store();

onBeforeMount(async () => {
  await userData.fetchSchedulerAllAppointments();
});

watch(() => userData.scheduler_data, (newData) => {
  // Assuming userData.scheduler_data is an array
  events.value = newData;
});

const events = ref([
     
]);

const config = ref({
  week: {
    // Takes the value 'sunday' or 'monday'
    // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
    startsOn: 'monday',
    // Takes the values 5 or 7.
    nDays: 7,
    // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
    // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
    scrollToHour: 5,
  },
  month: {
    // Hide leading and trailing dates in the month view (defaults to true when not set)
    showTrailingAndLeadingDates: true,
  },
  // Takes any valid locale that the browser understands. However, not all locales have been thoroughly tested in Qalendar
  // If no locale is set, the preferred browser locale will be used
  // locale: 'de-DE',
  style: {
    // When adding a custom font, please also set the fallback(s) yourself
    fontFamily: 'poppins, sans-serif',
    colorSchemes: {
          meetings: {
            color: '#fff',
            backgroundColor: '#131313',
          },
          sports: {
            color: '#fff',
            backgroundColor: '#ff4081',
          }
    }
  },
  // if not set, the mode defaults to 'week'. The three available options are 'month', 'week', and 'day'
  // Please note that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
  defaultMode: 'month',
  // The silent flag can be added to disable the development warnings. This will also bring a slight performance boost
  isSilent: true,
  showCurrentTime: true, // Display a line indicating the current time 
 
});


  </script>
  
  <style >
  @import "../../node_modules/qalendar/dist/style.css";

  </style>