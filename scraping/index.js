import * as cheerio from 'cheerio'

const URLS = {
    leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}

const scrape = async(url) =>{
    const res = await fetch(url)
    const html = await res.text()
    return cheerio.load(html)
}

const $ = scrape(URLS.leaderboard)

$('table tbody tr').each((index, el) => {
    const rawTeam = $(el).find('.fs-table-text_3').text().trim()
    const rawVictories = $(el).find('.fs-table-text_4').text().trim()
    const rawLoses = $(el).find('.fs-table-text_5').text().trim()
    const rawScoaredGoals = $(el).find('.fs-table-text_6').text().trim()
    const rawConcededGoals = $(el).find('.fs-table-text_7').text().trim()
    const rawYellowCards = $(el).find('.fs-table-text_8').text().trim()
    const rawRedCards = $(el).find('.fs-table-text_9').text().trim()

    console.log({
        rawTeam,
        rawVictories,
        rawLoses,
        rawScoaredGoals,
        rawConcededGoals,
        rawYellowCards,
        rawRedCards
   })
})


const leaderboard = [{
    team: 'Team 1',
    wins: 0,
    loses: 0,
    goalsScored: 0,
    goalsConceded: 0,
    cardsYellow: 0,
    cardsRed: 0
}]