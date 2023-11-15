<template>
    <div class="form-group search-bar ml-2">
      <input
        type="input"
        class="form-control"
        :placeholder="placeholder"
        :value="searchData"
        @input="handleInput"
        @keyup.enter="handleEnter"
      />
      <!-- Add the search icon and bind a click event to it -->
      <i class="fa fa-search search-icon" @click="handleSearchIconClick"></i>
      <!-- Add the clear icon and bind a click event to it -->
      <i v-if="searchData" class="fa fa-close clear-icon" @click="handleClearIconClick"></i>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const { placeholder } = defineProps(['placeholder']);
  const emits = defineEmits(['update:modelValue', 'enterPressed', 'searchIconClicked', 'clearIconClicked']); // Add the custom event
  
  const searchData = ref('');
  
  const handleInput = (event) => {
    searchData.value = event.target.value;
  };
  
  const handleEnter = () => {
    emits('update:modelValue', searchData.value);
    emits('enterPressed', searchData.value);
  };
  
  const handleSearchIconClick = () => {
    emits('update:modelValue', searchData.value);
    emits('searchIconClicked', searchData.value);
  };
  
  const handleClearIconClick = () => {
    searchData.value = ''; // Clear the input field
    emits('update:modelValue', ''); // Emit an event to notify the parent component about the cleared input
    emits('clearIconClicked', searchData.value);
  };
  </script>
  
  <style lang="scss" scoped>
  /* Add your styling here if needed */
  .search-bar {
    width: 300px;
    position: relative; /* Position the icon relative to the input field */
  
    input {
      background: white !important;
    }
  
    .search-icon,
    .clear-icon {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
      /* Add styles for the icons (you may use a font icon library or an SVG) */
    }
  
    .clear-icon {
      /* Add additional styles for the clear icon if needed */
      position: absolute;
      top: 50%;
      right: 35px;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  </style>
  