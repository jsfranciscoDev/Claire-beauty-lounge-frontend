<script setup>
  const page_header = defineProps(['page_header']);
</script>
<template>
    <section class="hero-wrap hero-wrap-2" style="background-image: url(&quot;images/bg-2.jpg&quot;); background-position: 50% 0%;" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-center" style="height: 955px;">
          <div class="col-md-9 ftco-animate pb-5 fadeInUp ftco-animated">
            <h2 class="mb-0 bread">{{  page_header.page_header }} </h2>
          
          </div>
        </div>
      </div>
    </section>
</template>