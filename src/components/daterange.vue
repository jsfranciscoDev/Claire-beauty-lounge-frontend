<template>
    <div class="dropdown-wrapper" ref="dropDown">
        <div class="dropdown-selected-option" @click="isDropdownVisible = !isDropdownVisible">
            <span v-if="isDateRange">{{ selectedDateRange }} </span>
            <span v-else>{{ mappedSelectedOption }}</span>
            <img src="../assets/images/sgvicons/calendar-black.svg" alt="dropdown"> 
        </div>
        <div class="options-wrapper" v-if="isDropdownVisible">
            <div class="options" v-for="(option, index) in options" :key="index" @click="toggleOptionSelect(option)">
                {{ option.label }}
            </div>
            <div class="custom-date-range">
                <h6>Custom</h6>
                <div class="input-container">
                    <input type="text" class="date-input" placeholder="Date From"
                        onfocus="(this.type='date')" onblur="(this.type='text')" v-model="dateRange.date_from">
                </div>
                <div class="input-container">
                    <input type="text" class="date-input" placeholder="Date to"
                        onfocus="(this.type='date')" onblur="(this.type='text')" v-model="dateRange.date_to">
                       
                </div>
                <div class="date-range-actions" v-if="isDateRange">
                    <button @click="sendDaterange()">Submit</button>
                    <button @click="clearDateRange()">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps , ref , computed, defineEmits, onBeforeMount, onMounted , watchEffect} from 'vue';
import Swal from 'sweetalert2'
import moment from 'moment'

const props = defineProps ({ 
    options:{
        type: Array,
        required: true
    },
    modelValue:{
        default:null,
    }
})

const dropDown = ref(null);

const dateRange = ref({
    date_from: null,
    date_to: null
});

const dateRangeFormatted = ref([]);

const isDateRange = ref(false);

const sendDaterange = () => {
   
    if (moment(dateRange.value.date_from).isAfter(dateRange.value.date_to)) {
        Swal.fire({
          title: 'Invalid Date Range',
          text: 'Date From should be before Date To',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        dateRange.value = {
          date_from: null,
          date_to: null
        }
    }else{
        const formattedDateFrom = moment(dateRange.value.date_from).format('MMMM D, YYYY');
        const formattedDateTo = moment(dateRange.value.date_to).format('MMMM D, YYYY');

        if (formattedDateFrom && formattedDateTo) {
            emit('update:modelValue', [formattedDateFrom, formattedDateTo]);
        }
    }
    isDropdownVisible.value = false;
}

const clearDateRange = () => {
    dateRange.value = {
        date_from: null,
        date_to: null
    };
    isDateRange.value = false;
    isDropdownVisible.value = false;
}

const selectedDateRange = ref(null);
watchEffect(() => {
  const { date_from, date_to } = dateRange.value;

  if (date_from && date_to) {
    const formattedDateFrom = moment(date_from).format('MMMM D, YYYY');
    const formattedDateTo = moment(date_to).format('MMMM D, YYYY');
    selectedDateRange.value = `${formattedDateFrom} - ${formattedDateTo}`;
    isDateRange.value = true;
    
  }
});

const isDropdownVisible = ref(false);

const emit = defineEmits(['update:modelValue'])

const selectedOptions = ref(null);

const toggleOptionSelect = (option) => {
    selectedOptions.value = option;
    emit('update:modelValue', option.value);
    dateRange.value = {
        date_from: null,
        date_to: null
    };
    isDateRange.value = false;
    isDropdownVisible.value = false;
}

const mappedSelectedOption = computed(()=> {
    return (selectedOptions.value?.label || 'Select Date');
}) 

const closeDropdown = (element) => {
    if(!dropDown.value.contains(element.target)){
        isDropdownVisible.value = false;
    }
}

onMounted(() => {
    window.addEventListener('click', closeDropdown)
})

onBeforeMount(() => {
    window.removeEventListener('click', closeDropdown)
})
</script>

  
<style scoped>
    .dropdown-wrapper{
        cursor: pointer;
        position: relative;
        width: 320px;
        font-family: 'poppins';
        max-width: 320px;
    }

    .dropdown-selected-option{
        padding: 8px 15px;
        border: 1px solid #ddd;
        border-radius: 0.25rem;
        box-sizing: border-box;
        margin-bottom: 4px;       
        position: relative;
        white-space: nowrap;
        overflow: none;
        text-overflow: ellipsis; /* or clip */
        font-family: 'poppins';
        background-color: white;
        font-size: 12px;
    }

    .custom-date-range{
        padding: 8px 15px;
        margin-bottom: 5px;
    }
    .custom-date-range input{
        padding: 8px 15px;
        margin: 5px 0px;
        width: 100%;
        border-radius: 0.25rem;
        border: 1px solid #ddd;
        background-color: white;
    }
    .custom-date-range h6{
        color: #696969;
        font-size: 12px;
        font-family: 'poppins';
    }

    .options:hover{
        background: #F0FFFF;
        z-index: 1;
    }

    .options-wrapper{
        position:absolute;
        top: 45px;
        background: #ffffff;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 0.25rem;
        right: 15px;
        z-index: 99;
        left: 0;
    }

    .options{
        padding: 10px 16px;
        box-sizing:border-box;
        color: #696969;
        font-size: 12px;
    }

    .options:last-of-type{
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .dropdown-selected-option img{
        position: absolute;
        top: 9px;
        right: 10px;
        max-width: 22px;

    }

    .input-container {
        position: relative;
    }

    .date-input {
        padding-right: 30px; /* Adjust this value based on the icon size */
        font-size: 12px;
    }

    .date-range-actions{
        display:flex;
        justify-content:end;
        align-items:center;
    }
    .date-range-actions button {
        margin: 3px 5px;
        border-radius: 5px;
        background-color: #0d6efd;
        color: #ffffff;
        font-weight: bold;
        border:none;
        font-size: 14px;
        padding: 3px 5px;
    }
    .dropdown-selected-option span{
        font-weight: 600;
    }
  </style>
  
