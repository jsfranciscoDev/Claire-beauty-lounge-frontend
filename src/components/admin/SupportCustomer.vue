<script setup>
import { ref, onMounted } from "vue";
import { userStore } from "../../store/user";
import Swal from 'sweetalert2';

const support = userStore();
const replyEmail = ref(false);
const recipeintemail = ref('');
const loaded = ref(false);

const closeDialog = () => {
    formDialog.value = false;
    Update.value = false;
    resetFields();
}

const resetFields = () => {
    product.product = {}
}

const paginate = (page) => {
    support.getAllsupport(page);
}


const submitUpdate = () => {
    product.updateProducts();
    closeDialog();
}

onMounted(() => {
    support.getAllsupport();
});

const sendEmailReply = (email) =>{
    replyEmail.value = true
    recipeintemail.value = email;
}

const sendreply = () =>{
    loaded.value = true
    replyEmail.value = false
    support.email.recipeintemail = recipeintemail.value
    support.sendsupportReply().then(response => {

        if(response.data.status == "Success"){
            support.email.reply_msg = ''
            replyEmail.value = false
            Swal.fire(
                'Email Sent!',
                'The Email sent directly to the client.',
                'success'
            )
            loaded.value = false
        }else{
            Swal.fire(
                'Something Went wrong!',
                'Unable to send an email to the client',
                'error'
            )
        }
    });
}   

</script>

<template>
     <div class="admin-component-header">
        <h2><i class="fa fa-linode"></i> Customer Support </h2>
    </div>

    <div class="table-container">
        <div class="table-responsive bg-white">   
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Client Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                    
                  </tr>
                </thead>
                <tbody  v-for="(data,index) in support.support_concern.data" :key="index">
                  <tr>
                    
                    <td>{{ data.name }}</td>
                    <td>{{ data.email }}</td>
                    <td>{{ data.message }}</td>
                    <td>{{ data.created_at }}</td>
                    <td><span class="reply-btn" @click="sendEmailReply(data.email)">Reply Via Email</span></td>
                  </tr>
                </tbody>

              </table>
        
              <div v-if="support.support_concern.total > 5" class="table-pagination">  
                <div>
                    <button @click="paginate(support.support_concern.current_page - 1)" v-if="support.support_concern.prev_page_url"><i class="fa fa-angle-left"></i></button>
                    <button @click="paginate(support.support_concern.current_page + 1)" v-if="support.support_concern.next_page_url" ><i class="fa fa-angle-right"></i></button>
                </div>
                <div >
                    <span> Page {{ support.support_concern.current_page  }} - {{ support.support_concern.last_page }} </span>
                </div>
                
              </div>
        </div>
    </div>


      <!-- MODAL -->
      <div class="add-staff" v-if="replyEmail">
        <div class="form-container">
            <div class="staff-form">
                <div class="form-input">
                    <h2 v-if="!updateStaff"><i class="fa-solid fa-bell"></i> Send Reply</h2>
                
                <form @submit.prevent="sendreply">
               
                <div class="form-group">
                    <label for="name">Reply Via Email</label>
                    <textarea class="form-control" v-model="support.email.reply_msg" autocomplete="off"  rows="6" cols="50" required></textarea>
                    <span  class="text-danger"></span>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-danger" @click=" replyEmail = false">Cancel</button>
              </form>
            </div>
            </div>
        </div>
     
    </div>
    <!-- MODAL -->

    <div class="loader" v-if="loaded">Loading
        <span></span>
    </div>
</template>

<style>
.reply-btn{
    cursor: pointer;
    font-weight: bolder;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: transparent;
  border: 3px solid rgba(0, 102, 255, 0.1);
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  font-family: sans-serif;
  font-size: 20px;
  color: #eed9c4;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 0 10px #eed9c4;
  box-shadow: 0 0 20px rgba(0, 0, 0, .15);
}

.loader::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #eed9c4;
  border-right: 3px solid #eed9c4;
  border-radius: 50%;
  animation: animateC 2s linear infinite;
}

.loader span {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left;
  animation: animate 2s linear infinite;
}

.loader span::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #eed9c4;
  top: -6px;
  right: -8px;
  box-shadow: 0 0 20px 5px #eed9c4;
}

@keyframes animateC {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate {
  0% {
    transform: rotate(45deg);
  }

  100% {
    transform: rotate(405deg);
  }
}
</style>