"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      //console.log(ctx.state.user); //(sert pour afficher les infos sur celui qui fait la requête)
      //je crée une variable pour stocker l'id du client
      const userId = ctx.state.user.id;
      const user = await strapi.entityService.findOne(
        //je créer la variable user pour appeler entity truc pour populate toutes les offres de cette id
        "plugin::users-permissions.user",
        userId,
        { populate: ["offers"] }
      );
      //console.log(user);
      //je fais une boucle pour parcourir toutes les offres et les supprimer (puisqu'il s'agit d'un tableau);
      for (let i = 0; i < user.offers.length; i++) {
        console.log(user.offers[i]);
        //pour pas me faire chier à taper user.ofers etc, je créer une variable qui le contient, on va l'appelr offer
        const offer = user.offers[i];
        await strapi.entityService.delete("api::offer.offer", offer.id);
      }
      return { message: "All offers deleted" };
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
}));
