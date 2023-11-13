<script setup>
import { onMounted , ref } from 'vue'; 
import HeaderTabs from '../admin/tabs/tabs.vue';
import AppointmentAll from '../admin/tabs/AppointmentAll.vue';
import AppointmentPending from '../admin/tabs/AppointmentPending.vue';
import AppointmentCancelled from '../admin/tabs/AppointmentCancelled.vue';
import AppointmentReschedule from '../admin/tabs/AppointmentReschedule.vue';
import AppointmentApproved from '../admin/tabs/AppointmentApproved.vue';
import AppointmentCompleted from '../admin/tabs/AppointmentCompleted.vue';

const tabs = ref([
    {
        title: 'All',
        value: 'all',
        icons: 'fa fa-clock',
        disabled: false,
    },
    {
        title: 'Cancelled',
        value: 'cancelled',
        icons: 'fa fa-clock',
        disabled: false,
    },
    {
        title: 'Pending',
        value: 'pending',
        icons: 'fa fa-clock',
        disabled: false,
    },
    {
        title: 'Reschedule',
        value: 'reschedule',
        icons: 'fa fa-clock',
        disabled: false,
    },
    {
        title: 'Approved',
        value: 'approved',
        icons: 'fa fa-clock',
        disabled: false,
    },
    {
        title: 'Completed',
        value: 'completed',
        icons: 'fa fa-clock',
        disabled: false,
    }
])

</script>

<template>
     <div class="admin-component-header">
        <h2><i class="fa fa-book"></i> Appointments</h2>
    </div>

    <HeaderTabs :tabs="tabs">
        <template v-slot:content="{ active }">
          
            <template v-if="active == 'all'">
                <div class="mt-2">
                    <AppointmentAll></AppointmentAll>
                </div>
            </template>

            <template v-if="active == 'cancelled'">
                <div class="mt-2">
                   <AppointmentCancelled></AppointmentCancelled>
                </div>
            </template>

            <template v-if="active == 'pending'">
                <div class="mt-2">
                    <AppointmentPending></AppointmentPending>
                </div>
            </template>

            <template v-if="active == 'reschedule'">
                <AppointmentReschedule></AppointmentReschedule>
            </template>

            <template v-if="active == 'approved'">
              <AppointmentApproved></AppointmentApproved>
            </template>

            <template v-if="active == 'completed'">
                <AppointmentCompleted></AppointmentCompleted>
            </template>

        </template>
    </HeaderTabs>
</template>