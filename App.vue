<template>
  <div class="dashboard-header">
    <nav class="navbar navbar-expand-lg bg-nav-brown fixed-top">
      <a class="navbar-brand" href="#"><router-link to="/Produit/Ajouter">Ajouter
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
        </button>
      </router-link>
      </a>
      <a class="navbar-brand" href="#"><router-link to="/Liste">Inventaire
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
      </button>
      </router-link>
      </a>
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto navbar-right-top">
          <li class="nav-item">
            <div id="custom-search" class="top-search-bar">
              <input class="form-control" type="text" placeholder="Search..">
            </div>
          </li>
          <li class="nav-item dropdown notification">
            <a class="nav-link nav-icons" href="#" id="navbarDropdownMenuLink1"><i class="fas fa-plus-circle"></i> </a>
          </li>

        </ul>
      </div>
    </nav>
    <router-view/>
  </div>

</template>

<script>
module.exports = {

  data() {
    return {
      db: null,
      products: null,
    }
  },

  methods: {
    getProducts(){
      var that = this;
      return new Promise(function(resolve){
        if(!that.products){
          that.getDB().then((bd)=>{
            var transaction = bd.transaction(["ProductsObjectStore"], "readonly");
            var products = transaction.objectStore("ProductsObjectStore");
            that.products = [];
            products.openCursor().onsuccess = function(event){
              var cursor = event.target.result;
              if(cursor){
                that.products.push(cursor.value);
                cursor.continue();
              }
              //console.log(that.products);
              resolve(that.products);
            };
          });
        }
        else{
          resolve(that.products);
        }
      });
    },
    getDB(){
      return new Promise(function(resolve, reject){
        if(!this.db){
          var requete = indexedDB.open("ProductsDB", 2);

          requete.onupgradeneeded = function(event){
            var bd = event.target.result;

            var options = {
              keyPath: "Id",
              autoIncrement: true
            };
            var products = bd.createObjectStore("ProductsObjectStore", options);

            products.createIndex("mainIndex", "Id");

            products.transaction.oncomplete = function(){
              var trans = bd.transaction("ProductsObjectStore", "readwrite");
              var products = trans.objectStore("ProductsObjectStore");

              products.add({
                nom: "IBalais",
                desc: "Un balais intelligent donnant le % de poussière dans la pièce",
                quantite: "3",
                prix: "50",
                img: "https://img.discogs.com/sIt3C-pPSIIF-sRCksH5SHWIAII=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-12898397-1544105869-9138.jpeg.jpg",
                fournisseur: "Apple",
              });

              products.add({
                nom: "ICouteau",
                desc: "Un couteau pouvant t'avertir de son usure de la lame ou bien si un accident est sur le point d'arriver. Lame intelligente rétractable",
                quantite: "5",
                prix: "35",
                img: "https://img.discogs.com/sIt3C-pPSIIF-sRCksH5SHWIAII=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-12898397-1544105869-9138.jpeg.jpg",
                fournisseur: "Apple",
              });

              products.add({
                nom: "IArmoire",
                desc: "Une penderie capable de choisir votre habit du jour, sans intervention humaine",
                quantite: "1",
                prix: "350",
                img: "https://img.discogs.com/sIt3C-pPSIIF-sRCksH5SHWIAII=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-12898397-1544105869-9138.jpeg.jpg",
                fournisseur: "Apple",
              });


              /*
              products.add({
                nom: "",
                desc: "",
                quantite: "",
                prix: "",
                img: "",
                fournisseur: "",
              });
               */

            };
          };

          requete.onerror = function(event){
            console.log(event.target.errorCode);
            reject("Error");
          };

          requete.onsuccess = function(event){
            this.db = event.target.result;
            resolve(this.db);
          };
        }
        else {
          resolve(this.db);
        }

      });
    },

  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

