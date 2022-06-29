"use strict";
/////////////////////////////////////////

import Filter from "./FilterTags.js";
import Scroll from "./Scroll.js";

// Home page Builder

export default class HomePageBuilder {
  displayPhotographers(data) {
    let photographers = data.photographers;
    photographers.map(photographe => {
      let sectionPhotographers = document.getElementById('photographers');

      let articlePhotographers = document.createElement('article');
      articlePhotographers.className =
        photographe.tags.join(' ') + ' card-profil';

      let templatePhotographer = `
          <a class="fig-img-profil" href="./photographers.html?id=${photographe.id}" title="${photographe.name}">
            <img class="photo-profil" src="./medias/id-pictures/${photographe.portrait}" alt="portrait ${photographe.name}">
          </a>
          <h2 class="title-profil" alt="${photographe.name}">${photographe.name}</h2>
          <article class="content-info-profil">
              <h6 class="location-photographer" alt="Titre ville et pays photographe ${photographe.city}, ${photographe.country}">${photographe.city}, ${photographe.country}</h6>
                  <p class="phrase-intro-profil" alt="phrase d'intro photographe ${photographe.tagline}"></p>
                  <p class="tarif-photographe" alt="Tarifs du photographe ${photographe.price}€/jour">${photographe.price}€/jour</p>
          </article>
            <ul class="filter ul-filtres-profil">${photographe.tags.map(tag =>`<li class="li-filtres-profil" data-filter="${tag}">#${tag}</li>`).join(" ")}</ul>`
      sectionPhotographers.appendChild(articlePhotographers);
      articlePhotographers.innerHTML = templatePhotographer;
    })
    new Filter().filterTags();
    new Scroll().scrollButton();
  }
}
