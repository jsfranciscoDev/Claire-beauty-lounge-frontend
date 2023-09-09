<script setup>
  // This section is empty in your original code
</script>

<template>
  <div class="sticky-header header-section">

    <div class="header-right">
    
      
      <div class="profile_details">
        <!-- Profile menu -->
        <ul>
          <li class="dropdown profile_details_drop">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <div class="profile_img">
                <span class="prfil-img">
                  <img src="images/download (1).png" alt="" width="50" height="60">
                </span>
                <div class="user-name">
                  <p></p>
                  <span>Administrator</span>
                </div>
                <i class="fa fa-angle-down lnr"></i>
                <i class="fa fa-angle-up lnr"></i>
                <div class="clearfix"></div>
              </div>
            </a>
            <ul class="dropdown-menu drp-mnu">
              <li> <a href="change-password.php"><i class="fa fa-cog"></i> Settings</a> </li>
              <li> <a href="admin-profile.php"><i class="fa fa-user"></i> Profile</a> </li>
              <li> <a href="index.php"><i class="fa fa-sign-out"></i> Logout</a> </li>
            </ul>
          </li>
        </ul>
      </div>
      
      <div class="clearfix"></div>
    </div>
    
    <div class="clearfix"></div>
  </div>
</template>
