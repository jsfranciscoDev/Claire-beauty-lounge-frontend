<template>
  <container fluid>
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-3">
            <h4>Items</h4>
        </div>
        <div class="col-5 col-md-5 col-sm-3">

        </div>
        <div class="col-1 col-md-1 col-sm-1">
            <button type="button" class="btn btn-dark">Dark</button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
        </div>
    </div>
  </container>
</template>

<script>
export default {

}
</script>

<style>

</style>