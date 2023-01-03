import * as cheerio from 'cheerio'

const res = await fetch('https://kingsleague.pro/estadisticas/clasificacion/')
const html = await res.text()

const $ = cheerio.load(html)

$('table tbody tr').each((index, el) => {
    console.log($(el).text())
})


