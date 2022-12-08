import { useState, useEffect } from "react";
import LivroContext from "./LivroContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Livro() {
    const [alerta, setAlerta] = useState({ status: "", message: "" })
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", titulo: "",
        autor: "", genero: "" 
    });
    const [listaAutores, setListaAutores] = useState([]);
    const [listaGeneros, setListaGeneros] = useState([]);

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/livros/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const acaoCadastrar = async e => {

        e.preventDefault();

        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/livros`,
            {
                method : metodo,
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(objeto)
            })
            .then(response => response.json())
            .then(json => {
                setAlerta({status : json.status, message : json.message});
                setObjeto(json.objeto);

                if(!editar) {
                    setEditar(true);
                }
            })
        } catch(err) {
            console.log(err.message);
        }
        recuperaLivros();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaLivros = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/livros`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperaAutores = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/autores`)
            .then(response => response.json())
            .then(data => setListaAutores(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperaGeneros = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/generos`)
            .then(response => response.json())
            .then(data => setListaGeneros(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/livros/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                    recuperaLivros();
            } catch (err) {
                console.log('Erro: ' + err);
            }
        }
    }

    useEffect(() => {
        recuperaLivros();
        recuperaAutores();
        recuperaGeneros();
    }, []);

    return (
        <LivroContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaLivros, recuperaAutores, recuperaGeneros,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange,
                listaAutores, listaGeneros
            }
        }>
            <Tabela />
            <Form />
        </LivroContext.Provider>
    );
}

export default Livro;