import {useState, useEffect} from 'react'
import './App.css'
import Modal from '@mui/material/Modal'
import {Routes, Route, useNavigate} from 'react-router-dom'
import exportFromJSON from 'export-from-json'
import axios from 'axios'

// Components
// import NavMenu from "./components/NavMenu";
import GameTracker from './components/GameTracker'
import ModalStats from './components/ModalStats'
import TeamSelect from './components/TeamSelect'
import TeamSetup from './components/TeamSetup'

const App = () => {
    let navigate = useNavigate()
    const [teams, setTeams] = useState([{id: '', attributes: {name: ''}}])

    useEffect(() => {
        axios
            .get(
                'https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/leagues?fields[0]=name&populate[logo][fields][0]=url&populate[teams][fields][0]=name&populate[teams][populate][logo][fields][0]=url&filters[id]=2'
            )
            .then(response => {
                setTeams(response.data.data[0].attributes.teams.data)
            })
    }, [])

    const [player, setPlayer] = useState(null)

    const [matchData, setMatchData] = useState({
        home: '',
        homeId: '',
        away: '',
        awayId: '',
        inning: 1,
        outs: 0,
        bottomHalf: false,
        awayTimeout: 2,
        homeTimeout: 2,
        awayChallenge: 2,
        homeChallenge: 2,
    })

    // Data de equipos
    const [homeRuns, setHomeRuns] = useState([
        {inning: 1, runs: ''},
        {inning: 2, runs: ''},
        {inning: 3, runs: ''},
        {inning: 4, runs: ''},
        {inning: 5, runs: ''},
        {inning: 6, runs: ''},
        {inning: 7, runs: ''},
        {inning: 8, runs: ''},
    ])
    const [awayRuns, setAwayRuns] = useState([
        {inning: 1, runs: 0},
        {inning: 2, runs: ''},
        {inning: 3, runs: ''},
        {inning: 4, runs: ''},
        {inning: 5, runs: ''},
        {inning: 6, runs: ''},
        {inning: 7, runs: ''},
        {inning: 8, runs: ''},
    ])

    const parsePlayers = (response, teamId, teamName) => {
        let output = []

        for (let player of response) {
            let p = {
                name: player.attributes.player.data.attributes.name,
                number: `${player.attributes.number}`,
                gender: player.attributes.player.data.attributes.gender,
                id: `${player.attributes.player.data.id}`,
                team: teamId,
                teamname: teamName,
                role: 0,
                hit: 0,
                double: 0,
                run: 0,
                homerun: 0,
                out: 0,
                strikeout: 0,
            }
            output.push(p)
        }

        return output
    }

    // Rosters de bateo y reserva
    const [designatedHitter, setDesignatedHitter] = useState(null)

    const [homeTeam, setHomeTeam] = useState()
    const [awayTeam, setAwayTeam] = useState()
    const [homeBatter, setHomeBatter] = useState([])
    const [awayBatter, setAwayBatter] = useState([])
    const [reserve, setReserve] = useState(null)

    const updateHomeTeam = result => {
        let movedItem,
            newBatter = homeBatter,
            newReserve = homeTeam

        if (result.source.droppableId === result.destination.droppableId) {
            if (result.source.droppableId === 'home_reserve') {
                movedItem = newReserve[result.source.index]
                newReserve.splice(result.source.index, 1)
                newReserve.splice(result.destination.index, 0, movedItem)
            } else {
                movedItem = newBatter[result.source.index]
                newBatter.splice(result.source.index, 1)
                newBatter.splice(result.destination.index, 0, movedItem)
            }
        } else {
            if (result.source.droppableId === 'home_reserve') {
                movedItem = newReserve[result.source.index]
                movedItem.role = 1
                newReserve.splice(result.source.index, 1)
                newBatter.splice(result.destination.index, 0, movedItem)
            } else {
                movedItem = newBatter[result.source.index]
                movedItem.role = 0
                newBatter.splice(result.source.index, 1)
                newReserve.splice(result.destination.index, 0, movedItem)
            }
        }
        setHomeTeam(newReserve)
        setHomeBatter(newBatter)
    }

    const updateAwayTeam = result => {
        let movedItem,
            newBatter = awayBatter,
            newReserve = awayTeam

        if (result.source.droppableId === result.destination.droppableId) {
            if (result.source.droppableId === 'away_reserve') {
                movedItem = newReserve[result.source.index]
                newReserve.splice(result.source.index, 1)
                newReserve.splice(result.destination.index, 0, movedItem)
            } else {
                movedItem = newBatter[result.source.index]
                newBatter.splice(result.source.index, 1)
                newBatter.splice(result.destination.index, 0, movedItem)
            }
        } else {
            if (result.source.droppableId === 'away_reserve') {
                movedItem = newReserve[result.source.index]
                movedItem.role = 1
                newReserve.splice(result.source.index, 1)
                newBatter.splice(result.destination.index, 0, movedItem)
            } else {
                movedItem = newBatter[result.source.index]
                movedItem.role = 0
                newBatter.splice(result.source.index, 1)
                newReserve.splice(result.destination.index, 0, movedItem)
            }
        }

        setAwayTeam(newReserve)
        setAwayBatter(newBatter)
    }

    const handleDesignatedHitter = player => {
        setPlayer(player)
        setDesignatedHitter(player)
    }

    const submitTeams = e => {
        e.preventDefault()
        axios
            .get(
                `https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/rosters?fields[0]=number&populate[player][fields][0]=name&populate[player][fields][1]=gender&populate[player][populate][profile][fields][0]=url&filters[team][id][$eq]=${matchData.homeId}&filters[league][id][$eq]=2`
            )
            .then(response => {
                setHomeTeam(
                    parsePlayers(
                        response.data.data,
                        matchData.homeId,
                        matchData.home
                    )
                )
            })

        axios
            .get(
                `https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/rosters?fields[0]=number&populate[player][fields][0]=name&populate[player][fields][1]=gender&populate[player][populate][profile][fields][0]=url&filters[team][id][$eq]=${matchData.awayId}&filters[league][id][$eq]=2`
            )
            .then(response => {
                setAwayTeam(
                    parsePlayers(
                        response.data.data,
                        matchData.awayId,
                        matchData.away
                    )
                )
            })
        if (awayTeam && homeTeam) {
            navigate('/setup')
        }
    }

    const handlePlayer = (player, reserves) => {
        setReserve(reserves)
        setPlayer(player)
    }

    const statUp = (currentPlayer, stat) => {
        console.log(player)
        if (stat === 'out' || stat === 'strikeout') {
            outUp()
        }
        if (stat === 'run' || stat === 'homerun') {
            runUp()
        }

        currentPlayer.role === 1
            ? currentPlayer.team === matchData.homeId
                ? setHomeBatter(
                      homeBatter.map(player => {
                          if (player.id === currentPlayer.id) {
                              return {
                                  ...currentPlayer,
                                  [stat]: currentPlayer[stat] + 1,
                              }
                          }
                          return player
                      })
                  )
                : setAwayBatter(
                      awayBatter.map(player => {
                          if (player.id === currentPlayer.id) {
                              if (stat === 'pateador' || stat === 'corredor') {
                              } else
                                  setPlayer({
                                      ...player,
                                      [stat]: player[stat] + 1,
                                  })
                              return {...player, [stat]: player[stat] + 1}
                          }
                          return player
                      })
                  )
            : currentPlayer.team === matchData.homeId
            ? setHomeTeam(
                  homeTeam.map(player => {
                      if (player.id === currentPlayer.id) {
                          return {
                              ...currentPlayer,
                              [stat]: currentPlayer[stat] + 1,
                          }
                      }
                      return player
                  })
              )
            : setAwayTeam(
                  awayTeam.map(player => {
                      if (player.id === currentPlayer.id) {
                          if (stat === 'pateador' || stat === 'corredor') {
                          } else
                              setPlayer({...player, [stat]: player[stat] + 1})
                          return {...player, [stat]: player[stat] + 1}
                      }
                      return player
                  })
              )
    }

    const statDown = (currentPlayer, stat) => {
        if (stat === 'out' || stat === 'strikeout') {
            outDown()
        }
        if (stat === 'run' || stat === 'homerun') {
            runDown()
        }

        currentPlayer.role === 1
            ? currentPlayer.team === matchData.homeId
                ? setHomeBatter(
                      homeBatter.map(player => {
                          if (player.id === currentPlayer.id) {
                              setPlayer({...player, [stat]: player[stat] - 1})
                              return {...player, [stat]: player[stat] - 1}
                          }
                          return player
                      })
                  )
                : setAwayBatter(
                      awayBatter.map(player => {
                          if (player.id === currentPlayer.id) {
                              setPlayer({...player, [stat]: player[stat] - 1})
                              return {...player, [stat]: player[stat] - 1}
                          }
                          return player
                      })
                  )
            : currentPlayer.team === matchData.homeId
            ? setHomeTeam(
                  homeTeam.map(player => {
                      if (player.id === currentPlayer.id) {
                          setPlayer({...player, [stat]: player[stat] - 1})
                          return {...player, [stat]: player[stat] - 1}
                      }
                      return player
                  })
              )
            : setAwayTeam(
                  awayTeam.map(player => {
                      if (player.id === currentPlayer.id) {
                          setPlayer({...player, [stat]: player[stat] - 1})
                          return {...player, [stat]: player[stat] - 1}
                      }
                      return player
                  })
              )
    }

    const outUp = () => {
        matchData.outs === 2
            ? matchData.bottomHalf === true
                ? setAwayRuns(
                      awayRuns.map(inning =>
                          inning.inning === matchData.inning + 1
                              ? {...inning, runs: 0}
                              : inning
                      )
                  )
                : setHomeRuns(
                      homeRuns.map(inning =>
                          inning.inning === matchData.inning
                              ? {...inning, runs: 0}
                              : inning
                      )
                  )
            : setHomeRuns(homeRuns)

        setMatchData(matchData =>
            matchData.outs === 2
                ? matchData.bottomHalf === true
                    ? {
                          ...matchData,
                          outs: 0,
                          inning: matchData.inning + 1,
                          bottomHalf: false,
                      }
                    : {...matchData, outs: 0, bottomHalf: true}
                : {...matchData, outs: matchData.outs + 1}
        )
    }

    const runUp = () => {
        matchData.bottomHalf === true
            ? setHomeRuns(
                  homeRuns.map(inning =>
                      inning.inning === matchData.inning
                          ? {...inning, runs: inning.runs + 1}
                          : inning
                  )
              )
            : setAwayRuns(
                  awayRuns.map(inning =>
                      inning.inning === matchData.inning
                          ? {...inning, runs: inning.runs + 1}
                          : inning
                  )
              )
    }

    const outDown = () => {
        matchData.outs === 0
            ? matchData.bottomHalf === true
                ? setMatchData({
                      ...matchData,
                      outs: 2,
                      bottomHalf: false,
                  })
                : setMatchData({
                      ...matchData,
                      outs: 2,
                      bottomHalf: true,
                      inning: matchData.inning - 1,
                  })
            : setMatchData({...matchData, outs: matchData.outs - 1})
    }

    const runDown = () => {
        matchData.bottomHalf === true
            ? setHomeRuns(
                  homeRuns.map(inning =>
                      inning.inning === matchData.inning
                          ? inning.runs > 0
                              ? {...inning, runs: inning.runs - 1}
                              : inning
                          : inning
                  )
              )
            : setAwayRuns(
                  awayRuns.map(inning =>
                      inning.inning === matchData.inning
                          ? inning.runs > 0
                              ? {...inning, runs: inning.runs - 1}
                              : inning
                          : inning
                  )
              )
    }

    const save = () => {
        const data = homeTeam.concat(awayTeam)
        const filename = `${matchData.home} vs ${matchData.away}`
        const exportType = 'xls'
        const fields = [
            'name',
            'number',
            'teamname',
            'hit',
            'double',
            'run',
            'homerun',
            'out',
            'strikeout',
            'pateador',
            'corredor',
        ]
        exportFromJSON({data, filename, fields, exportType})
    }

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    exact
                    element={
                        <TeamSelect
                            setMatchData={setMatchData}
                            matchData={matchData}
                            submitTeams={submitTeams}
                            teams={teams}
                        />
                    }
                />
                <Route
                    path="/setup"
                    exact
                    element={
                        <TeamSetup
                            teamNameHome={matchData.home}
                            homeTeam={homeTeam}
                            homeTeamBatter={homeBatter}
                            updateHomeTeam={updateHomeTeam}
                            teamNameAway={matchData.away}
                            awayTeam={awayTeam}
                            awayTeamBatter={awayBatter}
                            updateAwayTeam={updateAwayTeam}
                        />
                    }
                />

                <Route
                    path="/tracker"
                    exact
                    element={
                        <GameTracker
                            designatedHitter={designatedHitter}
                            awayTeamBatter={awayBatter}
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            homeTeamBatter={homeBatter}
                            matchData={matchData}
                            setMatchData={setMatchData}
                            homeRuns={homeRuns}
                            awayRuns={awayRuns}
                            onHandlePlayer={handlePlayer}
                        />
                    }
                />
            </Routes>
            <Modal
                open={player !== null}
                onClose={() => setPlayer(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <ModalStats
                    reserve={reserve}
                    player={player}
                    statUp={statUp}
                    statDown={statDown}
                    onHandleDesignatedHitter={handleDesignatedHitter}
                />
            </Modal>
        </>
    )
}

export default App
