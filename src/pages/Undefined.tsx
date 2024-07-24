import { Link } from "react-router-dom";

const Undefined = () => {
  return (
    <div className="container py-5 mx-auto">
      <h1>404</h1>
      <p>Aradığınız sayfa bulunamadı!...</p>
      <div>
        Anasayfaya gidip devam edebilirsiniz...
        <Link to={"/"}>Anasayfaya Git</Link>
      </div>
    </div>
  );
};

export default Undefined;
