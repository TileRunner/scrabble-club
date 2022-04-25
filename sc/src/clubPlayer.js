const ClubPlayerList = ({clubName='', totals=[], setH2hItem, setShowingh2h}) => {
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
            Club Players: {clubName}
        </div>
        <div style={myTableSize}>
            <div style={myTableScroll}>
                <table className="trTable" border="1">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Wins</th>
                            <th>Spread</th>
                            <th>Losses</th>
                            <th><div className="textright">Avg For</div></th>
                            <th><div className="textright">Avg Against</div></th>
                            <th><div className="textright">High Game</div></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totals.map((total, index) => (
                            <tr key={`total.${index}`}>
                                <td>{total.name}</td>
                                <td className="textcenter">{total.wins}</td>
                                <td className="equispaced textright">{Number(total.for - total.against).toLocaleString()}</td>
                                <td className="textcenter">{total.losses}</td>
                                <td data-grade={total.avgFor > 409 ? "great" : total.avgFor > 369 ? "good" : ""} className="equispaced textright">{total.avgFor.toLocaleString()}</td>
                                <td className="equispaced textright">{total.avgAgainst.toLocaleString()}</td>
                                <td data-grade={total.highgame > 599 ? "great" : total.highgame > 499 ? "good" : ""} className="equispaced textright">{total.highgame.toLocaleString()}</td>
                                <td>
                                    <div>
                                        <button className="trButton"
                                        onClick={() => {
                                            setH2hItem({playerName: total.name, h2h: total.h2h});
                                            setShowingh2h(true);
                                        }}
                                        >
                                            H2H
                                        </button>
                                    </div>
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

export default ClubPlayerList;
