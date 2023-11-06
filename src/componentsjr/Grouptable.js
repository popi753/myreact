import "../styles/Grouptable.css";
import { useState, useRef } from "react";

export default function Grouptable({ list, setSavedRanking }) {
    const [group, setGroup] = useState(list.teams);

    const [selectedRank, setSelectedRank] = useState(null);

    const [ranking, setRanking] = useState([
        {
            rank: 1,
            id: null,
            name: null,
            logo: null,
        },
        {
            rank: 2,
            id: null,
            name: null,
            logo: null,
        },
        {
            rank: 3,
            id: null,
            name: null,
            logo: null,
        },
        {
            rank: 4,
            id: null,
            name: null,
            logo: null,
        },
    ]);

    const chooseteam = useRef(null);

    function handleClick(item) {
        setSelectedRank(item);
        group.length && (chooseteam.current.className = "hover");
    }

    function handleChoose(team) {
        if (!selectedRank) {
            return null;
        }

        selectedRank.id
            ? setRanking(
                ranking.map((e, index) =>
                    index === ranking.findIndex((e) => !e.id)
                        ? { rank: e.rank, ...team }
                        : e
                )
            )
            : setRanking(
                ranking.map((e) =>
                    e.rank === selectedRank.rank ? { rank: e.rank, ...team } : e
                )
            );

        selectedRank.id
            ? setSavedRanking((prev) =>
                prev.map((element) =>
                    element.name === list.name
                        ? {
                            ...element,
                            teams: ranking.map((e, index) =>
                                    index === ranking.findIndex((e) => !e.id)
                                        ? { rank: e.rank, ...team }
                                        : e
                                ),
                            
                        }
                        : element
                )
            )
            : setSavedRanking((prev) =>
                prev.map((element) =>
                    element.name === list.name
                        ? {
                            ...element,
                            teams: ranking.map((e) =>
                                    e.rank === selectedRank.rank
                                        ? { rank: e.rank, ...team }
                                        : e
                                ),
                            
                        }
                        : element
                )
            );

        setSelectedRank({ rank: selectedRank.rank, ...team });

        setGroup(group.filter((e) => !(e.id === team.id)));

    }

    async function handleDelete(team) {

        await setRanking(
            ranking.map((e) =>
                e.rank === team.rank
                    ? {
                        rank: team.rank,
                        id: null,
                        name: null,
                        logo: null,
                    }
                    : e
            )
        );
        
        
        await setSavedRanking((prev) =>
            prev.map((element) =>
                element.name === list.name
                    ? {name : list.name,
                       teams: element.teams.map((ele) =>
                        ele.rank === team.rank
                            ?
                            {   rank: team.rank,
                                id: null,
                                name: null,
                                logo: null,
                            }
                            : ele
                    )}
                    : element
            )
        );

        delete team.rank
        setGroup([...group, {...team,}]);
        
    }

    return (
        <div className="container">
            <h3>{list.name}</h3>
            <div
                id="group"
                onMouseLeave={() => {
                    group.length && (chooseteam.current.className = "nothover");
                }}
            >
                <div id="insidegroup">
                    {ranking.map((element) => {
                        return (
                            <Chosengroup
                                handleClick={handleClick}
                                handleDelete={handleDelete}
                                key={element.rank}
                                team={element}
                            />
                        );
                    })}
                </div>

                {group.length ? (
                    <div id="chooseteam" ref={chooseteam}>
                        {group.map((element) => {
                            return (
                                <ChooseTeam
                                    key={element.id}
                                    handleChoose={handleChoose}
                                    team={element}
                                />
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export function ChooseTeam({ handleChoose, team}) {
    return (
        <div
            className="img-container"
            id={team.id}
            title={team.name}
            onClick={() => handleChoose(team)}
        >
            <img src={team.logo} height="40px" alt="club logo" />
        </div>
    );
}

export function Chosengroup({ handleClick, handleDelete, team }) {
    return (
        <div className="teams">
            <span className="span">{team.rank}</span>
            <img
                src={
                    team.logo || "https://cdn-icons-png.flaticon.com/512/5042/5042057.png"
                }
                height="40px"
                alt="club logo"
            />
            <span
                onClick={() => {
                    handleClick(team);
                }}
            >
                {team.name || "choose club1"}
            </span>
            {team.id && <button onClick={() => handleDelete(team)}>x</button>}
        </div>
    );
}
