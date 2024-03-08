import { useState } from "react";
import NewProjects from "./components/NewProjects";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProjects from "./components/SelectedProjects";

function App() {
  const [projectsState , setProjectState] = useState({
    selectedProjectsId : undefined,
    projects: [],
    tasks : [],
  })

  function handleAddTasks(text){
    setProjectState(prevData => {
      const taskId = Math.random();
      const newTasks = {
        text : text,
        projectId : prevData.selectedProjectsId,
        id : taskId
  }
      return{
        ...prevData,
        tasks : [newTasks,...prevData.tasks]
      }
    })
  }

  function handleDeleteTasks(id){
    setProjectState((prevState) => {
      return{
        ...prevState,
        tasks : prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  function handleStartAddProjects(){
    setProjectState( (prevState) => {
      return{
        ...prevState,
        selectedProjectsId : null
      }
    })
  }
  function handleCancelAddProjects(){
    setProjectState( (prevState) => {
      return{
        ...prevState,
        selectedProjectsId : undefined,
      }
    } )
  }
  function handleSelectProjects(id){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selectedProjectsId : id,
      }
    })
  }
  function handleDeleteProjects(){
    setProjectState((prevState) => {
      return{
        ...prevState,
        selectedProjectsId : undefined,
        projects : prevState.projects.filter((project) => project.id !== prevState.selectedProjectsId)
      }
    })
  }
  function handleAddProjects(projectData){
    setProjectState(prevData => {
      const newProject = {
        ...projectData,
        id : Math.random(),
  }
      return{
        ...prevData,
        selectedProjectsId : undefined,
        projects : [...prevData.projects , newProject]
      }
    })
  }
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectsId)
  let content = <SelectedProjects project={selectedProject} onDelete={handleDeleteProjects} onAddTasks = {handleAddTasks} onDeleteTasks = {handleDeleteTasks} tasks={projectsState.tasks} />;

  if(projectsState.selectedProjectsId === null){
    content = <NewProjects onAdd={handleAddProjects} onCancel={handleCancelAddProjects} />
  }else if(projectsState.selectedProjectsId === undefined){
    content = <NoProjectSelected onStartAddProjects={handleStartAddProjects} />
  }

  return (
    <main className="h-screen my-8 flex gap-8" >
      <ProjectSidebar selectedProjectId={projectsState.selectedProjectsId} onStartAddProjects={handleStartAddProjects}
       projects={projectsState.projects} 
       onSelectProject = {handleSelectProjects}/>
      {content}
    </main>
  );
}

export default App;
