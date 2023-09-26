<script setup>
import { onMounted , ref } from 'vue'; 
import HeaderTabs from '../admin/tabs/tabs.vue';
import AppointmentAll from '../admin/tabs/AppointmentAll.vue';
import AppointmentPending from '../admin/tabs/AppointmentPending.vue';

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
        <h2><i class="fa fa-clock"></i> Appointments</h2>
    </div>

    <HeaderTabs :tabs="tabs">
        <template v-slot:content="{ active }">
          
            <template v-if="active == 'all'">
                <div class="mt-2">
                    <AppointmentAll></AppointmentAll>
                </div>
            </template>

            <template v-if="active == 'pending'">
                <div class="mt-2">
                    <AppointmentPending></AppointmentPending>
                </div>
            </template>

            <template v-if="active == 'reschedule'">
                reschedule
            </template>

            <template v-if="active == 'approved'">
                approved
            </template>

            <template v-if="active == 'completed'">
                completed
            </template>

        </template>
    </HeaderTabs>
</template>