import {useState, useEffect} from 'react'
import './App.css'
import Modal from '@mui/material/Modal'
import {Routes, Route, useNavigate} from 'react-router-dom'
import exportFromJSON from 'export-from-json'
import axios from 'axios'

// Components
import GameTracker from './components/GameTracker'
import ModalStats from './components/ModalStats'
// import TeamSelect from './components/TeamSelect'
import TeamSetup from './components/TeamSetup'
import Appbar from './components/Appbar'
import LeagueSelect from './components/LeagueSelect'
import MatchSelect from './components/MatchSelect'

const App = () => {
    let navigate = useNavigate()
    const defaultMatchData = {
        id: '',
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
        awayDesignated: 2,
        homeDesignated: 2,
    }

    const defaultRuns = [
        {inning: 1, runs: 0},
        {inning: 2, runs: ''},
        {inning: 3, runs: ''},
        {inning: 4, runs: ''},
        {inning: 5, runs: ''},
        {inning: 6, runs: ''},
        {inning: 7, runs: ''},
        {inning: 8, runs: ''},
    ]

    // const [teams, setTeams] = useState([])
    const [leagues, setLeagues] = useState([])
    const [matchList, setMatchList] = useState([])

    const [existingGame, setExistingGame] = useState(() => {
        const localdata = localStorage.getItem('existingGame')
        return localdata ? true : false
    })

    const [currentPlayer, setCurrentPlayer] = useState(() => {
        const localdata = localStorage.getItem('currentPlayer')
        return localdata ? JSON.parse(localdata) : null
    })
    const [currentPitcher, setCurrentPitcher] = useState(() => {
        const localdata = localStorage.getItem('currentPitcher')
        return localdata ? JSON.parse(localdata) : null
    })

    const [matchData, setMatchData] = useState(() => {
        const localdata = localStorage.getItem('matchData')
        return localdata ? JSON.parse(localdata) : defaultMatchData
    })

    // Data de equipos
    const [homeRuns, setHomeRuns] = useState(() => {
        const localdata = localStorage.getItem('homeRuns')
        return localdata ? JSON.parse(localdata) : defaultRuns
    })

    const [awayRuns, setAwayRuns] = useState(() => {
        const localdata = localStorage.getItem('awayRuns')
        return localdata ? JSON.parse(localdata) : defaultRuns
    })

    const parsePlayers = async (response, teamId, teamName) => {
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
                triple: 0,
                run: 0,
                homerun: 0,
                out: 0,
                strikeout: 0,
                basebola: 0,
                errores: 0,
                impulsadas: 0,
                hitspermitidos: 0,
                enfrentados: 0,
                carreraspermitidas: 0,
                bbconcedida: 0,
            }
            output.push(p)
        }

        return output
    }

    // Rosters de bateo y reserva
    const [designatedHitter, setDesignatedHitter] = useState(() => {
        const localdata = localStorage.getItem('designatedHitter')
        return localdata ? JSON.parse(localdata) : null
    })

    const [homeTeamFull, setHomeTeamFull] = useState(() => {
        const localdata = localStorage.getItem('homeTeamFull')
        return localdata ? JSON.parse(localdata) : []
    })

    const [awayTeamFull, setAwayTeamFull] = useState(() => {
        const localdata = localStorage.getItem('awayTeamFull')
        return localdata ? JSON.parse(localdata) : []
    })

    const [homeBatter, setHomeBatter] = useState(() => {
        const localdata = localStorage.getItem('homeBatter')
        return localdata ? JSON.parse(localdata) : []
    })

    const [awayBatter, setAwayBatter] = useState(() => {
        const localdata = localStorage.getItem('awayBatter')
        return localdata ? JSON.parse(localdata) : []
    })

    const [homeReserve, setHomeReserve] = useState(() => {
        const localdata = localStorage.getItem('homeReserve')
        return localdata ? JSON.parse(localdata) : []
    })

    const [awayReserve, setAwayReserve] = useState(() => {
        const localdata = localStorage.getItem('awayReserve')
        return localdata ? JSON.parse(localdata) : []
    })

    const [batterList, setBatterList] = useState(() => {
        const localdata = localStorage.getItem('batterList')
        return localdata ? JSON.parse(localdata) : null
    })

    const [fieldList, setFieldList] = useState(() => {
        const localdata = localStorage.getItem('fieldList')
        return localdata ? JSON.parse(localdata) : null
    })

    const [homeIndex, setHomeIndex] = useState(() => {
        const localdata = localStorage.getItem('homeIndex')
        return localdata ? JSON.parse(localdata) : 0
    })

    const [awayIndex, setAwayIndex] = useState(() => {
        const localdata = localStorage.getItem('awayIndex')
        return localdata ? JSON.parse(localdata) : 0
    })

    useEffect(() => {
        axios
            .get(
                'https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/leagues?fields[0]=name&populate[logo][fields][0]=url'
            )
            .then(response => {
                setLeagues(response.data.data)
            })
    }, [])

    useEffect(() => {
        localStorage.setItem('matchData', JSON.stringify(matchData))
    }, [matchData])

    useEffect(() => {
        localStorage.setItem('homeRuns', JSON.stringify(homeRuns))
    }, [homeRuns])

    useEffect(() => {
        localStorage.setItem('awayRuns', JSON.stringify(awayRuns))
    }, [awayRuns])

    useEffect(() => {
        localStorage.setItem('awayTeamFull', JSON.stringify(awayTeamFull))
    }, [awayTeamFull])

    useEffect(() => {
        localStorage.setItem('homeTeamFull', JSON.stringify(homeTeamFull))
    }, [homeTeamFull])

    useEffect(() => {
        localStorage.setItem('homeBatter', JSON.stringify(homeBatter))
    }, [homeBatter])

    useEffect(() => {
        localStorage.setItem('homeReserve', JSON.stringify(homeReserve))
    }, [homeReserve])

    useEffect(() => {
        localStorage.setItem('awayBatter', JSON.stringify(awayBatter))
    }, [awayBatter])

    useEffect(() => {
        localStorage.setItem('awayReserve', JSON.stringify(awayReserve))
    }, [awayReserve])

    useEffect(() => {
        localStorage.setItem(
            'designatedHitter',
            JSON.stringify(designatedHitter)
        )
    }, [designatedHitter])

    useEffect(() => {
        localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer))
    }, [currentPlayer])

    useEffect(() => {
        localStorage.setItem('currentPitcher', JSON.stringify(currentPitcher))
    }, [currentPitcher])

    useEffect(() => {
        localStorage.setItem('existingGame', JSON.stringify(existingGame))
    }, [existingGame])

    useEffect(() => {
        localStorage.setItem('homeIndex', JSON.stringify(homeIndex))
    }, [homeIndex])

    useEffect(() => {
        localStorage.setItem('awayIndex', JSON.stringify(awayIndex))
    }, [awayIndex])

    const updateHomeTeam = result => {
        let movedItem,
            newBatter = [...homeBatter],
            newReserve = [...homeReserve]

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
        setHomeReserve(newReserve)
        setHomeBatter(newBatter)
    }

    const updateAwayTeam = result => {
        let movedItem,
            newBatter = [...awayBatter],
            newReserve = [...awayReserve]

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
        setAwayReserve(newReserve)
        setAwayBatter(newBatter)
    }

    const handleCurrentPitcher = player => {
        setCurrentPitcher(player)
    }

    const handleDesignatedHitter = player => {
        if (player) {
            if (matchData.bottomHalf === true) {
                if (matchData.homeDesignated > 0) {
                    setCurrentPlayer(player)
                    setDesignatedHitter(player)
                    setMatchData({
                        ...matchData,
                        homeDesignated: matchData.homeDesignated - 1,
                    })
                } else {
                    alert('No quedan emergentes')
                }
            } else {
                if (matchData.awayDesignated > 0) {
                    setCurrentPlayer(player)
                    setDesignatedHitter(player)
                    setMatchData({
                        ...matchData,
                        awayDesignated: matchData.awayDesignated - 1,
                    })
                } else {
                    alert('No quedan emergentes')
                }
            }
        }
    }

    const submitTeams = async e => {
        let response1 = await axios.get(
            `https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/rosters?fields[0]=number&populate[player][fields][0]=name&populate[player][fields][1]=gender&populate[player][populate][profile][fields][0]=url&filters[team][id][$eq]=${matchData.homeId}&filters[league][id][$eq]=3`
        )

        let team1 = await parsePlayers(
            response1.data.data,
            matchData.homeId,
            matchData.home
        )

        let response2 = await axios.get(
            `https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/rosters?fields[0]=number&populate[player][fields][0]=name&populate[player][fields][1]=gender&populate[player][populate][profile][fields][0]=url&filters[team][id][$eq]=${matchData.awayId}&filters[league][id][$eq]=3`
        )

        let team2 = await parsePlayers(
            response2.data.data,
            matchData.awayId,
            matchData.away
        )

        setHomeTeamFull([...team1])
        setHomeReserve([...team1])

        setAwayTeamFull([...team2])
        setAwayReserve([...team2])
        localStorage.setItem('awayTeamFull', JSON.stringify([...team2]))
        localStorage.setItem('homeTeamFull', JSON.stringify([...team1]))
        setExistingGame(true)
        navigate('/setup')
    }

    const handlePlayer = (player, batters, fielders) => {
        setFieldList(fielders)
        setBatterList(batters)
        setCurrentPlayer(player)
    }

    const pitcherStatUp = pstat => {
        if (pstat === 'out' || pstat === 'strikeout') {
            currentPitcher.role === 1
                ? currentPitcher.team === matchData.homeId
                    ? setHomeBatter(
                          homeBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      enfrentados: player.enfrentados + 1,
                                  }
                              }
                              return player
                          })
                      )
                    : setAwayBatter(
                          awayBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      enfrentados: player.enfrentados + 1,
                                  }
                              }
                              return player
                          })
                      )
                : currentPitcher.team === matchData.homeId
                ? setHomeReserve(
                      homeReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  enfrentados: player.enfrentados + 1,
                              }
                          }
                          return player
                      })
                  )
                : setAwayReserve(
                      awayReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  enfrentados: player.enfrentados + 1,
                              }
                          }
                          return player
                      })
                  )
        } else if (pstat === 'run') {
            currentPitcher.role === 1
                ? currentPitcher.team === matchData.homeId
                    ? setHomeBatter(
                          homeBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      carreraspermitidas:
                                          player.carreraspermitidas + 1,
                                  }
                              }
                              return player
                          })
                      )
                    : setAwayBatter(
                          awayBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      carreraspermitidas:
                                          player.carreraspermitidas + 1,
                                  }
                              }
                              return player
                          })
                      )
                : currentPitcher.team === matchData.homeId
                ? setHomeReserve(
                      homeReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  enfrentados: player.carreraspermitidas + 1,
                              }
                          }
                          return player
                      })
                  )
                : setAwayReserve(
                      awayReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  enfrentados: player.carreraspermitidas + 1,
                              }
                          }
                          return player
                      })
                  )
        } else {
            currentPitcher.role === 1
                ? currentPitcher.team === matchData.homeId
                    ? setHomeBatter(
                          homeBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      [pstat]: player[pstat] + 1,
                                      enfrentados: player.enfrentados + 1,
                                  }
                              }
                              return player
                          })
                      )
                    : setAwayBatter(
                          awayBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      [pstat]: player[pstat] + 1,
                                      enfrentados: player.enfrentados + 1,
                                  }
                              }
                              return player
                          })
                      )
                : currentPitcher.team === matchData.homeId
                ? setHomeReserve(
                      homeReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  [pstat]: player[pstat] + 1,
                                  enfrentados: player.enfrentados + 1,
                              }
                          }
                          return player
                      })
                  )
                : setAwayReserve(
                      awayReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  [pstat]: player[pstat] + 1,
                                  enfrentados: player.enfrentados + 1,
                              }
                          }
                          return player
                      })
                  )
        }
    }

    const pitcherStatDown = pstat => {
        if (pstat === 'out' || pstat === 'strikeout') {
            currentPitcher.role === 1
                ? currentPitcher.team === matchData.homeId
                    ? setHomeBatter(
                          homeBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      enfrentados: player.enfrentados - 1,
                                  }
                              }
                              return player
                          })
                      )
                    : setAwayBatter(
                          awayBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      enfrentados: player.enfrentados - 1,
                                  }
                              }
                              return player
                          })
                      )
                : currentPitcher.team === matchData.homeId
                ? setHomeReserve(
                      homeReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  enfrentados: player.enfrentados - 1,
                              }
                          }
                          return player
                      })
                  )
                : setAwayReserve(
                      awayReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  enfrentados: player.enfrentados - 1,
                              }
                          }
                          return player
                      })
                  )
        } else if (pstat === 'run') {
            currentPitcher.role === 1
                ? currentPitcher.team === matchData.homeId
                    ? setHomeBatter(
                          homeBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      carreraspermitidas:
                                          player.carreraspermitidas - 1,
                                  }
                              }
                              return player
                          })
                      )
                    : setAwayBatter(
                          awayBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      carreraspermitidas:
                                          player.carreraspermitidas - 1,
                                  }
                              }
                              return player
                          })
                      )
                : currentPitcher.team === matchData.homeId
                ? setHomeReserve(
                      homeReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  enfrentados: player.carreraspermitidas - 1,
                              }
                          }
                          return player
                      })
                  )
                : setAwayReserve(
                      awayReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  enfrentados: player.carreraspermitidas - 1,
                              }
                          }
                          return player
                      })
                  )
        } else {
            currentPitcher.role === 1
                ? currentPitcher.team === matchData.homeId
                    ? setHomeBatter(
                          homeBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      [pstat]: player[pstat] - 1,
                                      enfrentados: player.enfrentados - 1,
                                  }
                              }
                              return player
                          })
                      )
                    : setAwayBatter(
                          awayBatter.map(player => {
                              if (player.id === currentPitcher.id) {
                                  return {
                                      ...player,
                                      [pstat]: player[pstat] - 1,
                                      enfrentados: player.enfrentados - 1,
                                  }
                              }
                              return player
                          })
                      )
                : currentPitcher.team === matchData.homeId
                ? setHomeReserve(
                      homeReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  [pstat]: player[pstat] - 1,
                                  enfrentados: player.enfrentados - 1,
                              }
                          }
                          return player
                      })
                  )
                : setAwayReserve(
                      awayReserve.map(player => {
                          if (player.id === currentPitcher.id) {
                              return {
                                  ...player,
                                  [pstat]: player[pstat] - 1,
                                  enfrentados: player.enfrentados - 1,
                              }
                          }
                          return player
                      })
                  )
        }
    }

    const statUp = (currentPlayer, stat, replace) => {
        if (stat === 'out' || stat === 'strikeout') {
            outUp()
        }
        if (stat === 'run' || stat === 'homerun') {
            runUp()
        }

        if (stat === 'basebola') {
            pitcherStatUp('bbconcedida')
        }

        if (stat === 'run' || stat === 'out' || stat === 'strikeout') {
            pitcherStatUp(stat)
        }

        if (stat === 'homerun') {
            pitcherStatUp('carreraspermitidas')
        }

        if (stat === 'hit' || stat === 'double' || stat === 'triple') {
            pitcherStatUp('hitspermitidos')
        }

        if (stat !== 'run' && stat !== 'impulsadas') {
            if (matchData.bottomHalf === true) {
                homeIndex + 1 < homeBatter.length
                    ? setHomeIndex(homeIndex + 1)
                    : setHomeIndex(0)
            } else {
                awayIndex + 1 < homeBatter.length
                    ? setAwayIndex(awayIndex + 1)
                    : setAwayIndex(0)
            }
        }
        console.log(currentPlayer)
        currentPlayer.role === 1
            ? currentPlayer.team === matchData.homeId
                ? setHomeBatter(
                      homeBatter.map(player => {
                          if (player.id === currentPlayer.id) {
                              if (!replace) {
                                  setCurrentPlayer({
                                      ...player,
                                      [stat]: player[stat] + 1,
                                  })
                              }
                              return {...player, [stat]: player[stat] + 1}
                          }
                          return player
                      })
                  )
                : setAwayBatter(
                      awayBatter.map(player => {
                          if (player.id === currentPlayer.id) {
                              if (!replace) {
                                  setCurrentPlayer({
                                      ...player,
                                      [stat]: player[stat] + 1,
                                  })
                              }
                              return {...player, [stat]: player[stat] + 1}
                          }
                          return player
                      })
                  )
            : currentPlayer.team === matchData.homeId
            ? setHomeReserve(
                  homeReserve.map(player => {
                      if (player.id === currentPlayer.id) {
                          if (!replace) {
                              setCurrentPlayer({
                                  ...player,
                                  [stat]: player[stat] + 1,
                              })
                          }
                          return {...player, [stat]: player[stat] + 1}
                      }
                      return player
                  })
              )
            : setAwayReserve(
                  awayReserve.map(player => {
                      if (player.id === currentPlayer.id) {
                          if (!replace) {
                              setCurrentPlayer({
                                  ...player,
                                  [stat]: player[stat] + 1,
                              })
                          }
                          return {...player, [stat]: player[stat] + 1}
                      }
                      return player
                  })
              )
    }

    const statDown = (currentPlayer, stat, replace) => {
        if (stat === 'out' || stat === 'strikeout') {
            outDown()
        }

        if (stat === 'run' || stat === 'homerun') {
            runDown()
        }

        if (stat === 'basebola') {
            pitcherStatDown('bbconcedida')
        }

        if (stat === 'run' || stat === 'out' || stat === 'strikeout') {
            pitcherStatDown(stat)
        }

        if (stat === 'homerun') {
            pitcherStatDown('carreraspermitidas')
        }

        if (stat === 'hit' || stat === 'double' || stat === 'triple') {
            pitcherStatDown('hitspermitidos')
        }

        if (stat !== 'run' && stat !== 'impulsadas') {
            if (matchData.bottomHalf === true) {
                homeIndex === 0
                    ? setHomeIndex(homeBatter.length - 1)
                    : setHomeIndex(homeIndex - 1)
            } else {
                awayIndex === 0
                    ? setAwayIndex(awayBatter.length - 1)
                    : setAwayIndex(awayIndex - 1)
            }
        }

        currentPlayer.role === 1
            ? currentPlayer.team === matchData.homeId
                ? setHomeBatter(
                      homeBatter.map(player => {
                          if (player.id === currentPlayer.id) {
                              if (!replace) {
                                  setCurrentPlayer({
                                      ...player,
                                      [stat]: player[stat] - 1,
                                  })
                              }
                              return {...player, [stat]: player[stat] - 1}
                          }
                          return player
                      })
                  )
                : setAwayBatter(
                      awayBatter.map(player => {
                          if (player.id === currentPlayer.id) {
                              if (!replace) {
                                  setCurrentPlayer({
                                      ...player,
                                      [stat]: player[stat] - 1,
                                  })
                              }
                              return {...player, [stat]: player[stat] - 1}
                          }
                          return player
                      })
                  )
            : currentPlayer.team === matchData.homeId
            ? setHomeReserve(
                  homeReserve.map(player => {
                      if (player.id === currentPlayer.id) {
                          if (!replace) {
                              setCurrentPlayer({
                                  ...player,
                                  [stat]: player[stat] - 1,
                              })
                          }
                          return {...player, [stat]: player[stat] - 1}
                      }
                      return player
                  })
              )
            : setAwayReserve(
                  awayReserve.map(player => {
                      if (player.id === currentPlayer.id) {
                          if (!replace) {
                              setCurrentPlayer({
                                  ...player,
                                  [stat]: player[stat] - 1,
                              })
                          }
                          return {...player, [stat]: player[stat] - 1}
                      }
                      return player
                  })
              )
    }

    const outUp = () => {
        if (matchData.outs === 2) {
            setCurrentPitcher(null)
            if (matchData.bottomHalf === true) {
                setAwayRuns(
                    awayRuns.map(inning =>
                        inning.inning === matchData.inning + 1
                            ? {...inning, runs: 0}
                            : inning
                    )
                )
            } else {
                setHomeRuns(
                    homeRuns.map(inning =>
                        inning.inning === matchData.inning
                            ? {...inning, runs: 0}
                            : inning
                    )
                )
            }
        }
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
    const upload = () => {
        const playerData = homeBatter.concat(
            homeReserve.concat(awayBatter.concat(awayReserve))
        )
        
            const home = homeRuns.map((inning)=>{ return inning.runs})
            const away = awayRuns.map((inning)=>{ return inning.runs})
            let numOr0 = n => isNaN(n) ? 0 : n
            const team_a_total = home.reduce((a, b) => 
            numOr0(a) + numOr0(b))
            const team_b_total = away.reduce((a, b) => 
            numOr0(a) + numOr0(b))


        let matchdataupload = {data:{
            team_a_score: team_a_total,
            team_b_score: team_b_total,
            team_a_runs: home ,
            team_b_runs: away,
            completed: true,
        }

        }
        let output = []

        for (let player of playerData) {
            let p = {data:{
                game: matchData.id,
                player: player.id,
                hit: player.hit,
                double: player.double,
                triple: player.triple,
                run: player.run,
                homerun: player.homerun,
                out: player.out,
                strikeout: player.strikeout,
                basebola: player.basebola,
                errores: player.errores,
                impulsadas: player.impulsadas,
                hitspermitidos: player.hitspermitidos,
                enfrentados: player.enfrentados,
                carreraspermitidas: player.carreraspermitidas,
                bbconcedida: player.bbconcedida,
            }}
            output.push(p)
        }
        output.map(player => {
            axios
                .post(
                    `https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/stats`,
                    player
                )
                .then(function (response) {
                    console.log(response)
                })
                return player
        })
        console.log(matchdataupload)
        axios
            .put(
                `https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/games/${matchData.id}`,
                matchdataupload
            )
            .then(function (response) {
                console.log(response)
            })
    }

    const save = () => {
        const data = homeBatter.concat(
            homeReserve.concat(awayBatter.concat(awayReserve))
        )
        const filename = `${matchData.home} vs ${matchData.away}`
        const exportType = 'xls'
        const fields = [
            'name',
            'number',
            'teamname',
            'hit',
            'double',
            'triple',
            'run',
            'homerun',
            'out',
            'strikeout',
            'basebola',
            'errores',
            'impulsadas',
            'hitspermitidos',
            'enfrentados',
            'carreraspermitidas',
            'bbconcedida',
        ]
        exportFromJSON({data, filename, fields, exportType})
    }

    const reset = () => {
        localStorage.clear()
        setMatchData(defaultMatchData)
        setHomeBatter([])
        setHomeReserve([])
        setHomeTeamFull([])
        setAwayBatter([])
        setAwayTeamFull([])
        setAwayReserve([])
        setHomeRuns(defaultRuns)
        setAwayRuns(defaultRuns)
        setDesignatedHitter(null)
        setCurrentPitcher(null)
        setCurrentPlayer(null)
        setExistingGame(false)
        setHomeIndex(0)
        setAwayIndex(0)
    }

    return (
        <>
            <Appbar reset={reset} existing={existingGame} />
            <Routes>
                <Route
                    path="/"
                    exact
                    element={
                        <LeagueSelect
                            leagues={leagues}
                            setMatchList={setMatchList}
                            navigate={navigate}
                        />
                    }
                />
                <Route
                    path="/match-select"
                    exact
                    element={
                        <MatchSelect
                            setMatchData={setMatchData}
                            // setTeams={setTeams}
                            matchData={matchData}
                            matchList={matchList}
                            navigate={navigate}
                            submitTeams={submitTeams}
                        />
                    }
                />
                <Route
                    path="/setup"
                    exact
                    element={
                        <TeamSetup
                            teamNameHome={matchData.home}
                            homeReserve={homeReserve}
                            homeBatter={homeBatter}
                            updateHomeTeam={updateHomeTeam}
                            teamNameAway={matchData.away}
                            awayReserve={awayReserve}
                            awayBatter={awayBatter}
                            updateAwayTeam={updateAwayTeam}
                        />
                    }
                />

                <Route
                    path="/tracker"
                    exact
                    element={
                        <GameTracker
                            save={save}
                            designatedHitter={designatedHitter}
                            awayBatter={awayBatter}
                            awayReserve={awayReserve}
                            awayTeam={awayTeamFull}
                            homeTeam={homeTeamFull}
                            homeBatter={homeBatter}
                            homeReserve={homeReserve}
                            matchData={matchData}
                            setMatchData={setMatchData}
                            homeRuns={homeRuns}
                            awayRuns={awayRuns}
                            onHandlePlayer={handlePlayer}
                            currentPitcher={currentPitcher}
                            onHandlePitcher={handleCurrentPitcher}
                            homeIndex={homeIndex}
                            awayIndex={awayIndex}
                            upload={upload}
                        />
                    }
                />
            </Routes>
            <Modal
                open={currentPlayer !== null}
                onClose={() => setCurrentPlayer(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <ModalStats
                    batterList={batterList}
                    fieldList={fieldList}
                    currentPlayer={currentPlayer}
                    statUp={statUp}
                    statDown={statDown}
                    onHandleDesignatedHitter={handleDesignatedHitter}
                />
            </Modal>
        </>
    )
}
export default App
