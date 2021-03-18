<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-ecommerce">
      <div class="container-fluid dashboard-content ">

        <div class="row">
          <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30">
                <div class="product-slider">
                  <img class="d-block" v-model:src="img" alt="First slide">
                  <h2 class="mb-3"><input type="text" v-model="img" v-bind:value="product.nom" placeholder="Url d'une image"></h2>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-0 border-left m-b-30">
                <div class="product-details">
                  <div class="border-bottom pb-3 mb-3">
                    <h2 class="mb-3"><input type="text" v-model="nom" v-bind:value="product.nom"></h2>
                    <h2 class="mb-3">Numéro de produit: #{{this.$route.params.Id}}</h2>
                    <h3 class="mb-0 text-primary">$<input type="text" v-model="prix" v-bind:value="product.prix"></h3>
                  </div>
                  <div class="product-size border-bottom">
                    <h4>Fournisseur</h4>
                    <input type="text" v-model="fournisseur" v-bind:value="product.fournisseur">
                    <div class="product-qty">
                      <h4>Quantité</h4>
                      <div class="quantity">
                        <input type="number" v-model="quantite" v-bind:value="product.quantite">
                      </div>
                    </div>
                  </div>
                  <div class="product-description">
                    <h4 class="mb-1">Description</h4>
                    <textarea rows="4" cols="50" v-model="desc" v-bind:value="product.desc"></textarea>
                    <a href="#" class="btn btn-primary btn-block btn-lg" v-on:click="editProduct">Sauvegarder</a>
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
      img: null,
      nom: null,
      prix: null,
      fournisseur: null,
      quantite: null,
      desc: null,
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
    editProduct()
    {
      this.product= {
        nom: this.nom,
        desc: this.desc,
        quantite: this.quantite,
        prix: this.prix,
        img: this.img,
        fournisseur: this.fournisseur,
      };

      var that = this;
      that.$parent.getDB().then((bd)=>{
        var transaction = bd.transaction(["ProductsObjectStore"], "readwrite");
        var products = transaction.objectStore("ProductsObjectStore");
        products.put(that.product, that.$route.params.Id);
      })
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