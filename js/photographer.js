'use strict';
//////////////////////////////////////////////////////////


// Photographers Page //
import PhotographerProfil from './photographers/profil.js';
import Lightbox from './photographers/Lightbox.js'

let numberLikesTotal = 0
const numberLikeTotalTag = document.getElementById('totalNumbersLikes');

function showMediaTags(medias) {
    numberLikesTotal = 0;
    const mediaContainerTag = document.getElementById("contentMedia");
    mediaContainerTag.innerHTML = ''
    for (let media of medias) {
        mediaContainerTag.innerHTML += `<article class="card-media card-1">
            <figure>
                <a href="${ MediaFactory.generateMediaURL(media) }" class="media-item">${ MediaFactory.generateMediaTag(media) }</a>
                <figcaption>
                    <p>${media.title}</p>
                    <div class="like-button">
                        <i class="likes fas fa-heart" tabindex="0"><span class="likes">${media.likes}</span></i>
                    </div>
                    
                </figcaption>
            </figure>
        </article>`
        numberLikesTotal += media.likes
        numberLikeTotalTag.innerText = numberLikesTotal
    }
}

// call the media of photographers
fetch('../../data/apiFisheye.json')
    .then(response => response.json())
    .then(data => {
        const mediaContainerTag = document.getElementById("contentMedia");
        const id = window.location.search.split('id=')[1];
        const media = data.media;
        const photographerMedia = media.filter(media => media.photographerId == id);
        showMediaTags(photographerMedia)
        const photographerPage = new PhotographerProfil();
        photographerPage.displayPhotographerProfil(data);

        /* When the user clicks on the button,
        toggle between hiding and showing the dropdown content */
        const dropdown = document.getElementById('dropdown-menu')
        dropdown.addEventListener('change', function(e) {
            let mediaArraySorted;
            let value = dropdown.value;
            if (value == 'popularity') {
                mediaArraySorted = media.sort((a, b) => { // SORT BY POPULARITY
                    return b.likes - a.likes
                })
            } else if (value == 'date') {
                mediaArraySorted = media.sort((a, b) => { // SORT BY DATE
                    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
                })
            } else {
                mediaArraySorted = media.sort((a, b) => { // SORT BY TITLE
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    }
                })
            }
            showMediaTags(mediaArraySorted.filter(media => media.photographerId == id));
            Lightbox.init();
        })

        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }

        Lightbox.init();
    });




document.addEventListener('click', function(e) {
    if (e.target.className == 'likes' || e.target.className == 'likes fas fa-heart') {
        let number = parseInt(e.target.innerText);
        numberLikesTotal++;
        numberLikeTotalTag.innerText = numberLikesTotal;
        number++;
        e.target.innerHTML = `${number}`;
    }
    // onKeyUp(e){
    //     if(!e.key == 'Enter'){
    //         this.
    //     }
    // }
});

class MediaFactory {
    static generateMediaTag(media) {
        if (media.video !== undefined) { //media is video
            return `<video width="418" height="352"controls><source src="../../medias/media-image/${media.video}" type="video/mp4">Your browser does not support HTML video.</video>`
        } else {
            return `<img class="img-card-media" src="../../medias/media-image/${media.image}" alt="${media.title}">`
        }
    }

    static generateMediaURL(media) {
        if (media.video !== undefined) { //media is video
            return `../../medias/media-image/${media.video}`;
        } else {
            return `../../medias/media-image/${media.image}`;
        }
    }
}
