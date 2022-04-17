import { useState, useEffect } from "react";
import ClubList from "./club";
import ClubNightList from "./clubNight";
import ClubGameList from "./clubGame";
import ClubPlayerList from "./clubPlayer";
import { getTotals } from "./getTotals";
import { getClubs, getPlayers, getClubNights, getClubGames } from "./api";

const ScrabbleClub = () => {
    const [showing, setShowing] = useState('Loading');
    const [clubs, setClubs] = useState([]);
    const [players, setPlayers] = useState([]);
    const [clubNights, setClubNights] = useState([]);
    const [clubNightsForClub, setClubNightsForClub] = useState([]);
    const [clubGames, setClubGames] = useState([]);
    const [clubGamesForClubNight, setClubGamesForClubNight] = useState([]);
    const [clubNightsClubId, setClubNightsClubId] = useState(-1);
    const [clubNightsClubName, setClubNightsClubName] = useState('No club selected');
    const [clubGamesClubNightId, setClubGamesClubNightId] = useState(-1);
    const [clubGamesClubNightDate, setClubGamesClubNightDate] = useState('No club night selected');
    const [clubGamesClubId, setClubGamesClubId] = useState(-1);
    const [clubGamesClubName, setClubGamesClubName] = useState('No club selected');
    const [totals, setTotals] = useState([]);
    const getClubNightsForClub = (clubid) => {
        if (clubNightsClubId !== clubid) {
            for (let index = 0; index < clubs.length; index++) {
                const club = clubs[index];
                if (club.id === clubid) {
                    let jdata = clubNights.filter(n => {return n.clubId === clubid;});
                    jdata.sort((a,b) => a.date > b.date ? -1 : 1);
                    setClubNightsForClub(jdata);
                    setClubNightsClubName(club.name);
                    setClubNightsClubId(club.id);
                }
            }   
        }
        setShowing('ClubNights');
    };

    const getClubGamesByClubId = (clubid) => {
        if (clubGamesClubId !== clubid || true) {
            for (let index = 0; index < clubs.length; index++) {
                let club = clubs[index];
                if (club.id === clubid) {
                    let jdata = clubGames.filter(g => {return g.clubId === clubid;});
                    // Add player names
                    for (let index2 = 0; index2 < jdata.length; index2++) {
                        let game = jdata[index2];
                        for (let index3 = 0; index3 < players.length; index3++) {
                            let player = players[index3];
                            if (game.playerId === player.id) {
                                game.playerName = player.name;
                            }
                            if (game.opponentId === player.id) {
                                game.opponentName = player.name;
                            }
                        }
                    }
                    let newTotals = getTotals(jdata);
                    setClubGamesClubName(club.name);
                    setClubGamesClubId(club.id);
                    setTotals(newTotals);
                }
            }
        }
        setShowing('ClubPlayers');
    };

    const getClubGamesByClubNightId = (clubnightid) => {
        if (clubGamesClubNightId !== clubnightid) {
            for (let index = 0; index < clubNights.length; index++) {
                const clubnight = clubNights[index];
                if (clubnight.id === clubnightid) {
                    let jdata = clubGames.filter(g => {return g.clubNightId === clubnightid;});
                    jdata.sort((a,b) => a.round - b.round);
                    // Add player names
                    for (let index2 = 0; index2 < jdata.length; index2++) {
                        const game = jdata[index2];
                        for (let index3 = 0; index3 < players.length; index3++) {
                            const player = players[index3];
                            if (game.playerId === player.id) {
                                game.playerName = player.name;
                            }
                            if (game.opponentId === player.id) {
                                game.opponentName = player.name;
                            }
                        }
                    }
                    let newTotals = getTotals(jdata);
                    setClubGamesForClubNight(jdata);
                    setClubGamesClubNightDate(clubnight.date);
                    setClubGamesClubNightId(clubnight.id);
                    setTotals(newTotals);
                }
            }
        }
        setShowing('ClubNightGames');
    };
    useEffect(() => {
        async function fetchData() {
            let clublist = await getClubs();
            let playerlist = await getPlayers();
            let clubnightlist = await getClubNights();
            let clubgamelist = await getClubGames();

            // Put clubid on each game
            clubgamelist.forEach(game => {
                game.clubId = clubnightlist.filter(n => {return n.id === game.clubNightId;})[0].clubId;
            });
        

            // Calculate some stuff about the club night
            clubnightlist.forEach(clubnight => {
                let clubnightgamelist = clubgamelist.filter(g => {return g.clubNightId === clubnight.id;});
                clubnight.numGames = clubnightgamelist.length;
                let clubnightplayers = [];
                clubnightgamelist.forEach(g => {
                    let foundPlayer = false; // found player
                    let foundOpponent = false; // found opponent
                    for (let i = 0; i < clubnightplayers.length; i++) {
                        let p = clubnightplayers[i];
                        if (g.playerId === p.id) {
                            foundPlayer = true;
                            p.wins = p.wins + (g.playerScore === g.opponentScore ? 0.5 : g.playerScore > g.opponentScore ? 1 : 0);
                            p.spread = p.spread + g.playerScore - g.opponentScore;
                        }
                        if (g.opponentId === p.id) {
                            foundOpponent = true;
                            p.wins = p.wins + (g.playerScore === g.opponentScore ? 0.5 : g.playerScore < g.opponentScore ? 1 : 0);
                            p.spread = p.spread - g.playerScore + g.opponentScore;
                        }
                    }
                    if (!foundPlayer) {
                        clubnightplayers.push({id: g.playerId, wins: g.playerScore === g.opponentScore ? 0.5 : g.playerScore > g.opponentScore ? 1 : 0, spread: g.playerScore - g.opponentScore});
                    }
                    if (!foundOpponent) {
                        clubnightplayers.push({id: g.opponentId, wins: g.playerScore === g.opponentScore ? 0.5 : g.playerScore < g.opponentScore ? 1 : 0, spread: g.opponentScore - g.playerScore});
                    }
                });
                clubnight.numPlayers = clubnightplayers.length;
                if (clubnightplayers.length > 0) {
                    clubnightplayers.sort((a,b) => a.wins > b.wins ? -1 : a.wins < b.wins ? 1 : b.spread - a.spread);
                    let winner = clubnightplayers[0];
                    winner.name = playerlist.filter(p => {return p.id === clubnightplayers[0].id;})[0].name;
                    clubnight.winner = winner;
                }
            });
            setClubs(clublist);
            setPlayers(playerlist);
            setClubNights(clubnightlist.filter(n => {return n.numPlayers > 0;}));
            setClubGames(clubgamelist);
            setShowing('Clubs');
        }
        fetchData();
    },[]);
    return (<div className="trBackground">
        <div className="trTitle">
            Scrabble Club Data - {showing}
        </div>
        <div className="container-fluid">
                <div className="row">
                    {showing !== 'Loading' && <div className="col-4">
                        <ClubList clubs={clubs} getClubNights={getClubNightsForClub} getClubGames={getClubGamesByClubId}></ClubList>
                    </div>}
                    {(showing === 'ClubNights' || showing === 'ClubNightGames') && <div className="col-4">
                        <ClubNightList clubNights={clubNightsForClub} clubName={clubNightsClubName} getClubGames={getClubGamesByClubNightId}></ClubNightList>
                    </div>}
                    {showing === 'ClubNightGames' && <div className="col-4">
                        <ClubGameList clubGames={clubGamesForClubNight} clubDate={clubGamesClubNightDate}></ClubGameList>
                    </div>}
                    {showing === 'ClubPlayers' && <div className="col-4">
                        <ClubPlayerList clubName={clubGamesClubName} totals={totals}></ClubPlayerList>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default ScrabbleClub;
