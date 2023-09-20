<script setup>
import footerSection from '../components/footer.vue';
import navBar from '../components/nav.vue'
</script>
 
<template>
  <navBar/>
  
  <section id="home-section" class="hero" style="background-image: url(images/natolord.jpg);" data-stellar-background-ratio="0.5">
		  <div class="home-slider owl-carousel">
	      <div class="slider-item js-fullheight">
	      	<div class="overlay"></div>
	        <div class="container-fluid p-0">
			      <div class="row d-md-flex no-gutters slider-text align-items-end justify-content-end" data-scrollax-parent="true">
	          	<img class="one-third align-self-end order-md-last img-fluid" src="../assets/images/bg_2.png" alt="">
		          <div class="one-forth d-flex align-items-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
		          	<div class="text mt-5">
		          		<span class="subheading">Beauty Parlour</span>
			            <h1 class="mb-4">Get Pretty Look</h1>
			            <p class="mb-4">We provide huge facilities with advanced technology equipments and best quality service. Here we offer best treatment that you might have never experienced before.</p>
		            </div>
		          </div>
	        	</div>
	        </div>
	      </div>
	    </div>
    </section>

    <section>
	
		<div class="row">
			<div class="col-sm-12 col-md-6  col-lg-6 column-two">
				<img src="../assets/images/bg-1.jpg">
			</div>
			<div class="col-sm-12 col-md-6  col-lg-6 column-one" >
				<h2>We provide huge facilities with advanced technology equipments and best quality service. </h2>
				<p class="mt-2"> Here we offer best treatment that you might have never experienced before.</p>
				<button class="mt-3" ><router-link to="/book" class="text-dark">Book Now</router-link></button>
			</div>
			
		</div>
		
    </section>

    <footerSection></footerSection>
</template>

<style scoped lang="scss">

</style>
