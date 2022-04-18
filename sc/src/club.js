const ClubList = ({clubs=[], getClubNights, getClubGames}) => {
    const myHeaderSize = {
        height: '5vh'
    };

    return (<div>
        <div className="trSubtitle" style={myHeaderSize}>
            Club List
        </div>
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
                            <button className="trButton" onClick={function() {getClubNights(club.id);} }>
                                NIGHTS
                            </button>
                            &nbsp;
                            <button className="trButton" onClick={function() {getClubGames(club.id);}}>
                                PLAYERS
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
