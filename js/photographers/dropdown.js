'use strict';

///////////////////////////////

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const dropdownButton = document.getElementById('dropdown-button');
dropdownButton.addEventListener('click', function() {
    document.getElementById("myDropdown").classList.toggle("show");
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


let sortMedias = function (data) {
    let mediaArraySort = [];
    let media = data.media;
    let btnSort = document.querySelector('.dropbtn');
    let hiddenSort = document.getElementsByClassName('dropdown-content');
    let sortBtn = Array.from(document.getElementsByClassName('sort'));
    sortBtn.forEach((btn, index) => btn.addEventListener('click', () => {
        hiddenSort[0].style.display = "none";
        if (index == 0) {
            btnSort.innerHTML = `Popularité`;

            mediaArraySort = media.sort((a, b) => { // SORT BY POPULARITY  
                return b.likes - a.likes
            })

        } else if (index == 1) {
            btnSort.innerHTML = `Date`;

            mediaArraySort = media.sort((a, b) => { // SORT BY DATE 
                return new Date(a.date).valueOf() - new Date(b.date).valueOf();
            })

        } else if (index == 2) {
            btnSort.innerHTML = `Titre`;

            mediaArraySort = media.sort((a, b) => { // SORT BY TITLE
                if (a.photoName.toLowerCase() < b.photoName.toLowerCase()) {
                    return -1;
                } else if (a.photoName.toLowerCase() > b.photoName.toLowerCase()) {
                    return 1;
                }
            })
        }
        this.displaySortMedia(mediaArraySort);
    }));
}
