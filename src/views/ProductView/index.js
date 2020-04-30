import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import { MdSmartphone } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import { FaPen } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';


import './styles.css';

export default function ProductView() {
    const availableColors = [
        { id: "BLACK", text: "Preto" },
        { id: "WHITE", text: "Branco" },
        { id: "GOLD", text: "Dourado" },
        { id: "PINK", text: "Rosa" }
    ]

    const [hovering, setHovering] = useState(false);
    const [results, setResults] = useState([]);
    const [mount, setMount] = useState(0);

    useEffect(() => {
        getData();
    }, [mount]);

    async function getData() {
        await axios.get("https://phones--melhorcom.repl.co/phone", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpf': "06002912436"
            }
        }).then(response => {
            setResults(response.data);
        }).catch(error => {
            alert("Erro!");
        });
    }

    async function handleDelete(id) {
        await axios.delete("https://phones--melhorcom.repl.co/phone/" + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpf': "06002912436"
            }
        }).then(response => {
            alert("Item removido com sucesso!");
            setMount(mount+1);
        }).catch(error => {
            alert("Erro: "+error);
        })
    }

    function handleEditRequest(id) {
        window.location.href = "http://localhost:3000/edit/" + id; 
    }

    return (
        <section>
            <div className="product-container">
                <div className="table-header-container">
                    <h2>Produtos</h2>
                    <Link
                        to="/add" 
                        className="button"
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        <div className="icon-container">
                            <FiPlus 
                                size="17"
                                style={{ transition: "0.2s" }}
                                color={hovering ? "#DAE3ED" : "#1D1D1D"}
                            />
                            <MdSmartphone 
                                size="24"
                                style={{marginLeft:"-2px", transition: "0.2s"}}
                                color={hovering ? "#DAE3ED" : "#1D1D1D"}
                            />
                        </div>
                        <p>ADICIONAR</p>
                    </Link>
                </div>
                <div style={{overflowX: "scroll"}} className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Modelo</th>
                                <th>Preço</th>
                                <th>Marca</th>
                                <th>Cor</th>
                                <th width="30%" ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (
                                <tr key={result["_id"]}>
                                    <td>{result.code[0]}</td>
                                    <td>{result.model}</td>
                                    <td>R$ {result.price.toFixed(2)}</td>
                                    <td>{result.brand}</td>
                                    <td>{availableColors.find(color => color.id === result.color).text}</td>
                                    <td>
                                        <button type="button" onClick={() => handleEditRequest(result["_id"])} >
                                            <FaPen style={{ marginRight: "32px" }} color="#1D1D1D" size="15" />
                                        </button>
                                        <button type="button" onClick={() => handleDelete(result["_id"])} >
                                            <IoMdTrash color="#1D1D1D" size="20" />
                                        </button>

                                    </td>
                                </tr>
                            ))} 
                        </tbody>
                        

                    </table>
                </div>
            </div>
        </section>
    );
}
