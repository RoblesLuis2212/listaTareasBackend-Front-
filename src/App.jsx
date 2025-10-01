import Footer from "./components/Footer";
import "./index.css"
import FormularioTarea from "./components/FormularioTarea";

function App() {

  return (
    <>
      <h1 className="text-center">Lista de Tareas</h1>
      <main className="container">
        <FormularioTarea />
      </main>
      <Footer />
    </>
  )
}

export default App;