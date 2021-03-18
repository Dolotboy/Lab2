<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-ecommerce">
      <div class="container-fluid dashboard-content ">

        <div class="row">
          <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pr-xl-0 pr-lg-0 pr-md-0  m-b-30">
                <div class="product-slider">
                  <h2 class="mb-3"><input type="text" v-model="img" placeholder="Url d'une image"></h2>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 pl-xl-0 pl-lg-0 pl-md-0 border-left m-b-30">
                <div class="product-details">
                  <div class="border-bottom pb-3 mb-3">
                    <h2 class="mb-3"><input type="text" v-model="nom" placeholder="Nom"></h2>
                    <h3 class="mb-0 text-primary">$<input type="text" v-model="prix" placeholder="Prix"></h3>
                    <!--<p>{{ nom }}</p>
                    <p>{{ prix}}</p>
                    <p>{{ fournisseur }}</p>
                    <p>{{ quantite }}</p>
                    <p>{{ desc }}</p>-->
                  </div>
                  <div class="product-size border-bottom">
                    <h4>Fournisseur</h4>
                    <input type="text" v-model="fournisseur" placeholder="Fournisseur">
                    <div class="product-qty">
                      <h4>Quantité</h4>
                      <div class="quantity">
                        <input type="number" v-model="quantite" placeholder="Quantité">
                      </div>
                    </div>
                  </div>
                  <div class="product-description">
                    <h4 class="mb-1">Description</h4>
                    <textarea rows="4" cols="50" v-model="desc" placeholder="Description"></textarea>
                    <a href="#" class="btn btn-primary btn-block btn-lg" v-on:click="addProduct">Sauvegarder</a>
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
  created: function(){ // Pour m'assurer que je peux accèder à ma BD
    var that = this;
    that.$parent.getDB().then((bd)=>{
      var transaction = bd.transaction(["ProductsObjectStore"], "readonly");
      var products = transaction.objectStore("ProductsObjectStore");
      var requete = products.getAll();
      requete.onsuccess = function(event){
        console.log(event.target.result);
        that.product = event.target.result;
      };
    });
  },
  methods:{
    addProduct()
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
        products.add(that.product);
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