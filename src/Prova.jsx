import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import "./prova.css"

export default function Prova() {
    
    const { id } = useParams()
    const [questao, setQuestao] = useState(null)
    const [questaoIndex, setQuestaoIndex] = useState(1)

    async function buscarQuestao() {
        const respostaQuestao = await fetch(
            `https://api.enem.dev/v1/exams/${id}/questions/${questaoIndex}`
        )

        const dadosQuestao = await respostaQuestao.json()
        setQuestao(dadosQuestao)
    }

    function avancar() {
        if (questaoIndex === 180) {
            alert('Não é possível avançar 😒')
        } else {
            setQuestaoIndex(questaoIndex + 1)
        }
    }

    function voltar() {
        if (questaoIndex === 1) {
            alert('Não é possível voltar 😒')
        } else {
            setQuestaoIndex(questaoIndex - 1)
        }
    }

    function verResposta(questao) {
        alert(`Resposta Correta: ${questao.correctAlternative}`)
    }

    useEffect(() => {
        buscarQuestao()
    }, [questaoIndex])

    return (
        questao ? 

            <div className="prova-page">

                <header className="prova-header">

                    <div className="prova-logo">
                        <span>ENEM</span>
                        <small>QUESTÕES</small>
                    </div>

                    <div className="questao-contador">
                        <span>QUESTÃO</span>
                        <strong>{questaoIndex}</strong>
                        <small>/ 180</small>
                    </div>

                </header>


                <main className="prova-container">

                    <div className="questao-card">

                        <div className="questao-topo">

                            <span className="questao-tag">
                                QUESTÃO {questaoIndex}
                            </span>

                            <span className="questao-id">
                                ENEM {id}
                            </span>

                        </div>


                        <h1>{questao.title}</h1>


                        <div className="questao-contexto">
                            <p>{questao.context}</p>
                        </div>


                        <div className="alternativas-intro">
                            <b>
                                {questao.alternativesIntroduction}
                            </b>
                        </div>


                        <ul className="alternativas">

                            {questao.alternatives.map((alt, i) => {

                                return (

                                    <li key={i}>

                                        <span className="letra">
                                            {String.fromCharCode(65 + i)}
                                        </span>

                                        <span className="texto-alternativa">
                                            {alt.text}
                                        </span>

                                    </li>

                                )

                            })}

                        </ul>


                        <div className="acoes">

                            <button
                                className="btn-resposta"
                                onClick={() => verResposta(questao)}
                            >
                                <span>💡</span>
                                Ver resposta
                            </button>


                            <div className="navegacao">

                                <button
                                    className="btn-voltar"
                                    onClick={voltar}
                                >
                                    ← Voltar
                                </button>


                                <button
                                    className="btn-avancar"
                                    onClick={avancar}
                                >
                                    Avançar →
                                </button>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        : null
    )
}