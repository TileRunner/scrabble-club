const ClubPlayerList = ({clubName='', totals=[]}) => {
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
                            <th>Avg For</th>
                            <th>Avg Against</th>
                            <th>High Score</th>
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
