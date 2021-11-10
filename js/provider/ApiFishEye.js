'use strict';
/////////////////////////////////////////

export default class ApiFishEye {
    // Intialisation of fetch 
    async getDataFishEye () {
        let url = '../data/apiFisheye.json';
        let response = await fetch(url);
        let data = await response.json();

        const dataPhotographers = [...data.photographers];
        const dataMedias = [...data.media];

        return {
            'photographers' : dataPhotographers,
            'media' : dataMedias
        };
    }
}
