const ClubGameList = ({clubGames=[], clubDate=''}) => {
    const myHeaderSize = {
        height: '5vh'
    };
    const myTableSize = {
        height: '90vh',
        width: 'fit-content'
    };
    const myTableScroll = {
        height: '100%',
        overflowY: 'auto'
    };
    const getTotals = () => {
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
                }
            }
            if (!foundPlayer) {
                let total = {
                    name: game.playerName,
                    for: game.playerScore,
                    against: game.opponentScore,
                    wins: game.playerScore > game.opponentScore ? 1 : game.playerScore < game.opponentScore ? 0 : 0.5,
                    losses: game.playerScore < game.opponentScore ? 1 : game.playerScore > game.opponentScore ? 0 : 0.5,
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
                };
                totals.push(total);
            }
        }
        totals.sort((a,b) => a.wins > b.wins ? -1 : a.wins === b.wins ? b.for - b.against - a.for + a.against : a.losses - b.losses);
        return totals;
    }
    return (<div>
        <div className="trSubtitle" style={myHeaderSize}>
            Club Games: {clubDate}
        </div>
        <div style={myTableSize}>
            <div style={myTableScroll}>
                <table className="trTable" border="1">
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Player</th>
                            <th>Opponent</th>
                            <th>For</th>
                            <th>Against</th>
                            <th>Spread</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubGames.map(game => (
                            <tr key={`game${game.id}`}>
                                <td>{game.round}</td>
                                <td>
                                    {game.playerName}
                                    <span style={{float: 'right', fontFamily: 'monospace'}}>&nbsp;
                                        {game.playerScore > game.opponentScore ? '(W)'
                                        :game.playerScore < game.opponentScore ? '(L)'
                                        : '(T)'}
                                    </span>
                                </td>
                                <td>
                                    {game.opponentName}
                                    <span style={{float: 'right', fontFamily: 'monospace'}}>&nbsp;
                                        {game.playerScore < game.opponentScore ? '(W)'
                                        :game.playerScore > game.opponentScore ? '(L)'
                                        : '(T)'}
                                    </span>
                                </td>
                                <td className="equispaced textright" data-grade={game.playerScore > 599 ? "great" : game.playerScore > 499 ? "good" : ""}>{game.playerScore}</td>
                                <td className="equispaced textright" data-grade={game.opponentScore > 599 ? "great" : game.opponentScore > 499 ? "good" : ""}>{game.opponentScore}</td>
                                <td className="equispaced textright">{Math.abs(game.playerScore - game.opponentScore)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="trSubtitle">Player Totals:</div>
                <table className="trTable" border="1">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Wins</th>
                            <th>Spread</th>
                            <th>Losses</th>
                            <th>For</th>
                            <th>Against</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTotals().map((total, index) => (
                            <tr key={`total.${total.name}`}>
                                <td className="equispaced textright">{index+1}</td>
                                <td>{total.name}</td>
                                <td className="textcenter">{total.wins}</td>
                                <td className="equispaced textright">{total.for - total.against}</td>
                                <td className="textcenter">{total.losses}</td>
                                <td className="equispaced textright" data-grade={total.for > 1499 ? "great" : total.for > 1399 ? "good" : ""}>{Number(total.for).toLocaleString()}</td>
                                <td className="equispaced textright">{Number(total.against).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default ClubGameList;
