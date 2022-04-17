import { useState } from "react";

const ClubList = ({clubs=[], getClubNights, getClubGames}) => {
    const [snat, setSnat] = useState('No club selection made.');

    return (<div className="trBackground">
        <div className="trSubtitle">
            Club List
        </div>
        {snat && <div className="trEmphasis">{snat}</div>}
        <table className="trTable" border="1">
            <thead>
                <tr>
                    <th>Club Name</th>
                    <th>Location</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {clubs.map(club => (
                    <tr key={`club${club.id}`}>
                        <td>{club.name}</td>
                        <td>{club.location}</td>
                        <td>
                            <button className="trButton"
                                onClick={function() {
                                    getClubNights(club.id);
                                    setSnat(`Selected ${club.name} club nights.`);
                                    } }>
                                CLUB NIGHTS
                            </button>
                            <button className="trButton"
                                onClick={function() {
                                    getClubGames(club.id);
                                    setSnat(`Selected ${club.name} club players.`);
                                }}>
                                CLUB PLAYERS
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default ClubList;
