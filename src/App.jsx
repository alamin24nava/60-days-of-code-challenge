import {useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    const [noteTitle, setNoteTitle] = useState('')
    const [notes, setNotes] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editableNote, setEditableNote] = useState(null)
    // hangle on change
    let handleOneChange = (e) => {
        setNoteTitle(e.target.value)
    }
    // handleSubmit
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(noteTitle.trim() === ''){
            return alert('Please Provide some Title')
        }
        editMode ? handleUpdated() : handleCreate();
    }
    // handleCreate
    const handleCreate = () =>{
        const newNote = {
            id: Date.now() + "",
            title: noteTitle,
        };
        setNotes([newNote, ...notes])
        setNoteTitle('')
    }

    // handleRemove
    const handleRemove = (noteId) =>{
        const updateNote = notes.filter((item)=> item.id !== noteId)
        setNotes(updateNote)
    }
    // handle Edit
    const handleEdit = (note) =>{
        setEditMode(true)
        setNoteTitle(note.title)
        setEditableNote(note)
    }
        // handleUpdated
        const handleUpdated = () =>{
            const updatedNotes = notes.map((item) =>{
                if(item.id == editableNote.id){
                    return {...item, title: noteTitle}
                }
                return item;
            })
            setEditMode(false)
            setNotes(updatedNotes)
            setNoteTitle('')
        }
    return (
        <div className="container p-5">
            <form onSubmit={handleSubmit} className="d-flex mb-3">
                <input onChange={handleOneChange} type="text" className="form-control" value={noteTitle} style={{maxWidth:"300px"}}/>
                <button type="submit" className="btn btn-primary">{editMode ? "Update Note" : "Add Note"}</button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Note Title</th>
                        <th scope="col">Edit Note</th>
                        <th scope="col">Remove Note</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            notes.map((note)=>(
                                <tr key={note.id}>
                                    <td>{note.title}</td>
                                    <td><button onClick={()=>handleEdit(note)} className="btn btn-secondary">Edit Note</button> </td>
                                    <td><button onClick={()=>handleRemove(note.id)} className="btn btn-danger">Remove Note</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    )
}

export default App
