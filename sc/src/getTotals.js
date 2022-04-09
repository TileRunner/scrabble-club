export function getTotals(clubGames=[]) {
    let totals = [];
    for (let index = 0; index < clubGames.length; index++) {
        const game = clubGames[index];
        let foundPlayer = false;
        let foundOpponent = false;
        for (let index2 = 0; index2 < totals.length; index2++) {
            const total = totals[index2];
            if (total.Name === game.PlayerName) {
                foundPlayer = true;
                total.For = total.For + game.PlayerScore;
                total.Against = total.Against + game.OpponentScore;
                if (game.PlayerScore > game.OpponentScore) {
                    total.Wins = total.Wins + 1;
                }
                if (game.PlayerScore < game.OpponentScore) {
                    total.Losses = total.Losses + 1;
                }
                if (game.PlayerScore === game.OpponentScore) {
                    total.Wins = total.Wins + 0.5;
                    total.Losses = total.Losses + 0.5;
                }
            }
            if (total.Name === game.OpponentName) {
                foundOpponent = true;
                total.Against = total.Against + game.PlayerScore;
                total.For = total.For + game.OpponentScore;
                if (game.PlayerScore < game.OpponentScore) {
                    total.Wins = total.Wins + 1;
                }
                if (game.PlayerScore > game.OpponentScore) {
                    total.Losses = total.Losses + 1;
                }
                if (game.PlayerScore === game.OpponentScore) {
                    total.Wins = total.Wins + 0.5;
                    total.Losses = total.Losses + 0.5;
                }
            }
        }
        if (!foundPlayer) {
            let total = {
                Name: game.PlayerName,
                For: game.PlayerScore,
                Against: game.OpponentScore,
                Wins: game.PlayerScore > game.OpponentScore ? 1 : game.PlayerScore < game.OpponentScore ? 0 : 0.5,
                Losses: game.PlayerScore < game.OpponentScore ? 1 : game.PlayerScore > game.OpponentScore ? 0 : 0.5,
            };
            totals.push(total);
        }
        if (!foundOpponent) {
            let total = {
                Name: game.OpponentName,
                For: game.OpponentScore,
                Against: game.PlayerScore,
                Wins: game.PlayerScore < game.OpponentScore ? 1 : game.PlayerScore > game.OpponentScore ? 0 : 0.5,
                Losses: game.PlayerScore > game.OpponentScore ? 1 : game.PlayerScore < game.OpponentScore ? 0 : 0.5,
            };
            totals.push(total);
        }
    }
    totals.sort(function(a,b) {
        if (a.Name > b.Name) {return 1;} // by name
        return -1;});
    return totals;
}
