'use strict'

function renderMyMemes() { // onEditSavedMeme = DISABLED
    const myMemes = getSavedMemes()
    if (!myMemes || !myMemes.length) return
    const strHTMLs = myMemes.map(meme => {
        return `<div class="my-memes-item" onclick1="onEditSavedMeme('${meme.id}')"><img src="${meme.url}" alt="${meme.id}" class="my-memes-img"></div>` 
    })
    const elMyMemes = document.querySelector('.my-memes-container')
    elMyMemes.innerHTML = strHTMLs.join('')
}

function onEditSavedMeme(id) {
    editSavedMeme(id)
    // addEventListener('resize', resizeCanvas);
    // resizeCanvas()
    renderMeme()
    onShowEditor()
}