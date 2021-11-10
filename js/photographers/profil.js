'use strict';
/////////////////////////////////////////


export default class PhotographerProfil {

    displayPhotographerProfil(data) {
        let photographersData = data.photographers;
        let sectionPhotographerProfil = document.getElementById('photographersProfil');
        const id = window.location.search.split('id=')[1];
        const photographers = !id ? photographersData : photographersData.filter(photographer => photographer.id == id);
        const templatePhotographersProfil = `<section class="container-banner-profil-1">
                    <section class="section1-banner-profil-photographer">
                        <h1 class="h1-profil-photographer">
                        ${ photographers[0].name }
                        </h1>
                        <div class="box-btn-contact">
                            <button id="formContact" class="btn-contact modal-btn">
                                Contactez-moi
                            </button>
                        </div>
                    </section>
                    <section class="section2-banner-profil-photographer">
                        <p class="p1">
                        ${ photographers[0].city }, ${ photographers[0].country }
                        </p>
                        <p class="p2">
                        ${ photographers[0].tagline }
                        </p>
                        <ul id="photographersTagsProfil-${ photographers[0].id }" class="ul-tag-profil-page"></ul>
                    </section>
                </section>
                <section class="container-banner-profil-2">
                    <img src="./medias/id-pictures/${ photographers[0].portrait }" alt="${ photographers[0].name }">
                </section>`

                sectionPhotographerProfil.innerHTML = templatePhotographersProfil;
        }
    }
