const { createCanvas } = require('canvas')

function taxCalc(items, options){

let finalArr = []

items.forEach(x =>{
    finalArr.push({
        name: x.name,
        beforeTax: x.beforeTax,
        tax: options.tax,
        currency: options.currency,
        afterTax: x.beforeTax+(x.beforeTax * (options.tax/100))
    })
})

return finalArr

}

function createInvoice(options, items){

const canvas = createCanvas(400,800)
const ctx = canvas.getContext("2d")


var value1 = {
    finalY: 100,
}

taxCalc(items,options).forEach(x =>{
value1.finalY =  value1.finalY + 25
})

canvas.height = value1.finalY + 150
//White Background
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "black"

//Shop name
ctx.font = "25px sans-serif"
ctx.fillText(options.storeName, 130, 30)

//Title
ctx.font = "15px sans-serif"
ctx.fillText("Simplified Tax Invoice", 130, 50)

//Black Underline
ctx.strokeStyle = 'rgb(0,0,0)'
ctx.beginPath()
ctx.lineTo(0,52)
ctx.lineTo(400, 52)
ctx.stroke()

ctx.font = "17px sans-serif"
ctx.fillText("Item Name", 10, 70)

ctx.fillText("Base Price", 195, 70)

ctx.fillText("Final Price", 295, 70)

var i = 0
ctx.font = "12px sans-serif"

var value = {
    finalY: 100,
    totalBeforeTax: 0,
    totalAfterTax: 0
}

taxCalc(items, options).forEach(x =>{
ctx.fillText(`${x.name}`, 10, 100+i)
ctx.fillText(`${x.beforeTax} ${options.currency}`, 210, 100+i)
ctx.fillText(`${x.afterTax} ${options.currency}`, 300, 100+i)
value.totalAfterTax = value.totalAfterTax + x.afterTax
value.totalBeforeTax = value.totalBeforeTax + x.beforeTax
value.finalY =  value.finalY + 25
i = i +30
})

ctx.beginPath()
ctx.lineTo(0,75)
ctx.lineTo(400, 75)
ctx.stroke()
ctx.beginPath()
ctx.lineTo(0, value.finalY + 20)
ctx.lineTo(400,value.finalY+ 20)
ctx.stroke()

ctx.fillText(`Total`,10, value.finalY+ 40)

ctx.fillText(`${value.totalBeforeTax} ${options.currency}`, 210, value.finalY+ 40)
ctx.fillText(`${value.totalAfterTax} ${options.currency}`, 300, value.finalY+ 40)

ctx.font = "13px sans-serif"

//ctx.fillText(`Time: ${day(new Date().getDay())} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,10, value.finalY+ 90)
ctx.fillText(`Payment Method: ${options.paymentMode}`,10, value.finalY+ 70)

ctx.fillText(`Time: ${new Date().toString().split("GMT")[0]}`,10, value.finalY+ 90)

ctx.fillText(`Location: ${options.location}`,10, value.finalY+ 110)

ctx.fillText(`Invoice No.: ${options.invoiceID}`,10, value.finalY+ 130)

ctx.beginPath()
ctx.lineTo(0, value.finalY + 50)
ctx.lineTo(400,value.finalY+ 50)
ctx.stroke()

ctx.beginPath()
ctx.lineTo(190,52)
ctx.lineTo(190,value.finalY + 50)
ctx.stroke()

ctx.beginPath()
ctx.lineTo(280,52)
ctx.lineTo(280,value.finalY + 50)
ctx.stroke()

ctx.beginPath()
ctx.lineTo(0,value.finalY + 140)
ctx.lineTo(400,value.finalY + 140)
ctx.stroke()



return {
    png: canvas.createPNGStream(),
    jpeg: canvas.createJPEGStream()
}
}

module.exports.createInvoice = createInvoice