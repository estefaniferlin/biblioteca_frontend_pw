import { useState, useEffect } from "react";
import AutorContext from "./AutorContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Autor() {
    const [alerta, setAlerta] = useState({ status: "", message: "" })
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: ""
    });

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/autores/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const acaoCadastrar = async e => {

        e.preventDefault();

        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/autores`,
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
        recuperaAutores();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaAutores = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/autores`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/autores/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaAutores();
            } catch (err) {
                console.log('Erro: ' + err);
            }
        }
    }

    useEffect(() => {
        recuperaAutores();
    }, []);

    return (
        <AutorContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaAutores,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange
            }
        }>
            <Tabela />
            <Form />
        </AutorContext.Provider>
    );
}

export default Autor;