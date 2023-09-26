<script setup>
import { ref } from 'vue';

const props = defineProps({
    tabs: { type: Array, default: [], required: true },

})

const activeTabs = ref(props.tabs[0].value);

</script>

<template>
    <div id="tabs">
        <div id="tabs-header">
            <div v-for="tab,index in tabs" :key="index" class="tab" :class="{active:tab.value == activeTabs}" @click="activeTabs = tab.value">
                <i :class="tab.icons"></i>
                <span> {{ tab.title }}</span>
            </div>
        </div>
    </div>

    <div id="tabs-content">
        <slot name="content" :active="activeTabs"></slot>
    </div>
</template>

<style lang="scss" scoped>
#tabs{
    #tabs-header{
        display: flex;
        .tab{
            flex: 1;
            display: flex;
            align-items: center;
            row-gap: 0.5rem;
            height: 40px;
            background-color: white;
            justify-content: center;
            cursor: pointer;
            transition: 0.25s all ease;

            &:hover{
                background-color: beige;
            }
            & + .tab {
                border-left: 1px solid bisque;
            }

            &.active{
                background-color: rgb(100, 100, 100);
                color: white;
            }
            
            i{
                margin: 0px 3px;
            }
        }

        
    }
}

</style>