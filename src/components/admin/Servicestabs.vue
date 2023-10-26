<script setup>
import { onMounted , ref } from 'vue'; 
import HeaderTabs from '../admin/tabs/tabs.vue';
import Services from '../admin/Services.vue'
import ServicesCategory from '../admin/ServicesCategory.vue'

const tabs = ref([
    {
        title: 'Services',
        value: 'service',
        icons: '',
        disabled: false,
    },
    {
        title: 'Service Category',
        value: 'category',
        icons: '',
        disabled: false,
    },
])

</script>

<template>
     <div class="admin-component-header">
        <h2><i class="fa fa-bed"></i> Services</h2>
    </div>

    <HeaderTabs :tabs="tabs">
        <template v-slot:content="{ active }">
            <template v-if="active == 'service'">
                <div class="mt-2">
                  <Services></Services>
                </div>
            </template>

            <template v-if="active == 'category'">
                <div class="mt-2">
                   <ServicesCategory></ServicesCategory>
                </div>
            </template>
        </template>
    </HeaderTabs>
</template>