'use strict'

function renderGallery(txt) {
    var imgs
    if (txt === undefined || txt === '') {
        imgs = getImgs()

    } else {
        imgs = getImgs()
        const filteredImgs = imgs.filter(img => img.keywords.includes(txt))
        imgs = filteredImgs // need to make it work with partly string?
    }

    const strHTMLs = imgs.map(({ id }) =>
        `<div class="gallery-item"><img src="img/${id}.jpg" alt="" id="${id}" class="gallery-img" onclick="onImgSelect(${id})"></div>`) 

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(id) {
    setImg(id)
    onShowEditor()
    // gElCanvas.width = 800
    // gElCanvas.height = 800
    addEventListener('resize', resizeCanvas);
    resizeCanvas()
    renderMeme()
}

function onFilterImgs(txt) {
    console.log(txt)
    renderGallery(txt)
}
