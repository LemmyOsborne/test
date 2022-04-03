const addButtons = document.getElementsByClassName("add-button")
const firstDeleteButtons = document.getElementsByClassName("first-delete-button")
const secondDeleteButtons = document.getElementsByClassName("second-delete-button")
const calculateRow = document.getElementById("calculate-table-row")
const firstTable = document.getElementById("first-table")
const secondTable = document.getElementById("second-table")
const x1 = document.getElementsByClassName("x1")
const x2 = document.getElementsByClassName("x2")
const y1 = document.getElementsByClassName("y1")
const y2 = document.getElementsByClassName("y2")
const calculatedX = document.getElementsByClassName("calculatedX")
const calculatedY = document.getElementsByClassName("calculatedY")
const calculateButton = document.getElementById("calculateButton")

// Графики и соответствующие им контексты канваса
const graph1 = document.getElementById("graph1")
const ctx1 = graph1.getContext("2d")

const graph2 = document.getElementById("graph2")
const ctx2 = graph2.getContext("2d")

const calculatedGraph = document.getElementById("calculated-graph")
const calculatedCtx = calculatedGraph.getContext("2d")


// Добавить новую строку по клику на кнопки "add"
for (let i = 0; i < addButtons.length; i++) {
    const element = addButtons.item(i);
    element.addEventListener("click", addNewRow)
}

// Флаги, созданные, чтобы заголовок графика создавался только один раз
let clicked1 = false
let clicked2 = false
let clicked3 = false

// Массивы точке для графиков
const firstTableData = []
const secondTableData = []
const calculatedTableData = []

// Слушатели событий для кнопки "calculate", рисующие графики при клике на кнопку
calculateButton.addEventListener("click", () => {
    // Создаю заголовок графика
    if (!clicked1) {
        clicked1 = true
        const graphContainer = document.getElementById("first-graph-container")
        const header = document.createElement("h2")
        header.className = "graph-header"
        header.innerText = "График первой таблицы"
        graphContainer.insertAdjacentElement("afterbegin", header)
    }

    // Массив точек для постоения графика
    for (let i = 0; i < x1.length; i++) {
        firstTableData[i] = { x: x1.item(i).value, y: y1.item(i).value, key: i }
    }
    drawGraph(firstTableData, ctx1, graph1)
})

calculateButton.addEventListener("click", () => {
    debugger
    // Создаю заголовок графика
    if (!clicked2) {
        clicked2 = true
        const graphContainer = document.getElementById("second-graph-container")
        const header = document.createElement("h2")
        header.className = "graph-header"
        header.innerText = "График второй таблицы"
        graphContainer.insertAdjacentElement("afterbegin", header)
    }

    // Массив точек для постоения графика
    for (let i = 0; i < x2.length; i++) {
        secondTableData[i] = { x: x2.item(i).value, y: y2.item(i).value, key: i }
    }
    drawGraph(secondTableData, ctx2, graph2)
})

calculateButton.addEventListener("click", () => {
    // Создаю заголовок графика
    if (!clicked3) {
        clicked3 = true
        const graphContainer = document.getElementById("calculated-graph-container")
        const header = document.createElement("h2")
        header.className = "graph-header"
        header.innerText = "График таблицы с вычисленными значениями"
        graphContainer.insertAdjacentElement("afterbegin", header)
    }

    // Вычисляю значения для третьей таблицы
    for (let i = 0; i < calculatedX.length; i++) {
        calculatedX.item(i).value = (parseInt(x1.item(i).value) / parseInt(x2.item(i).value)).toFixed(2)
        calculatedY.item(i).value = (parseInt(y1.item(i).value) / parseInt(y2.item(i).value)).toFixed(2)
        if (x2.item(i).value === "0" || y2.item(i).value === "0") {
            calculatedX.item(i).value = "Ошибка"
            calculatedY.item(i).value = "Ошибка"

            // Выводится сообщение, если во второй таблице присутствует ноль
            const errorMessage = document.createElement("span")
            errorMessage.className = "error"
            errorMessage.innerText = "Невозможно поделить на ноль"
            const tables = document.getElementById("tables")
            tables.appendChild(errorMessage)
            setTimeout(() => {
                tables.removeChild(errorMessage)
            }, 3000)
        }
        if (x2.item(i).value === "" || y2.item(i).value === "") {
            calculatedX.item(i).value = ""
            calculatedY.item(i).value = ""
        }
    }

    // Массив точек для постоения графика
    for (let i = 0; i < calculatedX.length; i++) {
        calculatedTableData[i] = { x: calculatedX.item(i).value, y: calculatedY.item(i).value }
    }
    drawGraph(calculatedTableData, calculatedCtx, calculatedGraph)
})


// Слушатели событий, позволяющие увеличивать и уменьшать график, для каждого графика
graph1.addEventListener("click", (e) => {
    console.log("click")
    let mouseX = e.clientX
    let mouseY = e.clientY
    if (e.shiftKey) {
        ctx1.clearRect(-1, -1, 1500, 1500)
        ctx1.translate(mouseX, mouseY)
        ctx1.scale(0.9, 0.9)
        ctx1.translate(-mouseX, -mouseY)
        drawGraph(firstTableData, ctx1, graph1)
    }
    ctx1.clearRect(-1, -1, 1500, 1500)
    ctx1.translate(mouseX, mouseY)
    ctx1.scale(1.1, 1.1);
    ctx1.translate(-mouseX, -mouseY)
    drawGraph(firstTableData, ctx1, graph1)
})

graph2.addEventListener("click", (e) => {
    console.log("click")
    let mouseX = e.clientX
    let mouseY = e.clientY
    if (e.shiftKey) {
        ctx2.clearRect(-1, -1, 1500, 1500)
        ctx2.translate(mouseX, mouseY)
        ctx2.scale(0.9, 0.9)
        ctx2.translate(-mouseX, -mouseY)
        drawGraph(secondTableData, ctx2, graph2)
    }
    ctx2.clearRect(-1, -1, 1500, 1500)
    ctx2.translate(mouseX, mouseY)
    ctx2.scale(1.1, 1.1);
    ctx2.translate(-mouseX, -mouseY)
    drawGraph(secondTableData, ctx2, graph2)
})

calculatedGraph.addEventListener("click", (e) => {
    console.log("click")
    let mouseX = e.clientX
    let mouseY = e.clientY
    if (e.shiftKey) {
        calculatedCtx.clearRect(-1, -1, 1500, 1500)
        calculatedCtx.translate(mouseX, mouseY)
        calculatedCtx.scale(0.9, 0.9)
        calculatedCtx.translate(-mouseX, -mouseY)
        drawGraph(calculatedTableData, calculatedCtx, calculatedGraph)
    }
    calculatedCtx.clearRect(-1, -1, 1500, 1500)
    calculatedCtx.translate(mouseX, mouseY)
    calculatedCtx.scale(1.1, 1.1);
    calculatedCtx.translate(-mouseX, -mouseY)
    drawGraph(calculatedTableData, calculatedCtx, calculatedGraph)
})

let key = 0

function addNewRow() {
    const table = this.parentNode.previousElementSibling

    const newRow = document.createElement("div")
    newRow.key = key++
    const newCalculateRow = document.createElement("div")

    newRow.className = "inputs"
    newCalculateRow.className = "inputs"

    const newFirstInput = document.createElement("input")
    const newSecondInput = document.createElement("input")
    if (table.id === "first-table") {
        newFirstInput.className = "new-input x1"
        newSecondInput.className = "new-input y1"
    } else if (table.id === "second-table") {
        newFirstInput.className = "new-input x2"
        newSecondInput.className = "new-input y2"
    }

    const newFirstCalculateInput = document.createElement("input")
    newFirstCalculateInput.className = "new-input calculatedX"
    const newSecondCalculateInput = document.createElement("input")
    newSecondCalculateInput.className = "new-input calculatedY"

    const newDeleteButton = document.createElement("button")
    newDeleteButton.innerText = "Delete"

    newCalculateRow.appendChild(newFirstCalculateInput.cloneNode())
    newCalculateRow.appendChild(newSecondCalculateInput.cloneNode())

    newRow.appendChild(newFirstInput.cloneNode())
    newRow.appendChild(newSecondInput.cloneNode())

    const appendRows = () => {
        if (table.id === "first-table") {
            newDeleteButton.className = "first-delete-button"
            newRow.appendChild(newDeleteButton)
            firstTable.appendChild(newRow)
            for (let i = 0; i < firstDeleteButtons.length; i++) {
                const element = firstDeleteButtons.item(i)
                console.log(element)
                element.addEventListener("click", () => deleteRow(newRow))
            }
        } else {
            newDeleteButton.className = "second-delete-button"
            newRow.appendChild(newDeleteButton)
            secondTable.appendChild(newRow)
            for (let i = 0; i < secondDeleteButtons.length; i++) {
                const element = secondDeleteButtons.item(i)
                element.addEventListener("click", () => deleteRow(newRow))
            }
        }

        const len1 = firstTable.childElementCount
        const len2 = secondTable.childElementCount
        const len3 = calculateRow.childElementCount

        if (Math.min(len1, len2) > len3) {
            calculateRow.appendChild(newCalculateRow)
        }
    }
    appendRows()
}

function deleteRow(row) {
    const table = row.parentNode
    if (table.id === "first-table") {
        firstTable.removeChild(row)
    } else {
        secondTable.removeChild(row)
    }

    if (table.id === "first-table") {
        // Очищаю все поля ввода в третьей таблице и удаляю последний график
        for (let i = 0; i < calculatedX.length; i++) {
            calculatedX.item(i).value = ""
            calculatedY.item(i).value = ""
        }
        calculatedCtx.clearRect(-1, -1, 1500, 1500)
        ctx1.clearRect(-1, -1, 1500, 1500)
        const newData = firstTableData.filter(value => value.key === row.key)
        drawGraph(newData, ctx1, graph1)
    } else {
        // Очищаю все поля ввода в третьей таблице и удаляю последний график
        for (let i = 0; i < calculatedX.length; i++) {
            calculatedX.item(i).value = ""
            calculatedY.item(i).value = ""
        }
        calculatedCtx.clearRect(-1, -1, 1500, 1500)
        ctx2.clearRect(-1, -1, 1500, 1500)
        const newData = secondTableData.filter(value => value.key === row.key)
        drawGraph(newData, ctx2, graph2)
    }
}

function drawGraph(data, ctx, graph) {
    // Рисую сетку
    const GRAPH_HEIGHT = graph.clientHeight
    const GRAPH_WIDTH = graph.clientWidth

    const cellWidthX = 30
    const cellWidthY = 30
    const SHIFT_TEXT = 5
    const SHIFT_AXIS_NAMES = 20

    // Координаты центральной точки
    const xAxisCenter = Math.round(GRAPH_WIDTH / cellWidthX / 2) * cellWidthX
    const yAxisCenter = Math.round(GRAPH_HEIGHT / cellWidthY / 2) * cellWidthY

    ctx.font = `${Math.round(cellWidthX / 2)}px Arial`
    ctx.textAlign = "left"
    ctx.textBaseline = "top"

    ctx.beginPath()
    ctx.strokeStyle = "#00C897"

    // Вертикальные линии
    for (let i = 0; i <= GRAPH_WIDTH; i += cellWidthX) {
        ctx.moveTo(i, 0)
        ctx.lineTo(i, GRAPH_HEIGHT)

        if (graph.id === "calculated-graph") {
            ctx.fillText((i - xAxisCenter) / cellWidthX, i + SHIFT_TEXT, yAxisCenter + SHIFT_TEXT)
        } else {
            ctx.fillText(((i - xAxisCenter) / cellWidthX) * 10, i + SHIFT_TEXT, yAxisCenter + SHIFT_TEXT)
        }
    }

    // Горизонтальные линии
    for (let i = 0; i <= GRAPH_HEIGHT; i += cellWidthY) {
        ctx.moveTo(0, i)
        ctx.lineTo(GRAPH_WIDTH, i)

        if (graph.id === "calculated-graph") {
            ctx.fillText((yAxisCenter - i) / cellWidthY, xAxisCenter + SHIFT_TEXT, i + SHIFT_TEXT)
        } else {
            ctx.fillText(((yAxisCenter - i) / cellWidthY) * 10, xAxisCenter + SHIFT_TEXT, i + SHIFT_TEXT)
        }
    }

    ctx.stroke()
    ctx.closePath()

    // Рисую оси x и y
    ctx.beginPath()
    ctx.strokeStyle = "#000"
    ctx.moveTo(xAxisCenter, 0)
    ctx.lineTo(xAxisCenter, GRAPH_HEIGHT)
    ctx.font = "20px Arial"
    ctx.fillText("Y", xAxisCenter - SHIFT_AXIS_NAMES, SHIFT_AXIS_NAMES / 2)

    ctx.moveTo(0, yAxisCenter)
    ctx.lineTo(GRAPH_WIDTH, yAxisCenter)
    ctx.textBaseline = "bottom"
    ctx.fillText("X", GRAPH_WIDTH - SHIFT_AXIS_NAMES, yAxisCenter - SHIFT_AXIS_NAMES / 2)

    ctx.stroke()
    ctx.closePath()

    // Рисую график 
    for (let i = 0; i <= GRAPH_WIDTH; i++) {
        ctx.beginPath()
        if (graph.id === "calculated-graph") {
            ctx.moveTo(data[i].x * cellWidthX + xAxisCenter, yAxisCenter - cellWidthY * data[i].y)
            ctx.lineTo(data[i + 1].x * cellWidthX + xAxisCenter, yAxisCenter - cellWidthY * data[i + 1].y)
        } else {
            ctx.moveTo(data[i].x / 10 * cellWidthX + xAxisCenter, yAxisCenter - cellWidthY * data[i].y / 10)
            ctx.lineTo(data[i + 1].x / 10 * cellWidthX + xAxisCenter, yAxisCenter - cellWidthY * data[i + 1].y / 10)
        }
        ctx.stroke()
        ctx.closePath()
    }
}

// Делаю графики перетаскиваемыми
function makeGraphDraggable(graph) {
    let dragStartX, dragStartY; let objInitLeft, objInitTop;
    let inDrag = false;
    graph.addEventListener("mousedown", function (e) {
        inDrag = true;
        objInitLeft = graph.offsetLeft; objInitTop = graph.offsetTop;
        dragStartX = e.pageX; dragStartY = e.pageY;
    });
    document.addEventListener("mousemove", function (e) {
        if (!inDrag) { return; }
        graph.style.left = (objInitLeft + e.pageX - dragStartX) + "px";
        graph.style.top = (objInitTop + e.pageY - dragStartY) + "px";
    });
    document.addEventListener("mouseup", function (e) { inDrag = false; });
}

makeGraphDraggable(graph1)
makeGraphDraggable(graph2)
makeGraphDraggable(calculatedGraph)