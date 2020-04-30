import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './styles.css';

export default function AddProductView(props) {
    const availableColors = [
        { id: "BLACK", text: "Preto" },
        { id: "WHITE", text: "Branco" },
        { id: "GOLD", text: "Dourado" },
        { id: "PINK", text: "Rosa" }
    ]

    const editId = props.match.params.id;
    
    const [hovering, setHovering] = useState(false);
    const [hovering1, setHovering1] = useState(false);
    const [model, setModel] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState(availableColors[0]);
    const [price, setPrice] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [editResult, setEditResult] = useState([]);

    useEffect(() => {
        if(editId) {
            handleGetInfo();
        }
    }, [editId]);

    function dateParse(string) {
        var aux = string.split("-");
        var day = parseInt(aux[2]);
        var month = parseInt(aux[1]);
        var year = parseInt(aux[0]);
        aux = new Date(year, (month - 1), day);
        return aux.getDate() + "/" + (aux.getMonth() + 1) + "/" + aux.getFullYear();
    }

    function dateParseInput(date) {
        var aux = new Date(date);
        return aux.getFullYear() + "-" + (aux.getMonth() + 1) + "-" + aux.getDate();
    }

    function handleBack() {
        window.location.href = "http://localhost:3000/";
    }

    async function handleGetInfo() {
        await axios.get("https://phones--melhorcom.repl.co/phone/"+editId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpf': "06002912436"
            }
        }).then(response => {
            setEditResult(response.data);
            setModel(response.data.model);
            setBrand(response.data.brand);
            setColor(availableColors.find(color => color.id === response.data.color));
            setPrice(response.data.price);
            setStartDate(dateParseInput(response.data.date));
            setEndDate(dateParseInput(response.data.endDate));
        }).catch(error => {
            alert("Erro!");
        });
    }

    async function handleEdit(event) {
        event.preventDefault();

        await axios.patch("https://phones--melhorcom.repl.co/phone/" + editId, {
            model,
            brand,
            price,
            "date": dateParse(startDate),
            "endDate": dateParse(endDate),
            "color": color.id,
            "code": editResult.code
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpf': "06002912436"
            }
        }).then(response => {
            alert("Produto editado com sucesso!");
            setTimeout(function () {
                window.location.href = "http://localhost:3000/";
            }, 1000);
        }).catch(error => {
            alert("Erro!");
        });
    }

    function handleSelect(event) {
        setColor(availableColors.find(color => color.id === event.target.value));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        await axios.post("https://phones--melhorcom.repl.co/phone", {
            model,
            brand,
            price,
            "date": dateParse(startDate),
            "endDate": dateParse(endDate),
            "color": color.id,
            "code": randomCode()
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpf': "06002912436"
            }
        }).then(response => {
            alert("Produto cadastrado com sucesso!");
            setTimeout(function () {
                window.location.href = "http://localhost:3000/";
            }, 1000);
        }).catch(error => {
            alert("Erro!");
        });
    }

    function randomCode() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = 8; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    return (
        <section>
            <div className="form-container">
                <h2>Detalhes do produto</h2>
                <form onSubmit={editId ? handleEdit :handleSubmit}>
                    <ul>
                        <li>
                            <label>Modelo</label>
                            <input
                                value={editId ? model : ""}
                                type="text"
                                required pattern="[^\s]+"
                                minLength="2"
                                maxLength="255"
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </li>
                        <li>
                            <label>Marca</label>
                            <input 
                                value={editId ? brand : ""}
                                type="text"
                                required pattern="[^\s]+"
                                minLength="2"
                                maxLength="255"
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </li>
                        <li>
                            <label>Cor</label>
                            <select value={color.id} onChange={handleSelect} >
                                {availableColors.map(color => (
                                    <option key={color.id} value={color.id}>
                                        {color.text}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <label>Preço</label>
                            <input 
                                value={editId ? price : ""} 
                                onChange={(e) => setPrice(e.target.value)} 
                                minLength="1" 
                                type="number" 
                                min="0"
                                step="0.01"
                            />
                        </li>
                        <li>
                            <label>Inicio das vendas</label>
                            <input
                                value={editId ? startDate : ""}
                                onChange={(e) => setStartDate(e.target.value)}
                                type="date"
                                min="2019-01-01"
                                required
                            />
                        </li>
                        <li>
                            <label>Fim das vendas</label>
                            <input
                                value={editId ? endDate : ""}
                                onChange={(e) => setEndDate(e.target.value)}
                                type="date"
                                min={startDate}
                                required
                            />
                        </li>
                        <li>
                            <label>
                                <button 
                                    className={hovering ? "active" : ""}
                                    onClick={() => handleBack}
                                    onMouseEnter={() => setHovering(true)}
                                    onMouseLeave={() => setHovering(false)}
                                >VOLTAR</button>
                                <button
                                    className={hovering1 ? "active": ""}
                                    onMouseEnter={() => setHovering1(true)}
                                    onMouseLeave={() => setHovering1(false)}
                                    type="submit"
                                >SALVAR</button>
                            </label>
                        </li>
                    </ul>
                </form>
            </div>
        </section>
    );
}
