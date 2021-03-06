import { useState, useEffect } from "react";
import ClubList from "./club";
import ClubNightList from "./clubNight";
import ClubGameList from "./clubGame";
import ClubPlayerList from "./clubPlayer";
import HeadToHeadList from "./h2h";
import { getTotals } from "./getTotals";
import { getClubs, getPlayers, getClubNights, getClubGames } from "./api";

const ScrabbleClub = () => {
    const [showing, setShowing] = useState('Loading');
    const [showingh2h, setShowingh2h] = useState(false);
    const [clubs, setClubs] = useState([]);
    const [allClubStats, setAllClubStats] = useState({});
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
    const [allPlayerTotals, setAllPlayerTotals] = useState([]);
    const [h2hItem, setH2hItem] = useState({playerName:'', h2h: []});
    const getClubNightsForClub = (clubid) => {
        if (clubNightsClubId !== clubid) {
            if (clubid === 0) {
                let jdata = clubNights;
                jdata.sort((a,b) => a.date > b.date ? -1 : 1);
                setClubNightsForClub(jdata);
                setClubNightsClubName("All");
            } else {
                for (let index = 0; index < clubs.length; index++) {
                    const club = clubs[index];
                    if (club.id === clubid) {
                        let jdata = clubNights.filter(n => {return n.clubId === clubid;});
                        jdata.sort((a,b) => a.date > b.date ? -1 : 1);
                        setClubNightsForClub(jdata);
                        setClubNightsClubName(club.name);
                    }
                }
            }
            setClubNightsClubId(clubid);
        }
        setShowing('ClubNights');
    };

    const getClubGamesForClub = (clubid) => {
        if (clubGamesClubId !== clubid || true) {
            for (let index = 0; index < clubs.length; index++) {
                let club = clubs[index];
                if (club.id === clubid) {
                    let jdata = clubGames.filter(g => {return g.clubId === clubid;});
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
                    jdata.sort((a,b) => a.round - b.round
                    || (b.playerScore > b.opponentScore ? b.playerScore : b.opponentScore)
                    - (a.playerScore > a.opponentScore ? a.playerScore : a.opponentScore));
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

            // Put clubid and player names on each game
            clubgamelist.forEach(game => {
                game.clubId = clubnightlist.filter(n => {return n.id === game.clubNightId;})[0].clubId;
                game.playerName = playerlist.filter(p => {return p.id === game.playerId;})[0].name;
                game.opponentName = playerlist.filter(p => {return p.id === game.opponentId;})[0].name;
            });
        

            // Calculate some stuff about the club night
            clubnightlist.forEach(clubnight => {
                let clubnightgamelist = clubgamelist.filter(g => {return g.clubNightId === clubnight.id;});
                clubnight.numGames = clubnightgamelist.length;
                let clubnightplayers = [];
                clubnight.highgame = 0;
                clubnightgamelist.forEach(g => {
                    if (g.playerScore > clubnight.highgame) {
                        clubnight.highgame = g.playerScore;
                    }
                    if (g.opponentScore > clubnight.highgame) {
                        clubnight.highgame = g.opponentScore;
                    }
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
                        clubnightplayers.push({
                            id: g.playerId,
                            wins: g.playerScore === g.opponentScore ? 0.5 : g.playerScore > g.opponentScore ? 1 : 0,
                            spread: g.playerScore - g.opponentScore,
                            name: g.playerName
                        });
                    }
                    if (!foundOpponent) {
                        clubnightplayers.push({
                            id: g.opponentId,
                            wins: g.playerScore === g.opponentScore ? 0.5 : g.playerScore < g.opponentScore ? 1 : 0,
                            spread: g.opponentScore - g.playerScore,
                            name: g.opponentName
                        });
                    }
                });
                clubnight.numPlayers = clubnightplayers.length;
                if (clubnightplayers.length > 0) {
                    clubnightplayers.sort((a,b) => a.wins > b.wins ? -1 : a.wins < b.wins ? 1 : b.spread - a.spread);
                    clubnight.winner = clubnightplayers[0];
                }
            });

            // Calculate club stats
            let allstat = {games: 0, points: 0, winnerPoints: 0, loserPoints: 0, ties: 0, tiePoints: 0, highgame: 0};
            allstat.avgPoints = 0;
            allstat.avgWinnerPoints = 0;
            allstat.avgLoserPoints = 0;
            allstat.avgTiePoints = 0;
            clublist.forEach(club => {
                let stat = {games: 0, points: 0, winnerPoints: 0, loserPoints: 0, ties: 0, tiePoints: 0, highgame: 0};
                clubgamelist.forEach(game => {
                    if (game.clubId === club.id) {
                        stat.games++;
                        allstat.games++;
                        stat.points += (game.playerScore + game.opponentScore);
                        allstat.points += (game.playerScore + game.opponentScore);
                        if (game.playerScore > stat.highgame) {
                            stat.highgame = game.playerScore;
                        }
                        if (game.playerScore > allstat.highgame) {
                            allstat.highgame = game.playerScore;
                        }
                        if (game.opponentScore > stat.highgame) {
                            stat.highgame = game.opponentScore;
                        }
                        if (game.opponentScore > allstat.highgame) {
                            allstat.highgame = game.opponentScore;
                        }
                        if (game.playerScore > game.opponentScore) {
                            stat.winnerPoints += game.playerScore;
                            stat.loserPoints += game.opponentScore;
                            allstat.winnerPoints += game.playerScore;
                            allstat.loserPoints += game.opponentScore;
                        } else if (game.playerScore === game.opponentScore) {
                            stat.ties++;
                            stat.tiePoints += game.playerScore;
                            allstat.ties++;
                            allstat.tiePoints += game.playerScore;
                        } else {
                            stat.winnerPoints += game.opponentScore;
                            stat.loserPoints += game.playerScore;
                            allstat.winnerPoints += game.opponentScore;
                            allstat.loserPoints += game.playerScore;
                        }
                    }
                });
                stat.avgPoints = 0;
                stat.avgWinnerPoints = 0;
                stat.avgLoserPoints = 0;
                stat.avgTiePoints = 0;
                if (stat.games > 0) {
                    stat.avgPoints = stat.points / stat.games;
                    if (stat.games > stat.ties) {
                        stat.avgWinnerPoints = stat.winnerPoints / (stat.games - stat.ties);
                        stat.avgLoserPoints = stat.loserPoints / (stat.games - stat.ties);
                    }
                    if (stat.ties > 0) {
                        stat.avgTiePoints = stat.tiePoints / stat.ties;
                    }
                }
                club.stat = stat;
            });
            if (allstat.games > 0) {
                allstat.avgPoints = allstat.points / allstat.games;
                if (allstat.games > allstat.ties) {
                    allstat.avgWinnerPoints = allstat.winnerPoints / (allstat.games - allstat.ties);
                    allstat.avgLoserPoints = allstat.loserPoints / (allstat.games - allstat.ties);
                }
                if (allstat.ties > 0) {
                    allstat.avgTiePoints = allstat.tiePoints / allstat.ties;
                }
            }
            let playerTotals = getTotals(clubgamelist);
            setClubs(clublist);
            setAllClubStats(allstat);
            setClubNights(clubnightlist.filter(n => {return n.numPlayers > 0;}));
            setClubGames(clubgamelist);
            setAllPlayerTotals(playerTotals);
            setShowing('ClubsAndPlayers');
        }
        fetchData();
    },[]);
    return (
        <div className="container-fluid">
            <div className="row">
                {showing !== 'Loading' && <div className="col-4">
                    <ClubList clubs={clubs} allClubStats={allClubStats} getClubNights={getClubNightsForClub} getClubGames={getClubGamesForClub} setShowing={setShowing}></ClubList>
                </div>}
                {showing === 'ClubsAndPlayers' && <div className="col-4">
                    <ClubPlayerList clubName='All' totals={allPlayerTotals} setH2hItem={setH2hItem} setShowingh2h={setShowingh2h}></ClubPlayerList>
                </div>}
                {showing === 'ClubPlayers' && <div className="col-4">
                    <ClubPlayerList clubName={clubGamesClubName} totals={totals} setH2hItem={setH2hItem} setShowingh2h={setShowingh2h}></ClubPlayerList>
                </div>}
                {showingh2h && (showing === 'ClubsAndPlayers' || showing === 'ClubPlayers') && <div className="col-4">
                    <HeadToHeadList playerName={h2hItem.playerName} h2h={h2hItem.h2h}></HeadToHeadList>
                </div>}
                {(showing === 'ClubNights' || showing === 'ClubNightGames') && <div className="col-4">
                    <ClubNightList clubNights={clubNightsForClub} clubName={clubNightsClubName} getClubGamesForClubNight={getClubGamesByClubNightId}></ClubNightList>
                </div>}
                {showing === 'ClubNightGames' && <div className="col-4">
                    <ClubGameList clubGames={clubGamesForClubNight} clubDate={clubGamesClubNightDate}></ClubGameList>
                </div>}
            </div>
        </div>
    );
}

export default ScrabbleClub;
