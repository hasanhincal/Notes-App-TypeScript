import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Note, NoteData, Tag } from "./types";
import { v4 } from "uuid";
import Layout from "./components/Layout";
import Undefined from "./pages/Undefined";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  // tag oluşturma fonksiyonu:
  const createTag = (tag: Tag): void => {
    setTags([...tags, tag]);
  };

  // not oluşturma fonksiyonu:
  const createNote = (noteData: NoteData): void => {
    // formdan gelen veriye ID ekle
    const newNote: Note = { id: v4(), ...noteData };

    setNotes([...notes, newNote]);
  };

  // not silme fonksiyonu:
  const deleteNote = (id: string): void => {
    setNotes(notes.filter((i) => i.id !== id));
  };

  // not düzenleme fonksiyonu:
  const updateNote = (id: string, updatedData: NoteData): void => {
    const updatedArr = notes.map((note) =>
      note.id === id ? { id, ...updatedData } : note
    );

    setNotes(updatedArr);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={notes} availableTags={tags} />}
        />
        <Route path="/" element={<Undefined />} />
        <Route
          path="/new"
          element={
            <Create
              handleSubmit={createNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/note/:id" element={<Layout notes={notes} />}>
          <Route index element={<Detail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <Edit
                handleSubmit={updateNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
