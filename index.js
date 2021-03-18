import Vue from 'vue'
import VueRouter from 'vue-router'

import Ajouter from '../../../projet/src/views/Ajouter.vue'
import Modification from '../../../projet/src/views/Modification.vue'
import Liste from '../../../projet/src/views/Liste.vue'
import Produit from '../../../projet/src/views/Produit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', /* Y va genre avoir 2 pages Liste, elle étant c'elle sur laquelle on arrive en loadant la page */
    name: 'Liste',
    component: Liste,
    alias: '/Liste'
  },
  {
    path: '/Produit/Ajouter',
    name: 'Ajouter',
    component: Ajouter
  },
  {
    path: '/Produit/:Id/Modification',
    name: 'Modification',
    component: Modification,
    beforeEnter : (to, from, next) =>{
      const reponse = window.confirm("Vous aller entrer dans une zone de modification de données, êtes vous certain ?");
      if (reponse)
      {
        next()
      }
      else
      {
        next(false)
      }
    },
    beforeLeave : (to, from, next) =>{
      let reponse = window.confirm("Avez vous enregistré toute vos modification ?")
      if (reponse)
      {
        next()
      }
      else
      {
        reponse = window.confirm("Voulez-vous tout de même quitter la page ?")
        if (reponse)
        {
          next()
        }
        else {
          next(false)
        }
      }
    }




  },
  /*{
    path: '/Liste',
    name: 'Liste',
    component: Liste
  },*/
  {
    path: '/Produit/:Id',
    name: 'Produit',
    component: Produit
  }
]

const router = new VueRouter({
  routes
})

export default router
