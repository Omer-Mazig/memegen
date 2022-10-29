'use strict'

var gTopLimit = 50

// --RENDER & DRAW-- //

function renderMeme() {
    const imgs = getImgs()
    const meme = getMeme()
    const { selectedImgId, selectedLineIdx, lines } = meme
    const img = imgs.find(img => img.id === selectedImgId)

    if (!img) return
    drawImg(img.url)
    if (!lines.length) return
    setLinesInPos()
    const elPlaceholder = document.querySelector('.txt-input')
    elPlaceholder.value = lines[selectedLineIdx].txt || ''

    focusOnTxtInput()
}

function drawImg(imgUrl) {
    const img = new Image()
    img.src = imgUrl
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function setLinesInPos() {
    const meme = getMeme()
    const { lines, selectedLineIdx } = meme

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i]
        var yPos
        var isSelectedLine = false
        if (i === 0) {
            yPos = gTopLimit
            isSelectedLine = i === selectedLineIdx
        } else if (i === 1) {
            yPos = gElCanvas.clientHeight - gTopLimit
            isSelectedLine = i === selectedLineIdx
        } else {
            yPos = gElCanvas.clientHeight / 2
            isSelectedLine = i === selectedLineIdx
        }
        if (!line.pos) setDefLinePos(i, gElCanvas.clientWidth / 2, yPos)
        drawText(line, line.pos.x, line.pos.y, isSelectedLine)
    }
}

function drawText(line, x, y, isSelectedLine) {
    const { txt, size, align, color } = line
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.textAlign = align // why it must come before to next?
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    if (isSelectedLine) {
        drawTextBorder(line)
    }
}



function drawTextBorder(line) {
    const { isSelectedLineMark } = getMeme()
    const { pos, txt, align, size } = line
    var lineWidth = gCtx.measureText(txt).width
    var lineHeight = gCtx.measureText(txt).fontBoundingBoxAscent + gCtx.measureText(txt).fontBoundingBoxDescent
    var tempPosX = pos.x
    var tempPosY = pos.y
    if (align === 'left') tempPosX += lineWidth / 2
    if (align === 'right') tempPosX -= lineWidth / 2
    const x = tempPosX - lineWidth / 2
    const y = tempPosY - lineHeight / 2
    if (isSelectedLineMark) {
        // drawDragIcon(x + lineWidth, y + lineHeight, size)
        gCtx.strokeRect(x, y, lineWidth, lineHeight)
    }
}

function drawDragIcon(x, y, size) { // seems like the icon is blocking the drag
    gCtx.font = `${size - 30}px FontAwesome`
    gCtx.fillText('\uF047', x + 50, y + 50);
}

// --MOUSE\TOUCH EVENTS-- //

function onDown(ev) {
    ev.preventDefault()
    const evPos = getEvPos(ev)
    if (!isSelectedLineClicked(evPos)) return
    const selectedLine = getSelectedLine()
    const lineWidth = gCtx.measureText(selectedLine.txt).width
    const lineHeight = gCtx.measureText(selectedLine.txt).fontBoundingBoxAscent + gCtx.measureText(selectedLine.txt).fontBoundingBoxDescent
    if (evPos.x > selectedLine.pos.x + lineWidth / 2 - 10 && evPos.y > selectedLine.pos.y + lineHeight / 2 - 10) {
        // working but not properly with first tow lines (hard coded)
        setLineResize(true)
    } else {
        setLineDrag(true)
        document.body.style.cursor = 'grabbing'
    }
    gStartPos = evPos
}

function onMove(ev) {
    const evPos = getEvPos(ev)
    const selectedline = getSelectedLine()
    if (!selectedline) return
    const { isDrag, isResize } = selectedline
    if (!isDrag && !isResize) return
    const dx = evPos.x - gStartPos.x
    const dy = evPos.y - gStartPos.y
    if (isDrag) moveLine(dx, dy)
    if (isResize) resizeLine(dx, dy)
    gStartPos = evPos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    setLineResize(false)
    document.body.style.cursor = 'default'
}

function isSelectedLineClicked(clickedPos) {
    const line = getSelectedLine()
    if (!line) return
    const { pos } = line // need to make function
    const lineWidth = gCtx.measureText(line.txt).width
    const lineHeight = gCtx.measureText(line.txt).fontBoundingBoxAscent + gCtx.measureText(line.txt).fontBoundingBoxDescent
    const isClicked =
        (clickedPos.x < pos.x + lineWidth / 2 &&
            clickedPos.x > pos.x - lineWidth / 2 &&
            clickedPos.y < pos.y + lineHeight / 2 &&
            clickedPos.y > pos.y - lineHeight / 2)
    return isClicked
}

function canvasDbClicked(ev) {
    const clickedPos = getEvPos(ev)
    const meme = getMeme()
    const clickedLine = meme.lines.find(line => {
        const { pos } = line // need to make function
        const lineWidth = gCtx.measureText(line.txt).width
        const lineHeight = gCtx.measureText(line.txt).fontBoundingBoxAscent + gCtx.measureText(line.txt).fontBoundingBoxDescent
        return (clickedPos.x < pos.x + lineWidth / 2 &&
            clickedPos.x > pos.x - lineWidth / 2 &&
            clickedPos.y < pos.y + lineHeight / 2 &&
            clickedPos.y > pos.y - lineHeight / 2)
    })
    if (clickedLine) {
        const id = clickedLine.id
        const lines = meme.lines

        for (var i = 0; i < lines.length; i++) { // MY HEAD IS BURNING SO ITS FOR LOOP... NOT MY FINEST HOUR
            var line = lines[i]
            if (line.id === id) {
                meme.selectedLineIdx = i
                if (ev.ctrlKey) removeLine()
                renderMeme()
            }
        }
    }
}

// --MEME EDITOR CONTROLLERS-- //

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onSetLineColor(color) {
    setLineColor(color)
    renderMeme()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onNextLine() {
    nextLine()
    renderMeme()
}

function onPrevLine() {
    prevLine()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onAlignLeft() {
    flashMsg('alinging the wrong line + bugs with select line on dbclick + not nessery because drag&drop...')
    // alignLeft()
    // renderMeme()
}

function onAlignCenter() {
    flashMsg('alinging the wrong line + bugs with select line on dbclick + not nessery because drag&drop...');
    // alignCenter()
    // renderMeme()
}

function onAlignRight() {
    flashMsg('alinging the wrong line + bugs with select line on dbclick + not nessery because drag&drop...')
    // alignRight()
    // renderMeme()
}

function onSaveMeme() {
    hideTextBorder()
    renderMeme()
    setTimeout(() => {
        const imgDataUrl = gElCanvas.toDataURL("image/jpeg")
        saveMemeToStorage(imgDataUrl)
        showTextBorder()
        renderMyMemes()
        renderMeme()
        flashMsg('SAVE')
    }, 10) // because of setTimeout on renderMeme..
}

function onShareMeme() {
    uploadImg()
    openModal(modal)
}

// --MODAL-- //

function openModal(modal) {
    if (modal === null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal === null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    document.querySelector('.share-msg').innerHTML = ''
    document.querySelector('.share-container').innerHTML = ''
}