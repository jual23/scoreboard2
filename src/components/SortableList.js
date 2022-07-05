import {DragDropContext} from 'react-beautiful-dnd'
import {Draggable} from 'react-beautiful-dnd'
import {Droppable} from 'react-beautiful-dnd'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
            <Grid container spacing={2}>
                <Droppable droppableId={teamId + '_batter'}>
                    {(provided, snapshot) => (
                        <Grid container rowSpacing={2}
                            ref={provided.innerRef}
                            className="sortable-list_team_batter">
                            {teamBatter.map((player, index) => (
                                <Grid container rowSpacing={2}>
                                    <Draggable
                                        draggableId={player.id}
                                        key={player.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <Grid container xs={12}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}>
                                                <Grid item xs={2} {...provided.dragHandleProps}>
                                                    DRAG
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stats
                                                    key={player.id}
                                                    player={player}
                                                    onHandlePlayer={onHandlePlayer}
                                                    teamName={teamName}
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Draggable>
                                </Grid>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
                <Droppable droppableId={teamId + '_reserve'}>
                    {(provided, snapshot) => (
                        <Grid container rowSpacing={2}
                            ref={provided.innerRef}
                            className="sortable-list_team_reserve">
                            {team.map((player, index) => (
                                <Grid item xs={12}>
                                    <Draggable
                                        draggableId={player.id}
                                        key={player.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <Grid container 
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}>
                                                <Grid item xs={2} {...provided.dragHandleProps}>
                                                    DRAG
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Stats
                                                    key={player.id}
                                                    player={player}
                                                    onHandlePlayer={onHandlePlayer}
                                                    teamName={teamName}
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Draggable>
                            </Grid>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
                </Grid>
            </DragDropContext>
        </div>
    )
}

export default SortableList
