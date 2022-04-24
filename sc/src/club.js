
const ClubList = ({clubs=[], allClubStats, getClubNights, getClubGames, setShowing}) => {
    const myHeaderSize = {
        height: '5vh'
    };

    return (<div>
        <div className="trSubtitle" style={myHeaderSize}>
            Club List
        </div>
        <table className="trTable">
            <thead>
                <tr>
                    <th>Club Name</th>
                    <th className="textright">Games</th>
                    <th><div className="textright">Avg</div><div className="textright">Game</div><div className="textright">Score</div></th>
                    <th><div className="textright">Avg</div><div className="textright">Winning</div><div className="textright">Score</div></th>
                    <th><div className="textright">Avg</div><div className="textright">Tying</div><div className="textright">Score</div></th>
                    <th><div className="textright">Avg</div><div className="textright">Losing</div><div className="textright">Score</div></th>
                    <th><div className="textright">High</div><div className="textright">&nbsp;Game</div></th> {/* The space before Game helps the data columns not wrap after the emoji */}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {clubs
                .sort((a,b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
                .map(club => (
                    <tr key={`club${club.id}`}>
                        <td>{club.name}</td>
                        <td className="equispaced textright">{club.stat.games}</td>
                        <td className="equispaced textright">{Math.round(club.stat.avgPoints)}</td>
                        <td className="equispaced textright">{Math.round(club.stat.avgWinnerPoints)}</td>
                        <td className="equispaced textright">{Math.round(club.stat.avgTiePoints)}</td>
                        <td className="equispaced textright">{Math.round(club.stat.avgLoserPoints)}</td>
                        <td className="equispaced textright" data-grade={club.stat.highgame > 599 ? "great" : club.stat.highgame > 499 ? "good" : ""}>{club.stat.highgame}</td>
                        <td>
                            <div>
                                <button className="trButton" onClick={function() {getClubNights(club.id);} }>
                                    NIGHTS
                                </button>
                            </div>
                            <div>
                                <button className="trButton" onClick={function() {getClubGames(club.id);}}>
                                    PLAYERS
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>All clubs</td>
                    <td className="textright">{allClubStats.games}</td>
                    <td className="equispaced textright">{Math.round(allClubStats.avgPoints)}</td>
                    <td className="equispaced textright">{Math.round(allClubStats.avgWinnerPoints)}</td>
                    <td className="equispaced textright">{Math.round(allClubStats.avgTiePoints)}</td>
                    <td className="equispaced textright">{Math.round(allClubStats.avgLoserPoints)}</td>
                    <td className="equispaced textright" data-grade={allClubStats.highgame > 599 ? "great" : allClubStats.highgame > 499 ? "good" : ""}>{allClubStats.highgame}</td>
                    <td>
                        <div>
                            <button className="trButton" onClick={function() {getClubNights(0);} }>
                                NIGHTS
                            </button>
                        </div>
                        <div>
                            <button className="trButton" onClick={function() {setShowing('ClubsAndPlayers');}}>
                                PLAYERS
                            </button>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    );
}

export default ClubList;

