import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Note, NoteData, Tag } from "./types";
import { v4 } from "uuid";

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
  console.log(notes);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={notes} availableTags={tags} />}
        />
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

        <Route path="note:id">
          <Route index element={<Detail />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
