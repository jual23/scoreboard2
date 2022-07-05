import {DragDropContext} from 'react-beautiful-dnd'
import {Draggable} from 'react-beautiful-dnd'
import {Droppable} from 'react-beautiful-dnd'
import Stats from './Stats'

const SortableList = ({
    team,
    teamName,
    teamBatter,
    teamId,
    statUp,
    statDown,
    onHandlePlayer,
    updateTeam,
}) => {
    return (
        <div className="sortable-list">
            <div className="sortable-list_team">
                <h2>{teamName}</h2>
            </div>
            <DragDropContext onDragEnd={updateTeam}>
                <Droppable droppableId={teamId + '_batter'}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className="sortable-list_team_batter">
                            {teamBatter.map((player, index) => (
                                <Draggable
                                    draggableId={player.id}
                                    key={player.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}>
                                            <p {...provided.dragHandleProps}>
                                                DRAG
                                            </p>
                                            <Stats
                                                key={player.id}
                                                player={player}
                                                onHandlePlayer={onHandlePlayer}
                                                // statUp={statUp}
                                                // statDown={statDown}
                                                teamName={teamName}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId={teamId + '_reserve'}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className="sortable-list_team_reserve">
                            {team.map((player, index) => (
                                <Draggable
                                    draggableId={player.id}
                                    key={player.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}>
                                            <p {...provided.dragHandleProps}>
                                                DRAG
                                            </p>
                                            <Stats
                                                key={player.id}
                                                player={player}
                                                onHandlePlayer={onHandlePlayer}
                                                // statUp={statUp}
                                                // statDown={statDown}
                                                teamName={teamName}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default SortableList
