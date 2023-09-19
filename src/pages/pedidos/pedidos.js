import { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Pedidos() {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [idPedido, setIdPedido] = useState('');
    const [dni, setDni] = useState('');
    const fetchData = useCallback(async () => {
        const token = localStorage.getItem('token')?.toString();
        if (!token) {
            navigate('/');
            return;
        }
        let url = `${process.env.REACT_APP_API_URL}/api/Pedido`;
        if (idPedido && idPedido !== '') {
            url += `?IdPedido=${idPedido}`;
        }
        if (dni && dni !== '') {
            if (idPedido && idPedido !== '') {
                url += '&';
            } else {
                url += '?';
            }
            url += `Dni=${dni}`;
        }
        try {
            const resp = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (resp.status === 401) {
                navigate('/');
                return;
            }
            const json = await resp.json();
            setPedidos(json);
        } catch (error) {
            console.log(error);
        }
    }, [navigate, dni, idPedido]);

    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData]);

    const handleClick = async (evt) => {
        evt.preventDefault();
        if (!idPedido || !dni) {
            return;
        }
        fetchData().catch(console.error);
    };

    const handleKeyUpDni = (evt) => {
        if (idPedido && idPedido !== '') {
            setIdPedido('');
        }
    };
    const handleKeyUpIdPedido = (evt) => {
        if (dni && dni !== '') {
            setDni('');
        }
    };

    return (
        <div className="container">
            <div
                className="row align-items-center"
                style={{ minHeight: '90vh' }}
            >
                <div className="col-sm-10 col-md-8 mx-auto">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th colSpan="3">
                                    <h1 className="text-center">
                                        Lista de Pedidos
                                    </h1>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <input
                                        className="form-control"
                                        value={idPedido}
                                        onKeyUp={handleKeyUpIdPedido}
                                        onChange={(e) =>
                                            setIdPedido(e.target.value)
                                        }
                                        placeholder="Buscar por Codigo"
                                    />
                                </th>
                                <th>
                                    <input
                                        className="form-control"
                                        value={dni}
                                        onKeyUp={handleKeyUpDni}
                                        onChange={(e) => setDni(e.target.value)}
                                        placeholder="Buscar por DNI"
                                    />
                                </th>
                                <th>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleClick}
                                    >
                                        Buscar
                                    </button>
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">Codigo</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((pedido, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{pedido.idPedido}</td>
                                        <td>{pedido.descripcion}</td>
                                        <td>
                                            <Link
                                                to={
                                                    '/pedidos/' +
                                                    pedido.idPedido
                                                }
                                                className="btn btn-info"
                                            >
                                                Detalles
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Pedidos;
