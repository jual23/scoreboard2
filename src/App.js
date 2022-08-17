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
    const [teams, setTeams] = useState([])

    useEffect(() => {
        axios
            .get(
                'https://pmalgs-kickball-api-r2e5t.ondigitalocean.app/api/leagues?fields[0]=name&populate[logo][fields][0]=url&populate[teams][fields][0]=name&populate[teams][populate][logo][fields][0]=url&filters[id]=3'
            )
            .then(response => {
                setTeams(response.data.data[0].attributes.teams.data)
            })
    }, [])

    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [currentPitcher, setCurrentPitcher] = useState(null)

    const [matchData, setMatchData] = useState(() => {
        const localdata = localStorage.getItem("matchData")
        return localdata ? JSON.parse(localdata) :     
    {
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
    }})

    // Data de equipos
    const [homeRuns, setHomeRuns] = useState(() => {
        const localdata = localStorage.getItem("homeRuns")
        return localdata ? JSON.parse(localdata) :  
        [
        {inning: 1, runs: ''},
        {inning: 2, runs: ''},
        {inning: 3, runs: ''},
        {inning: 4, runs: ''},
        {inning: 5, runs: ''},
        {inning: 6, runs: ''},
        {inning: 7, runs: ''},
        {inning: 8, runs: ''},
    ]})

    const [awayRuns, setAwayRuns] = useState(() => {
        const localdata = localStorage.getItem("awayRuns")
        return localdata ? JSON.parse(localdata) : 
        [
        {inning: 1, runs: 0},
        {inning: 2, runs: ''},
        {inning: 3, runs: ''},
        {inning: 4, runs: ''},
        {inning: 5, runs: ''},
        {inning: 6, runs: ''},
        {inning: 7, runs: ''},
        {inning: 8, runs: ''},
    ]})

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
        const localdata = localStorage.getItem("designatedHitter")
        return localdata ? JSON.parse(localdata) : null})
        
    const [homeTeamFull, setHomeTeamFull] = useState(() => {
        const localdata = localStorage.getItem("homeTeamFull")
        return localdata ? JSON.parse(localdata) : []})

    const [awayTeamFull, setAwayTeamFull] = useState(() => {
        const localdata = localStorage.getItem("awayTeamFull")
        return localdata ? JSON.parse(localdata) : []})

    const [homeBatter, setHomeBatter] = useState(() => {
        const localdata = localStorage.getItem("homeBatter")
        return localdata ? JSON.parse(localdata) : []})

    const [awayBatter, setAwayBatter] = useState(() => {
        const localdata = localStorage.getItem("awayBatter")
        return localdata ? JSON.parse(localdata) : []})

    const [homeReserve, setHomeReserve] = useState(() => {
        const localdata = localStorage.getItem("homeReserve")
        return localdata ? JSON.parse(localdata) : []})

    const [awayReserve, setAwayReserve] = useState(() => {
        const localdata = localStorage.getItem("awayReserve")
        return localdata ? JSON.parse(localdata) : []})

    const [batterList, setBatterList] = useState(() => {
        const localdata = localStorage.getItem("batterList")
        return localdata ? JSON.parse(localdata) : null})

    const [fieldList, setFieldList] = useState(() => {
        const localdata = localStorage.getItem("fieldList")
        return localdata ? JSON.parse(localdata) : null})


    useEffect(() => {
        console.log("cambia matchdata");
        localStorage.setItem("matchData", JSON.stringify(matchData));
      }, [matchData]);

      useEffect(() => {
        console.log("cambia carreras de casa");
        localStorage.setItem("homeRuns", JSON.stringify(homeRuns));
      }, [homeRuns]);

      useEffect(() => {
        console.log("cambia carreras de visitante");
        localStorage.setItem("awayRuns", JSON.stringify(awayRuns));
      }, [awayRuns]);
      
      useEffect(() => {
        console.log("cambia jugadores de visitante");
        localStorage.setItem("awayTeamFull", JSON.stringify(awayTeamFull));
      }, [awayTeamFull]);

      useEffect(() => {
        console.log("cambia jugadores de casa");
        localStorage.setItem("homeTeamFull", JSON.stringify(homeTeamFull));
      }, [homeTeamFull]);

      useEffect(() => {
        console.log("cambia bateadores de casa");
        localStorage.setItem("homeBatter", JSON.stringify(homeBatter));
      }, [homeBatter]);


      useEffect(() => {
        console.log("cambia reserva de casa");
        localStorage.setItem("homeReserve", JSON.stringify(homeReserve));
      }, [homeReserve]);

    
      useEffect(() => {
        console.log("cambia bateadores de visitante");
        localStorage.setItem("awayBatter", JSON.stringify(awayBatter));
      }, [awayBatter]);

      useEffect(() => {
        console.log("cambia reserva de visitante");
        localStorage.setItem("awayReserve", JSON.stringify(awayReserve));
      }, [awayReserve]); 

    const updateHomeTeam = result => {
        let movedItem,
            newBatter = homeBatter,
            newReserve = homeReserve

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
            newBatter = awayBatter,
            newReserve = awayReserve

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
        console.log(player)
        setCurrentPitcher(player)
    }

    const handleDesignatedHitter = player => {
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

    const submitTeams = async e => {
        console.log('entra a submit teams')
        e.preventDefault()
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
        console.log(team1)
        console.log(typeof team1)
        setHomeTeamFull([...team1])
        setHomeReserve([...team1])

        setAwayTeamFull([...team2])
        setAwayReserve([...team2])
        localStorage.setItem("awayTeamFull", JSON.stringify(awayTeamFull));
        localStorage.setItem("homeTeamFull", JSON.stringify(homeTeamFull));
        navigate('/setup')
    }

    const handlePlayer = (player, batters, fielders) => {
        setFieldList(fielders)
        setBatterList(batters)
        setCurrentPlayer(player)
    }

    const pitcherStatUp = pstat => {
        currentPitcher.role === 1
            ? currentPitcher.team === matchData.homeId
                ? setHomeBatter(
                      homeBatter.map(player => {
                          if (player.id === currentPlayer.id) {
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
                          if (player.id === currentPlayer.id) {
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
                          console.log('1')
                          player = {
                              ...player,
                              [pstat]: player[pstat] + 1,
                              enfrentados: player.enfrentados + 1,
                          }
                          return player
                      }
                      return player
                  })
              )
    }

    const pitcherStatDown = pstat => {
        currentPitcher.role === 1
            ? currentPitcher.team === matchData.homeId
                ? setHomeBatter(
                      homeBatter.map(player => {
                          if (player.id === currentPlayer.id) {
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
                          if (player.id === currentPlayer.id) {
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

        if (stat === 'run' || stat === 'homerun') {
            pitcherStatUp('carreraspermitidas')
        }

        if (stat === 'hit' || stat === 'double' || stat==='triple') {
            pitcherStatUp('hitspermitidos')
        }

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

        if (stat === 'run' || stat === 'homerun') {
            pitcherStatDown('carreraspermitidas')
        }

        if (stat === 'hit' || stat === 'double' || stat==='triple') {
            pitcherStatDown('hitspermitidos')
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
