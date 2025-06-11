import Perfil from "./Perfil";

function PaginaPerfil() {
  return (
    <div className="min-h-screen pt-16 bg-cover bg-center bg-no-repeat perfil-bg">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <Perfil variant="completo" />
      </div>
    </div>
  );
}
export default PaginaPerfil;
