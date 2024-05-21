module.exports = async (policyContext, config, { strapi }) => {
  //console.log("je passe dans ma policy);");
  //console.log(policyContext.state.user); //j'affiche les infos (id) de celui qui fait la requête
  //je stocke dans une variable l'id de cet utilisateur
  const requesterId = policyContext.state.user.id;
  //jaffiche et je stocke l'id de l'article que veut modifier l'utilisateur
  const offerId = policyContext.request.params.id;
  //console.log(offerId);
  const offer = await strapi.entityService.findOne(
    "api::offer.offer",
    offerId,
    { populate: ["owner"] } //je rajoute populate pour étendre les infos sur owner
  ); //je récupré l'offre avec entityservice pour choper owner
  console.log(offer); //
  if (requesterId === offer.owner.id) {
    return true;
  } else {
    return false;
  }
};
