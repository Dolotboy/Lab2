<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-ecommerce">
      <div class="container-fluid dashboard-content ">

        <div class="row">
          <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30">
                <div class="product-slider">
                  <img class="d-block" v-bind:src="product.img" alt="First slide">
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-0 border-left m-b-30">
                <div class="product-details">
                  <div class="border-bottom pb-3 mb-3">
                    <h2 class="mb-3">{{product.nom}}</h2>
                    <h2 class="mb-3">Numéro de produit: #{{this.$route.params.Id}}</h2>
                    <h3 class="mb-0 text-primary">{{ product.prix }}</h3>
                  </div>
                  <div class="product-size border-bottom">
                    <h4>Fournisseur</h4>
                    <h2>{{ product.fournisseur }}</h2>
                    <div class="product-qty">
                      <h4>Quantité</h4>
                      <div class="quantity">
                        <h2>{{ product.quantite }}</h2>
                      </div>
                    </div>
                  </div>
                  <div class="product-description">
                    <h4 class="mb-1">Description</h4>
                    <p>{{ product.desc }}</p>
                  </div>
                </div>
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
      product: null,
    }
  },
  created: function(){
    var that = this;
        that.$parent.getDB().then((bd)=>{
          var transaction = bd.transaction(["ProductsObjectStore"], "readonly");
          var products = transaction.objectStore("ProductsObjectStore");
          var requete = products.get(parseInt(that.$route.params.Id));
          requete.onsuccess = function(event){
            console.log(event.target.result);
            that.product = event.target.result;
          };
        });
  },
  methods:{
    addProducts()
    {
    parent.products.push({

      nom: "",
      desc: "",
      quantite: "",
      prix: "",
      img: "",
      fournisseur: "",
    });
    },
    },
};

/*module.exports = {
  data() {
    return {
      ProductList: [
        {Id: 1, nom: 'IBalais', prix: 50, img: ""},
        {Id: 2, nom: 'ICouteau', prix: 25, img: ""},
        {Id: 3, nom: 'IArmoire', prix: 1500, img: ""}
      ],
    }
  }
};*/
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
This could be e.g. documentation for the component.
</custom1>