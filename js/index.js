'use strict';

// Data //
import ApiFishEye from './provider/ApiFishEye.js';

// HOMEPAGE //
import HomePageBuilder from './home/HomePageBuilder.js';



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