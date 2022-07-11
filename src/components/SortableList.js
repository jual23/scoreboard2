import {DragDropContext} from 'react-beautiful-dnd'
import {Draggable} from 'react-beautiful-dnd'
import {Droppable} from 'react-beautiful-dnd'
import Grid from '@mui/material/Grid'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import Stats from './Stats'

const SortableList = ({team, teamName, teamBatter, teamId, updateTeam}) => {
    return (
        <div>
            <DragDropContext onDragEnd={updateTeam}>
                <Grid container>
                    <Droppable droppableId={teamId + '_batter'}>
                        {(provided, snapshot) => (
                            <div className="sortingBox">
                                <Grid
                                    container
                                    justifyContent="center"
                                    rowSpacing={2}
                                    ref={provided.innerRef}>
                                    {teamBatter.map((player, index) => (
                                        <Grid key={player.id} item xs={11}>
                                            <Draggable
                                                draggableId={player.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <Grid
                                                        container
                                                        alignItems="center"
                                                        columnGap={1}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}>
                                                        <Grid
                                                            item
                                                            xs={1}
                                                            {...provided.dragHandleProps}>
                                                            <DragIndicatorIcon
                                                                size="large"
                                                                color="info"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stats
                                                                key={player.id}
                                                                player={player}
                                                                teamName={
                                                                    teamName
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                )}
                                            </Draggable>
                                        </Grid>
                                    ))}
                                    {provided.placeholder}
                                </Grid>
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId={teamId + '_reserve'}>
                        {(provided, snapshot) => (
                            <div className="sortingBox">
                                <Grid
                                    container
                                    justifyContent="center"
                                    rowSpacing={2}
                                    ref={provided.innerRef}>
                                    {team.map((player, index) => (
                                        <Grid key={player.id} item xs={11}>
                                            <Draggable
                                                draggableId={player.id}
                                                key={player.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <Grid
                                                        alignItems="center"
                                                        columnGap={1}
                                                        container
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}>
                                                        <Grid
                                                            item
                                                            xs={1}
                                                            {...provided.dragHandleProps}>
                                                            <DragIndicatorIcon
                                                                size="large"
                                                                color="info"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={10}>
                                                            <Stats
                                                                key={player.id}
                                                                player={player}
                                                                teamName={
                                                                    teamName
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                )}
                                            </Draggable>
                                        </Grid>
                                    ))}
                                    {provided.placeholder}
                                </Grid>
                            </div>
                        )}
                    </Droppable>
                </Grid>
            </DragDropContext>
            <Grid container>
                <Grid item xs={10}></Grid>
            </Grid>
        </div>
    )
}

export default SortableList
