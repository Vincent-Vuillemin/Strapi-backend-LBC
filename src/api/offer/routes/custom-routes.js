module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/offers/delete-all",
      handler: "offer.deleteAll", //ici on met le nom du controller qui va être appelé depuis controllers/offers, on a besoin de le créer nous-même.(donc deleteAll)
    },
  ],
};
