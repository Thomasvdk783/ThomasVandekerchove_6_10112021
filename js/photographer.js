'use strict';
//////////////////////////////////////////////////////////


// Photographers Page //
import PhotographerProfil from './photographers/profil.js';
import Lightbox from './photographers/Lightbox.js'

let numberLikesTotal = 0
const numberLikeTotalTag = document.getElementById('totalNumbersLikes');

function showMediaTags(medias) {
    const mediaContainerTag = document.getElementById("contentMedia");
    mediaContainerTag.innerHTML = ''
    for (let media of medias) {
        mediaContainerTag.innerHTML += `<article class="card-media card-1">
            <figure>
                <a href="${ MediaFactory.generateMediaURL(media) }" class="media-item">${ MediaFactory.generateMediaTag(media) }</a>
                <figcaption>
                    <p>${media.title}</p>
                    <span class="likes">${media.likes}<i class="fas fa-heart"></i></span>
                </figcaption>
            </figure>
        </article>`
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
        const dropdownButton = document.getElementById('dropdown-button');
        dropdownButton.addEventListener('click', function() {
            document.getElementById("myDropdown").classList.toggle("show");
        })

        const dropdownLinks = document.querySelectorAll('.dropdown a');
        dropdownLinks.forEach(element => {
            element.addEventListener('click', function(e) {
                let mediaArraySorted;
                let sortValue = e.target.dataset.sort;
                if (sortValue == 'popularity') {
                    mediaArraySorted = media.sort((a, b) => { // SORT BY POPULARITY
                        return b.likes - a.likes
                    })
                } else if (sortValue == 'date') {
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
            });
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
            numberLikesTotal += media.likes
            numberLikeTotalTag.innerText = numberLikesTotal
        }
        Lightbox.init();
    });





document.addEventListener('click', function(e) {
    if (e.target.className == 'likes') {
        let number = parseInt(e.target.innerText);
        numberLikesTotal++;
        numberLikeTotalTag.innerText = numberLikesTotal;
        number++;
        e.target.innerHTML = `${number}<i class="fas fa-heart"></i>`;
    }
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
