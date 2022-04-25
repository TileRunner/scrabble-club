export function getTotals(clubGames=[]) {
    let totals = [];
    for (let index = 0; index < clubGames.length; index++) {
        const game = clubGames[index];
        let foundPlayer = false;
        let foundOpponent = false;
        for (let index2 = 0; index2 < totals.length; index2++) {
            const total = totals[index2];
            if (total.name === game.playerName) {
                foundPlayer = true;
                total.for = total.for + game.playerScore;
                total.against = total.against + game.opponentScore;
                if (game.playerScore > game.opponentScore) {
                    total.wins = total.wins + 1;
                }
                if (game.playerScore < game.opponentScore) {
                    total.losses = total.losses + 1;
                }
                if (game.playerScore === game.opponentScore) {
                    total.wins = total.wins + 0.5;
                    total.losses = total.losses + 0.5;
                }
                if (game.playerScore > total.highgame) {
                    total.highgame = game.playerScore;
                }
            }
            if (total.name === game.opponentName) {
                foundOpponent = true;
                total.against = total.against + game.playerScore;
                total.for = total.for + game.opponentScore;
                if (game.playerScore < game.opponentScore) {
                    total.wins = total.wins + 1;
                }
                if (game.playerScore > game.opponentScore) {
                    total.losses = total.losses + 1;
                }
                if (game.playerScore === game.opponentScore) {
                    total.wins = total.wins + 0.5;
                    total.losses = total.losses + 0.5;
                }
                if (game.opponentScore > total.highgame) {
                    total.highgame = game.opponentScore;
                }
            }
        }
        if (!foundPlayer) {
            let total = {
                name: game.playerName,
                for: game.playerScore,
                against: game.opponentScore,
                wins: game.playerScore > game.opponentScore ? 1 : game.playerScore < game.opponentScore ? 0 : 0.5,
                losses: game.playerScore < game.opponentScore ? 1 : game.playerScore > game.opponentScore ? 0 : 0.5,
                highgame: game.playerScore
            };
            totals.push(total);
        }
        if (!foundOpponent) {
            let total = {
                name: game.opponentName,
                for: game.opponentScore,
                against: game.playerScore,
                wins: game.playerScore < game.opponentScore ? 1 : game.playerScore > game.opponentScore ? 0 : 0.5,
                losses: game.playerScore > game.opponentScore ? 1 : game.playerScore < game.opponentScore ? 0 : 0.5,
                highgame: game.opponentScore
            };
            totals.push(total);
        }
    }
    totals.forEach(total => {
        total.avgFor = Math.round(total.for / (total.wins + total.losses));
        total.avgAgainst = Math.round(total.against / (total.wins + total.losses));
        // Head to head
        let h2h = [];
        for (let index = 0; index < clubGames.length; index++) {
            const game = clubGames[index];
            if (game.playerName === total.name) {
                let foundOpponent = false;
                for (let index2 = 0; index2 < h2h.length; index2++) {
                    let opponent = h2h[index2];
                    if (opponent.name === game.opponentName) {
                        foundOpponent = true;
                        opponent.pointsFor += game.playerScore;
                        opponent.pointsAgainst += game.opponentScore;
                        if (game.playerScore > game.opponentScore) {
                            opponent.wins++;
                        } else if (game.playerScore === game.opponentScore) {
                            opponent.wins += 0.5;
                            opponent.losses += 0.5;
                        } else {
                            opponent.losses++;
                        }
                    }
                }
                if (!foundOpponent) {
                    let opponent = {name: game.opponentName, pointsFor: game.playerScore, pointsAgainst: game.opponentScore, wins: 0, losses: 0};
                    if (game.playerScore > game.opponentScore) {
                        opponent.wins++;
                    } else if (game.playerScore === game.opponentScore) {
                        opponent.wins += 0.5;
                        opponent.losses += 0.5;
                    } else {
                        opponent.losses++;
                    }
                    h2h.push(opponent);
                }
            }
            // other way round
            if (game.opponentName === total.name) {
                let foundOpponent = false;
                for (let index2 = 0; index2 < h2h.length; index2++) {
                    let opponent = h2h[index2];
                    if (opponent.name === game.playerName) {
                        foundOpponent = true;
                        opponent.pointsFor += game.opponentScore;
                        opponent.pointsAgainst += game.playerScore;
                        if (game.playerScore < game.opponentScore) {
                            opponent.wins++;
                        } else if (game.playerScore === game.opponentScore) {
                            opponent.wins += 0.5;
                            opponent.losses += 0.5;
                        } else {
                            opponent.losses++;
                        }
                    }
                }
                if (!foundOpponent) {
                    let opponent = {name: game.playerName, pointsFor: game.opponentScore, pointsAgainst: game.playerScore, wins: 0, losses: 0};
                    if (game.playerScore < game.opponentScore) {
                        opponent.wins++;
                    } else if (game.playerScore === game.opponentScore) {
                        opponent.wins += 0.5;
                        opponent.losses += 0.5;
                    } else {
                        opponent.losses++;
                    }
                    h2h.push(opponent);
                }
            }
        }
        h2h.forEach(opponent => {
            opponent.avgFor = Math.round(opponent.pointsFor / (opponent.wins + opponent.losses));
            opponent.avgAgainst = Math.round(opponent.pointsAgainst / (opponent.wins + opponent.losses));
        });
        total.h2h = h2h;
    })
    totals.sort(function(a,b) {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1;} // by name
        return -1;});
    return totals;
}
