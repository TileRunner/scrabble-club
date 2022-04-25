const HeadToHeadList = ({playerName='', h2h=[]}) => {
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
            Head To Head For {playerName}
        </div>
        <div style={myTableSize}>
            <div style={myTableScroll}>
                <table className="trTable">
                    <thead>
                        <tr>
                            <th>Opponent</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th><div className="textright">Avg For</div></th>
                            <th><div className="textright">Avg Against</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {h2h.sort((a,b) => {return a.name < b.name ? -1 : 1}).map((opponent, index) => (
                            <tr key={`total.${index}`}>
                                <td>{opponent.name}</td>
                                <td className="textcenter">{opponent.wins}</td>
                                <td className="textcenter">{opponent.losses}</td>
                                <td data-grade={opponent.avgFor > 409 ? "great" : opponent.avgFor > 369 ? "good" : ""} className="equispaced textright">{opponent.avgFor.toLocaleString()}</td>
                                <td className="equispaced textright">{opponent.avgAgainst.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default HeadToHeadList;
