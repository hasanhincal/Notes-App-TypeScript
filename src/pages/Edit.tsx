import { useOutletContext } from "react-router-dom";
import { Note } from "../types";

const Edit = () => {
  const note: Note = useOutletContext();
  return (
    <div className="container py-5">
      <h2>Notu Düzenle</h2>
    </div>
  );
};

export default Edit;
