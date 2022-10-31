'use strict'

var gElCanvas
var gCtx
var gOverlay
var gStartPos
var heightRatio = 1
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    doTrans()
    gElCanvas = document.getElementById('canvas')
    gCtx = gElCanvas.getContext('2d')
    gOverlay = document.getElementById('overlay')
    gElCanvas.height = gElCanvas.width * heightRatio
    addListeners()
    renderGallery()
    renderMyMemes()
}

function onShowGallery() {
    document.querySelector('.galley-input').classList.remove('hide')
    document.querySelector('.editor-section').classList.add('hide')
    document.querySelector('.my-memes-section').classList.add('hide')

    document.querySelector('.editor-btn').classList.remove('active')
    document.querySelector('.my-memes-btn').classList.remove('active')

    document.querySelector('.gallery-section').classList.remove('hide')
    document.querySelector('.gallery-btn').classList.add('active')
    // resetMeme()
}

function onShowEditor() {
    document.querySelector('.galley-input').classList.add('hide')
    document.querySelector('.gallery-section').classList.add('hide')
    document.querySelector('.my-memes-section').classList.add('hide')

    document.querySelector('.gallery-btn').classList.remove('active')
    document.querySelector('.my-memes-btn').classList.remove('active')

    document.querySelector('.editor-section').classList.remove('hide')
    document.querySelector('.editor-btn').classList.add('active')
    // resetMeme()
}

function onShowMyMemes() {
    document.querySelector('.galley-input').classList.add('hide')
    document.querySelector('.editor-section').classList.add('hide')
    document.querySelector('.gallery-section').classList.add('hide')

    document.querySelector('.gallery-btn').classList.remove('active')
    document.querySelector('.editor-btn').classList.remove('active')

    document.querySelector('.my-memes-section').classList.remove('hide')
    document.querySelector('.my-memes-btn').classList.add('active')
    // resetMeme()
}

function onSetLang(lang) {
    setLang(lang)
    setDirection(lang)
    doTrans()
    renderGallery()
    renderMyMemes()
}

function setDirection(lang) {
    if (lang === 'he') {
        document.body.classList.add('rtl')
        document.querySelector('.top-border').classList.add('rtl')
        document.querySelector('.content-layout').classList.add('rtl')
        
    } else {
        document.body.classList.remove('rtl')
        document.querySelector('.top-border').classList.remove('rtl')
        document.querySelector('.content-layout').classList.remove('rtl')
    } 
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    gOverlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    if (window.innerWidth < 1380) {
        gElCanvas.width = 800
        gElCanvas.height = 800
    } else {
        gElCanvas.width = elContainer.offsetWidth
        gElCanvas.height = gElCanvas.width
    }
    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = gElCanvas.width
    renderMeme()
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function focusOnTxtInput() {
    document.querySelector('.txt-input').focus()
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 5000)
}
