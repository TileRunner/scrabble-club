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
    })
    totals.sort(function(a,b) {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1;} // by name
        return -1;});
    console.log(JSON.stringify(totals));
    return totals;
}
