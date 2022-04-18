const ClubNightList = ({clubNights=[], clubName='', getClubGamesForClubNight}) => {
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
    return (<div>
        <div className="trSubtitle" style={myHeaderSize}>
            Club Nights: {clubName}
        </div>
        <div style={myTableSize}>
            <div style={myTableScroll}>
                <table className="trTable" border="1">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>#Players</th>
                            <th>High game</th>
                            <th>Winner</th>
                            <th>Wins</th>
                            <th>Spread</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubNights.map(clubNight => (
                            <tr key={`night${clubNight.id}`}>
                                <td>{clubNight.date}</td>
                                <td className="textcenter">{clubNight.numPlayers}</td>
                                <td className="textcenter" data-grade={clubNight.highgame > 599 ? "great" : clubNight.highgame > 499 ? "good" : ""}>{clubNight.highgame}</td>
                                <td>{clubNight.winner.name}</td>
                                <td className="textcenter">{clubNight.winner.wins}</td>
                                <td className="textright" data-grade={clubNight.winner.spread > 499 ? "great" : clubNight.winner.spread > 299 ? "good" : ""}>{clubNight.winner.spread}&nbsp;</td>
                                <td>
                                    <button className="trButton"
                                        onClick={function() {getClubGamesForClubNight(clubNight.id);} }>
                                        GAMES
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default ClubNightList;
