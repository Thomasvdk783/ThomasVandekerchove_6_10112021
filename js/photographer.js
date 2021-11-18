'use strict';
//////////////////////////////////////////////////////////


// Photographers Page //
import PhotographerProfil from './photographers/profil.js';
import Lightbox from './photographers/Lightbox.js'


// call the media of photographers
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

    class MediaFactory {
        static generateMediaTag(media){
            if (media.video !== undefined){ //media is video
                return `<video width="418" height="352"controls><source src="../../medias/media-image/${media.video}" type="video/mp4">Your browser does not support HTML video.</video>`
            } else { 
                return `<img class="img-card-media" src="../../medias/media-image/${media.image}" alt="${media.title}">`
            }
        } 
    }