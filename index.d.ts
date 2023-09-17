declare module "ez-invoice"

import { JPEGStream, PNGStream } from "canvas"

export interface Options {storeName: string,currency:string, tax:number, location: string, invoiceID: string, paymentMode: string}

export interface Items {
    "name": string,
    beforeTax: string,
}

export function createInvoice(options: {currency:string, tax:number, location: string, invoiceID: string, paymentMode: string},items: Items[]): {
    png: PNGStream,
    jpeg: JPEGStream
}