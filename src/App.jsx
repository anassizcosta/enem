import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function App() {
    const [provas, setProvas] = useState([]);

    async function buscarProvas() {
        const respostaProvas = await fetch(
            "https://api.enem.dev/v1/exams"
        );

        const dadosProvas = await respostaProvas.json();

        setProvas(dadosProvas);
    }

    useEffect(() => {
        buscarProvas();
    }, []);

    return (
        <div className="app">

            <header className="header">
                <div className="logo">
                    <span>ENEM</span>
                    <small>QUESTÕES</small>
                </div>

                <h1>App ENEM</h1>

                <p>
                    Prepare-se para o ENEM praticando com provas anteriores
                </p>
            </header>

            <main className="provas-container">

                <h2 className="titulo-provas">
                    PROVAS ANTERIORES
                </h2>

                <div className="provas-lista">

                    {provas.map((prova, i) => (

                        <div className="prova-item" key={i}>

                            <div className="numero-prova">
                                {i + 1}
                            </div>

                            <div className="prova-info">

                                <h3>
                                    {prova.title}
                                </h3>

                                <Link
                                    className="botao-acessar"
                                    to={`/prova/${prova.year}`}
                                >
                                    Acessar prova
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            </main>

        </div>
    );
}