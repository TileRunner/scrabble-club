const ClubPlayerList = ({clubGames=[], clubName='', totals=[]}) => {
    const myTableSize = {
        height: '800px',
        width: 'fit-content'
    };
    const myTableScroll = {
        height: '100%',
        overflowY: 'auto'
    };
    return (<div className="trBackground">
        <div className="trSubtitle">
            Club Players: {clubName}
        </div>
        <div style={myTableSize}>
            <div style={myTableScroll}>
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
                        {totals.map((total, index) => (
                            <tr key={`total.${total.Name}`}>
                                <td className="equispaced textright">{index+1}</td>
                                <td>{total.Name}</td>
                                <td className="textcenter">{total.Wins}</td>
                                <td className="equispaced textright">{total.For - total.Against}</td>
                                <td className="textcenter">{total.Losses}</td>
                                <td className="equispaced textright">{total.For}</td>
                                <td className="equispaced textright">{total.Against}</td>
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
