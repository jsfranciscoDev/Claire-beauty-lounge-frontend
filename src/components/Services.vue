<template> 
 <navBar/>
 <banner page_header="Services"/>

 <div class="row justify-content-center pt-5 pb-5">
    <div class="col-md-10 heading-section text-center ftco-animate fadeInUp ftco-animated">
        <h2 class="">Our Service Prices</h2>
        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
    </div>

    <div class="table-container mt-5" style="width: 800px;">
        <div class="table-responsive bg-white">   
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Service Name</th>
                    <th scope="col">Service Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody v-for="(data,index) in service.services_details.data" :key="index">
                  <tr>
                 
                    <td>{{ data.name }}</td>
                    <td>{{ data.type}}</td>
                    <td>{{ formatPrice(data.price) }}</td>
                    <td>{{ data.details }}</td>

                  </tr>
                </tbody>

              </table>
        
              <div v-if="service.services_details.total > 10" class="table-pagination">  
                <div>
                  
                    <button @click="paginate(service.services_details.current_page - 1)" v-if="service.services_details.prev_page_url"><i class="fa fa-angle-left"></i></button>
                    <button @click="paginate(service.services_details.current_page + 1)" v-if="service.services_details.next_page_url" ><i class="fa fa-angle-right"></i></button>
                </div>
                <div >
                    <span> Page {{ service.services_details.current_page  }} - {{ service.services_details.last_page }} </span>
                </div>
                
              </div>
        </div>
    </div>
</div>

 <footerSection></footerSection> 
</template>

<script setup>
import footerSection from '../components/footer.vue';
import navBar from '../components/nav.vue';
import banner from '../components/banner.vue';

import { store } from "../store/service";
import { onMounted } from 'vue'; 

const service = store();

const formatPrice =(price) =>{
    return `₱${parseFloat(price).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
}

const paginate = (page) => {
    service.getServices(page);
}

onMounted(() => {
    service.getServices()
});

</script>

<style>



</style>