import { useContext } from 'react'
import '../Components/Style.css'
import Header from './Header/Header'
import KanbanDataContext from '../ContextApi/KanbanContext'
import CategoryTaskList from './CategoryTaskList'


function TaskManager() {

  const { todoCategories } = useContext(KanbanDataContext);
  return (
    <>
      <Header />
      <div className='category-container'>
        {todoCategories.map(category => (
          <CategoryTaskList
            key={category.id}
            id={category.id}

          />
        ))}
      </div >

    </>
  )
}

export default TaskManager
