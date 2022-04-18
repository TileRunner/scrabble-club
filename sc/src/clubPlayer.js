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
                            <th>For</th>
                            <th>Against</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totals.map((total, index) => (
                            <tr key={`total.${index}`}>
                                <td>{total.name}</td>
                                <td className="textcenter">{total.wins}</td>
                                <td className="equispaced textright">{Number(total.for - total.against).toLocaleString()}</td>
                                <td className="textcenter">{total.losses}</td>
                                <td className="equispaced textright">{Number(total.for).toLocaleString()}</td>
                                <td className="equispaced textright">{Number(total.against).toLocaleString()}</td>
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
