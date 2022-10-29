'use strict'

var gCurrLang = 'en'
var gTrans = {
    'title': {
        en: 'MEMEGEN.',
        he: 'מכולל מם.'
    },
    'gallery': {
        en: 'Gallery',
        he: 'גלריה'
    },
    'meme-editor': {
        en: 'Meme Editor',
        he: 'עורך מם'
    },
    'my-memes': {
        en: 'My Memes',
        he: 'הממים שלי'
    },
    'menu': {
        en: 'MENU',
        he: 'תפריט'
    },
    'gallery-title': {
        en: 'Choose Image!',
        he: 'בחר תמונה!'
    },
    'next-line': {
        en: 'Next Line',
        he: 'שורה הבאה'
    },
    'prev-line': {
        en: 'Prev Line',
        he: 'שורה קודמת'
    },
    'add-line': {
        en: 'Add Line',
        he: 'הוסף שורה'
    },
    'remove-line': {
        en: 'Remove Line',
        he: 'הסר שורה'
    },
    'align-left': {
        en: 'Align Left',
        he: 'ייצב שמאלה'
    },
    'align-center': {
        en: 'Align Center',
        he: 'ייצב מרכז'
    },
    'align-right': {
        en: 'Align Right',
        he: 'ייצב ימינה'
    },
    'save-meme': {
        en: 'Save Meme',
        he: 'שמור מם'
    },
    'share-meme': {
        en: 'Share Meme',
        he: 'שתף מם'
    },
    'share-modal-title': {
        en: 'Share!',
        he: 'שתף!'
    },
    'my-memes-title': {
        en: 'Your Saved Memes!',
        he: 'הממים השמורים שלך!'
    }
}

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.en
    return trans
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
}

function setLang(lang) {
    gCurrLang = lang
}