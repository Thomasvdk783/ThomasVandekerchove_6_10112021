//// Lightbox script js ////


export default class Lightbox {

    static init() {
        const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".mp4"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('href'), gallery)
        }))
    }

    /**
     * @param {string[]} images Chemins des images de lightbox
     */

    constructor(url, images, videos) {
        this.element = this.buildDOM(url)
        this.images = images
        this.videos = videos
        this.loadMedia(url)
        this.oneKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        document.addEventListener('keyup', this.onKeyUp.bind(this))
    }

    //
    // load image
    //




    loadMedia(url) {
            const extUrl = url.split('.').pop()
            this.url = null
            if(extUrl !== 'mp4'){
                const media = new Image()
                const container = this.element.querySelector('.lightbox__container')
                const loader = document.createElement('div')
                loader.classList.add('.lightbox__loader')
                container.innerHTML = ''
                container.appendChild(loader)
                media.setAttribute('alt', 'ok')
                media.onload = () => {
                    container.removeChild(loader)
                    container.appendChild(media)
                    this.url = url
                }
                media.src = url
            }
            else{
                const mediaVideo = document.createElement('video')
                const container = this.element.querySelector('.lightbox__container')
                container.innerHTML = ''
                mediaVideo.setAttribute('src', url)
                mediaVideo.setAttribute('alt', 'ok')
                mediaVideo.setAttribute('height', '500')
                mediaVideo.setAttribute('width', '700')
                mediaVideo.setAttribute('controls', 'controls')
                mediaVideo.setAttribute('autoplay', 'true')
                container.appendChild(mediaVideo)
            }
        }
        /**
         *
         * @param {KeyboardEvent} e
         */
    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e)
        } else if (e.key === 'ArrowLeft') {
            this.prev(e)
        } else if (e.key === 'ArrowRight') {
            this.next(e)
        }
    }

    /**
     *
     * @param {MouseEvent/KeyboardEvent} e
     *
     */
    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp.bind(this))
    }

    /**
     *
     * @param {MouseEvent/KeyboardEvent} e
     *
     */
    next(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        console.log(i)
        if (i === this.images.length -1) {
            i = 0
        }else{
            i++
        }
        this.loadMedia(this.images[i])
        console.log(this.images)
    }

    /**
     *
     * @param {MouseEvent/KeyboardEvent} e
     *
     */
    prev(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        if (i === 0) {
            i = this.images.length
        }
        this.loadMedia(this.images[i - 1])
    }

    buildDOM(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = ` <button class="lightbox__close"></button>
            <button class="lightbox__next"></button>
            <button class="lightbox__prev"></button>
            <div class="lightbox__container"></div>`
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
        return dom
    }
}

