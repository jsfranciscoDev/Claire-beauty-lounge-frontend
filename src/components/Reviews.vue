<template>
    <navBar />
    <banner page_header="Reviews" />
  
    <div class="row justify-content-center pt-5 ">
      <div
        class="col-md-10 heading-section text-center ftco-animate fadeInUp ftco-animated"
      >
      </div>
      

      <div class="reviews-card">
        <div class="comment" v-for="data in service.service_reviews.data">
          <div class="comment_header">
            <div class="comment_header-pic">
              <img :src="backendbaseURL+data.profile" class="img-fluid preview-image"  v-if="backendbaseURL+data.profile" />
              <img src="/images/profile.png" class="img-fluid preview-image" v-else/>
            </div>
           
            <h2>{{  data.name }}</h2>
          </div>
          <div class="star-rating">
            <span v-for="index in 5" :key="index" :class="{'filled': index <= data.star_rating}">
              ★
            </span>
          </div>
          <div class="comment_content">
            <p>
              {{  data.feedback }}
            </p>
          </div>
          <div class="comment_footer">
            <span>{{formatDate(data.created_at)}}</span>
          </div>
        </div>
        <div v-if="service.service_reviews.total > 5" class="table-pagination">  
        <div>
            <button @click="paginate(service.service_reviews.current_page - 1)" v-if="service.service_reviews.prev_page_url" ><i class="fa fa-angle-left"></i></button>
            <button @click="paginate(service.service_reviews.current_page + 1)" v-if="service.service_reviews.next_page_url" ><i class="fa fa-angle-right"></i></button>
        </div>
        <div >
            <span> Page {{ service.service_reviews.current_page  }} - {{ service.service_reviews.last_page }} </span>
        </div>
        
      </div>
      </div>

     
         
   
    </div>
    
  <Support></Support>

  <footerSection></footerSection>
</template>

<script setup>
import footerSection from "../components/footer.vue";
import navBar from "../components/nav.vue";
import banner from "../components/banner.vue";
import moment from "moment";
import Support from "../components/Support.vue";
import { store } from "../store/service";
import { onMounted, ref, reactive } from "vue";

const backendbaseURL = import.meta.env.VITE_APP_BASE_URL;

const service = store();
const role = ref();
const formatPrice = (price) => {
  return `₱${parseFloat(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;
};

const paginate = (page) => {
  service.getReviews(page);
};

onMounted(() => {
  service.getServices();
  service.getReviews();
  service.userRole().then((response) => {
    role.value = response;
  });
});

const formatDate = (dateString) => {
  return moment(dateString).format("MMMM D YYYY h:mm a");
};
</script>
  
<style lang="scss" scoped>
.reviews-card {
  display: flex;
  flex-direction: column;
  padding: 50px 65px;
  max-width: 100% !important;
  width: 1200px;
  border-radius: 10px;

  //background-color: goldenrod;

  h1 {
    font-weight: bold;
    font-size: 22px;
    color: white;
    margin-bottom: 15px;
  }
  .comment {
    background-color: #e4e4e4;
    display: flex;
    flex-direction: column;
    padding: 35px;
    border-radius: 5px;
    margin-bottom: 10px;

    &_header {
      display: flex;
      align-items: center;
      &-pic {
        display: flex;
        width: 40px;
        height: 40px;
        background-color: #d56a6a;
        border-radius: 50%;
      }
      h2 {
        font-size: 18px;
        font-weight: bold;
        color: #8c8aa7;
        margin-bottom: 0px;
        margin-left: 10px;
      }
    }
    &_content {
      font-size: 16px;
      color: #8c8aa7;
    }
    &_footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 14px;
        font-weight: 700;
        color: #8c8aa7;
      }
      button {
        background-color: transparent;
        padding: 8px 10px;
        border: 1px solid #1f1e2d;
        display: flex;
        align-items: center;
        color: #8c8aa7;
        border-radius: 3px;
        svg {
          margin-right: 8px;
        }
      }
    }
  }
}
.comment_header-pic{
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.star-rating {
  font-size: 24px;
}

.star-rating span {
  cursor: none !important;
}

.star-rating .filled {
  color: gold; /* Set the color for filled stars */
}
</style>
