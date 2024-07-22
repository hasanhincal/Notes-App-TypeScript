import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

const Layout = ({ notes }: { notes: Note[] }) => {
  // URL'deki ıd'yi al:
  const { id } = useParams();

  // notes dizisinde elemanı ara:
  const found = notes.find((note) => note.id === id);

  // bulamassa anasayfaya yönlendir:
  if (!found) return <Navigate to="/" replace />;
  // parent route içerisinde alt route ' u renderla
  return <Outlet context={found} />;
};

export default Layout;
