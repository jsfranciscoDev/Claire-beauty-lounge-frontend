<template>
     <navBar />
    <banner page_header="Terms And Conditions" />
  
    <div class="row justify-content-center pt-5 d-flex " >
        <div style="max-width: 800px;padding: 50px;">
            <h2>Terms and Conditions</h2>

            <p>Welcome to Claire Beauty Lounge! By registering on our website, you agree to comply with and be bound by the following terms and conditions. Please read the following carefully.</p>

            <h2>1. Registration</h2>

            <p>1.1. To register on Claire Beauty Lounge, you must be at least 18 years old.</p>

            <p>1.2. You agree to provide accurate and complete information during the registration process.</p>

            <p>1.3. You are responsible for maintaining the confidentiality of your account and password. Notify us immediately of any unauthorized use of your account.</p>

            <h2>2. User Conduct</h2>

            <p>2.1. You agree to use Claire Beauty Lounge for lawful purposes only.</p>

            <p>2.2. Do not upload, post, or transmit any content that is harmful, offensive, or violates any applicable laws.</p>

            <p>2.3. Respect the privacy of other users and refrain from engaging in any harassing or harmful behavior.</p>

            <h2>3. Content and Intellectual Property</h2>

            <p>3.1. All content on Claire Beauty Lounge, including text, images, and logos, is the property of Claire Beauty Lounge and is protected by copyright and other intellectual property laws.</p>

            <p>3.2. You may not reproduce, distribute, or create derivative works from any content on the website without our express permission.</p>

            <h2>4. Privacy</h2>

            <p>4.1. Your use of Claire Beauty Lounge is subject to our Privacy Policy, which can be found  <router-link to="/privacy-policy" class="text-dark">here</router-link>.</p>

            <p>4.2. By registering on our website, you consent to the collection and use of your information as outlined in the Privacy Policy.</p>

            <h2>5. Termination</h2>

            <p>5.1. Claire Beauty Lounge reserves the right to terminate or suspend your account at any time for a violation of these terms and conditions.</p>

            <p>5.2. You may terminate your account by contacting us at <a href="mailto:[contact email]">[contact email]</a>.</p>

            <h2>6. Changes to Terms and Conditions</h2>

            <p>6.1. Claire Beauty Lounge may update these terms and conditions at any time. Check this page regularly for updates.</p>

            <p>6.2. Your continued use of the website after the posting of any changes constitutes acceptance of those changes.</p>

            <p>By registering on Claire Beauty Lounge, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.</p>

            <p>If you have any questions or concerns, please contact us at <a href="mailto:[contact email]">[contact email]</a>.</p>

            <p>Thank you for being a part of Claire Beauty Lounge!</p>
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

</script>