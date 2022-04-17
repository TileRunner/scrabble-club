import { useState } from "react";

const ClubNightList = ({clubNights=[], clubName='', getClubGames}) => {
    const [snat, setSnat] = useState('No club night selected.');
    const myTableSize = {
        height: '780px',
        width: 'fit-content'
    };
    const myTableScroll = {
        height: '100%',
        overflowY: 'auto'
    };
    return (<div className="trBackground">
        <div className="trSubtitle">
            Club Nights: {clubName}
        </div>
        {snat && <div className="trEmphasis">{snat}</div>}
        <div style={myTableSize}>
            <div style={myTableScroll}>
                <table className="trTable" border="1">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>#Players</th>
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
                                <td>{clubNight.numPlayers > 0 && <>{clubNight.winner.name}</>}</td>
                                <td className="textcenter">{clubNight.numPlayers > 0 && <>{clubNight.winner.wins}</>}</td>
                                <td className="textright">{clubNight.numPlayers > 0 && <>{clubNight.winner.spread}</>}&nbsp;</td>
                                <td>
                                    <button className="trButton"
                                        onClick={function() {
                                            getClubGames(clubNight.id);
                                            setSnat(`Selected ${clubNight.date} club games.`);
                                            } }>
                                        CLUB GAMES
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
