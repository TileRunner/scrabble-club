import { useState } from "react";
import changeSortOrder from "./changeSortOrder";

const ClubList = ({clubs=[], getClubNights, getClubGames}) => {
    const myHeaderSize = {
        height: '5vh'
    };
    const [so, setSo] = useState({by: "name", order: "asc"});
    function handleColumnHeaderClick(columnName) {
        changeSortOrder(columnName, so, setSo);
    }

    return (<div>
        <div className="trSubtitle" style={myHeaderSize}>
            Club List
        </div>
        <table className="trTable" border="1">
            <thead>
                <tr>
                    <th onClick={() => {handleColumnHeaderClick("name");}}>
                        Club Name
                        {so.by === "name" && <span className="sortarrow">{so.order === "asc" ? "↧" : "↥"}</span>}
                    </th>
                    <th onClick={() => {handleColumnHeaderClick("location");}}>
                        Location
                        {so.by === "location" && <span className="sortarrow">{so.order === "asc" ? "↧" : "↥"}</span>}
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {clubs
                .sort((a,b) =>
                (so.by === "name" ? a.name.toUpperCase() : a.location.toUpperCase())
                >
                (so.by === "name" ? b.name.toUpperCase() : b.location.toUpperCase())
                ?
                so.order === "asc" ? 1 : -1
                :
                so.order === "asc" ? -1 : 1
                )
                .map(club => (
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

