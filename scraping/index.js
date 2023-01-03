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

  const cleanText = text => text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, '')

  $rows.each((index, el) => {
    const $el = $(el)

    const rawTeam = $el.find('.fs-table-text_3').text().trim()
    const rawVictories = $el.find('.fs-table-text_4').text().trim()
    const rawLoses = $el.find('.fs-table-text_5').text().trim()
    const rawScoaredGoals = $el.find('.fs-table-text_6').text().trim()
    const rawConcededGoals = $el.find('.fs-table-text_7').text().trim()
    const rawYellowCards = $el.find('.fs-table-text_8').text().trim()
    const rawRedCards = $el.find('.fs-table-text_9').text().trim()

    console.log(
      cleanText(rawTeam),
      cleanText(rawVictories),
      cleanText(rawLoses),
      cleanText(rawScoaredGoals),
      cleanText(rawConcededGoals),
      cleanText(rawYellowCards),
      cleanText(rawRedCards)
    )
  })
}

getLeaderBoard()
/*
const leaderboard = [{
    team: 'Team 1',
    wins: 0,
    loses: 0,
    goalsScored: 0,
    goalsConceded: 0,
    cardsYellow: 0,
    cardsRed: 0
}] */
