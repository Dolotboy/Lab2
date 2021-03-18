<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-ecommerce">
      <div class="container-fluid dashboard-content ">

        <div class="row">
          <div class="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
            <div class="row">

              <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                <ul>
                  <li v-for="product in products" :key="product.nom">
                    <div class="product-thumbnail">
                      <div class="product-img-head">
                        <div class="product-img">
                          <img v-bind:src="product.img" alt="" class="img-fluid"></div>
                        </div>
                        <div class="product-content">
                        <div class="product-content-head">
                          <h3 class="product-title">{{product.nom}}</h3>
                          <div class="product-price">{{product.prix}}</div>
                        </div>
                    <div class="product-btn">
                      <a href="#" class="btn btn-primary"><router-link :to="'/Produit/' + product.Id + '/Modification'">Modifier</router-link></a>
                      <a href="#" class="btn btn-outline-light"><router-link :to="'/Produit/' + product.Id">Détails</router-link></a>
                    </div>
                  </div>
                </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      products: null,
    }
  },
  created: function(){
    var that = this;
    this.$parent.getProducts()
        .then(function(value){
          that.products = value;
        });
  },
};
</script>

<style>
.example {
  color: red;
}
</style>
