<script setup>
import { ref, onMounted } from "vue";
import { userStore } from "../../store/user";
import Swal from 'sweetalert2';

const support = userStore();
const replyEmail = ref(false);
const recipeintemail = ref('');

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
    support.email.recipeintemail = recipeintemail.value
    support.sendsupportReply().then(response => {
        console.log(response.data);
        if(response.data.status == "Success"){
            support.email.reply_msg = ''
            replyEmail.value = false
            Swal.fire(
                'Email Sent!',
                'The Email sent directly to the client.',
                'success'
            )
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

</template>

<style>
.reply-btn{
    cursor: pointer;
    font-weight: bolder;
}
</style>