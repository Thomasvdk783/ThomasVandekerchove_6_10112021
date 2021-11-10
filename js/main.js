'use strict';
/**
 *
 *
 *
 * */


// Data //
import ApiFishEye from './provider/ApiFishEye.js';

// HOMEPAGE //
import HomePageBuilder from './home/HomePageBuilder.js';

// Photographers Page //
import PhotographerProfil from './photographers/profil.js';
import Lightbox from './photographers/Lightbox.js'

(function appDispatch() {
    new ApiFishEye().getDataFishEye().then((data) => {
        if (window.location.pathname.includes("/photographers.html")) {
            // PHOTOGRAPHER PROFIL HEADER
            const photographerPage = new PhotographerProfil();
            photographerPage.displayPhotographerProfil(data);
        }
        // HOMEPAGE (PHOTOGRAPHERS, SCROLL, FILTER)
        new HomePageBuilder().displayPhotographers(data);
    }).catch((error) => {
        console.error(error);
    })
})();


class MediaFactory {
    static generateMediaTag(media){
        if (media.video !== undefined){ //media is video
            return `<video width="418" height="352"controls><source src="../../medias/media-image/${media.video}" type="video/mp4">Your browser does not support HTML video.</video>`
        } else { 
            return `<img class="img-card-media" src="../../medias/media-image/${media.image}" alt="${media.title}">`
        }
    } 
}

fetch('../../data/apiFisheye.json')
    .then(response => response.json())
    .then(data => {
        const mediaContainerTag = document.getElementById("contentMedia");
        const id = window.location.search.split('id=')[1];
        const media = data.media;
        const photographerMedia = media.filter(media => media.photographerId == id);
        for (let media of photographerMedia) {
            mediaContainerTag.innerHTML += `<article class="card-media card-1">
            <figure>
                <a href="">${ MediaFactory.generateMediaTag(media) }</a>
                <figcaption>
                    <p>${media.title}</p>
                    <span class="likes">${media.likes}<i class="fas fa-heart"></i></span>
                </figcaption>
            </figure>
        </article>`
        }
    });



//likes page photographe
let addLike = document.querySelectorAll("fa-heart");
let totalLike = document.getElementsByClassName("likes");
let totalLikesOnPage = document.getElementById("totalNumbersLikes");

let cpt = parseInt(totalLike.innerHTML);

addLike.addEventListener("click", function () {
  cpt = +1;
  totalLike.innerHTML = cpt;
  totalLikesOnPage.innerHTML = cpt;
});
addLike.addEventListener("dblclick", function () {
  cpt = cpt - 1;
  totalLike.innerHTML = cpt;
  totalLikesOnPage.innerHTML = cpt;
});
