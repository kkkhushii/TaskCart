import TaskManager from '../Components/TaskManager';
import { Container } from 'react-bootstrap';
import { KanbanDataContextProvider } from '../ContextApi/KanbanContext'


function kanban() {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center m-5 ">
                <Container className="rounded bg-custom p-2 container">
                    <KanbanDataContextProvider>
                        <TaskManager />
                    </KanbanDataContextProvider>
                </Container>
            </div>
        </>

    )

}
export default kanban
