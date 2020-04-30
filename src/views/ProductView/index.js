import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdSmartphone } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';


import './styles.css';

export default function ProductView() {
    const [hovering, setHovering] = useState(false);

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
                <div className="table-container">
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
                            <tr>
                                <td>23856234</td>
                                <td>XT2041-1</td>
                                <td>R$ 1.407,12</td>
                                <td>Motorola</td>
                                <td>Preto</td>
                                <td></td>
                            </tr>
                        </tbody>
                        

                    </table>
                </div>
            </div>
        </section>
    );
}
