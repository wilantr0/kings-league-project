import * as cheerio from 'cheerio'

const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}

async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}

async function getLeaderBoard () {
  const $ = await scrape(URLS.leaderboard)
  const $rows = $('table tbody tr')

  const LEADERBOARD_SELECTORS = {
    team: '.fs-table-text_3',
    wins: '.fs-table-text_4',
    loses: '.fs-table-text_5',
    goalsScored: '.fs-table-text_6',
    goalsConceded: '.fs-table-text_7',
    cardsYellow: '.fs-table-text_8',
    cardsRed: '.fs-table-text_9'
  }

  const cleanText = text => text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, '')

  const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)

  $rows.each((index, el) => {
    const leaderBoardEntries = leaderBoardSelectorEntries.map(([key, selector]) => {
      const rawValue = $(el).find(selector).text()
      const value = cleanText(rawValue)
      return [key, value]
    })
    return Object.fromEntries(leaderBoardEntries)
  })
}

await getLeaderBoard()
