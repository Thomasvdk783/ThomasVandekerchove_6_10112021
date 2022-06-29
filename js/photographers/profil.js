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
                        <h1 class="h1-profil-photographer" alt="${ photographers[0].name } photographer">
                        ${ photographers[0].name }
                        </h1>
                        <div class="box-btn-contact">
                            <button id="formContact" class="btn-contact modal-btn" alt="Button to contact photographers" role="form">
                                Contactez-moi
                            </button>
                        </div>
                    </section>
                    <section class="section2-banner-profil-photographer">
                        <p class="p1" alt="">
                        ${ photographers[0].city }, ${ photographers[0].country }
                        </p>
                        <p class="p2" alt="intro photographer : ${ photographers[0].tagline }">
                        ${ photographers[0].tagline }
                        </p>
                    </section>
                </section>
                <section class="container-banner-profil-2">
                    <img src="./medias/id-pictures/${ photographers[0].portrait }" alt="${ photographers[0].name }">
                </section>`

                sectionPhotographerProfil.innerHTML = templatePhotographersProfil;
        }
    }
