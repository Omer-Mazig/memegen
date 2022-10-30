'use strict'

const STORAGE_KEY_SAVE_MEME = 'savedMemesDB'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gSavedMemes = loadFromStorage(STORAGE_KEY_SAVE_MEME) || []

var gImgs = [ // need to make function for this
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dogs', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dogs', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['tech', 'funny'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'wierd'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'evil'] },
    { id: 10, url: 'img/10.jpg', keywords: ['politics', 'islam'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'sport'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'king'] },
    { id: 13, url: 'img/13.jpg', keywords: ['actors', 'seccess'] },
    { id: 14, url: 'img/14.jpg', keywords: ['actors', 'serious'] },
    { id: 15, url: 'img/15.jpg', keywords: ['actors', 'serious'] },
    { id: 16, url: 'img/16.jpg', keywords: ['actors', 'funny'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics', 'serious'] },
    { id: 18, url: 'img/18.jpg', keywords: ['anima', 'funny'] }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    isSelectedLineMark: true,
    lines: [
        {
            txt: 'first line',
            size: 60,
            align: 'center',
            color: 'white',
            isDrag: false,
            isResize: false,
            id: makeId()
        },
        {
            txt: 'second line',
            size: 60,
            align: 'center',
            color: 'white',
            isDrag: false,
            isResize: false,
            id: makeId()
        }
    ]
}

function _createLine() {
    return {
        txt: 'New line',
        size: 60,
        align: 'center',
        color: 'white',
        isDrag: false,
        isResize: false,
        id: makeId()
    }
}

function hideTextBorder() {
    gMeme.isSelectedLineMark = false
}

function showTextBorder() {
    gMeme.isSelectedLineMark = true
    console.log(true);
}

function editSavedMeme(id) {
    const meme = gSavedMemes.find(savedMeme => savedMeme.id === id)
    // gMeme = JSON.parse(JSON.stringify(meme))
    meme.isSelectedLineMark = true
    gMeme = meme
}

function getSavedMemes() {
    return gSavedMemes
}

function saveMemeToStorage(imgDataUrl) {
    var sevedMeme = JSON.parse(JSON.stringify(gMeme))
    sevedMeme.id = makeId()
    sevedMeme.url = imgDataUrl
    gSavedMemes.push(sevedMeme)
    saveToStorage(STORAGE_KEY_SAVE_MEME, gSavedMemes)
}

function setDefLinePos(lineIdx, x, y) {
    gMeme.lines[lineIdx].pos = { x, y }
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function nextLine() {
    if (gMeme.lines.length === 1 ||
        gMeme.lines.length - 1 === gMeme.selectedLineIdx) return
    gMeme.selectedLineIdx++
}

function prevLine() {
    gMeme.selectedLineIdx--
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 0
}

function addLine() {
    const newLine = _createLine()
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    prevLine()
}

function alignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}

function alignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function alignRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function setLineDrag(isDrag) {
    if (!gMeme.lines || !gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function setLineResize(isResize) {
    if (!gMeme.lines || !gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].isResize = isResize
}

function resizeLine(dx, dy) {  // working but not properly with first tow lines (hard coded)
    const sizeDiff = (dx + dy) / 2
    gMeme.lines[gMeme.selectedLineIdx].size += sizeDiff
}


