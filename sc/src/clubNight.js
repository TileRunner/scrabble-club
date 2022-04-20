import { useState } from "react";
import changeSortOrder from "./changeSortOrder";

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
    const [so, setSo] = useState({by: "date", order: "desc"});
    function handleColumnHeaderClick(columnName) {
        changeSortOrder(columnName, so, setSo);
    }
    return (<div>
        <div className="trSubtitle" style={myHeaderSize}>
            Club Nights: {clubName}
        </div>
        <div style={myTableSize}>
            <div style={myTableScroll}>
                <table className="trTable" border="1">
                    <thead>
                        <tr>
                            <th onClick={() => {handleColumnHeaderClick("date");}}>
                                Date
                                {so.by === "date" && <span className="sortarrow">{so.order === "asc" ? "↧" : "↥"}</span>}
                            </th>
                            <th>#Players</th>
                            <th onClick={() => {handleColumnHeaderClick("highgame");}}>
                                High game
                                {so.by === "highgame" && <span className="sortarrow">{so.order === "asc" ? "↧" : "↥"}</span>}
                            </th>
                            <th onClick={() => {handleColumnHeaderClick("winner");}}>
                                Winner
                                {so.by === "winner" && <span className="sortarrow">{so.order === "asc" ? "↧" : "↥"}</span>}
                            </th>
                            <th>Wins</th>
                            <th onClick={() => {handleColumnHeaderClick("spread");}}>
                                Spread
                                {so.by === "spread" && <span className="sortarrow">{so.order === "asc" ? "↧" : "↥"}</span>}
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubNights
                        .sort((a,b) =>
                        (so.by === "date" ? a.date : so.by === "winner" ? a.winner.name.toUpperCase() : so.by === "highgame" ? a.highgame : a.winner.spread)
                        >
                        (so.by === "date" ? b.date : so.by === "winner" ? b.winner.name.toUpperCase() : so.by === "highgame" ? b.highgame : b.winner.spread)
                        ?
                        so.order === "asc" ? 1 : -1
                        :
                        so.order === "asc" ? -1 : 1
                        )
                        .map(clubNight => (
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
