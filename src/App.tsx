import Sidebar from "./components/Sidebar"
import QuillEditor from "./QuillEditor"
import Note from "./QuillEditor"



function App() {


  return (
    <>
       <div className="flex items-start">
       <Sidebar />
       <QuillEditor />
       </div>
    </>
  )
}

export default App
