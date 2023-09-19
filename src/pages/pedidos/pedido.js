import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

function Pedido() {
    const navigate = useNavigate();
    const { idPedido } = useParams();
    const [pedido, setPedido] = useState({});
    const fetchData = useCallback(
        async (idPedido) => {
            const token = localStorage.getItem('token')?.toString();
            if (!token || !idPedido) {
                navigate('/');
                return;
            }
            const resp = await fetch(
                `${process.env.REACT_APP_API_URL}/api/Pedido/${idPedido}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (resp.status === 401) {
                navigate('/');
                return;
            }
            const json = await resp.json();
            setPedido(json);
        },
        [navigate]
    );

    useEffect(() => {
        fetchData(idPedido).catch(console.error);
    }, [fetchData, idPedido]);

    return (
        <div className="container">
            <div
                className="row align-items-center"
                style={{ minHeight: '80vh' }}
            >
                <div className="col-sm-10 col-md-8 mx-auto">
                    <div className="card text-center">
                        <div className="card-header">Detalles del pedido:</div>
                        <div className="card-body">
                            <h5 className="card-title">
                                Codigo #{pedido.idPedido}
                            </h5>
                            <p className="card-text">{pedido.descripcion}</p>
                        </div>
                        <div className="card-footer text-body-secondary">
                            <p>DNI: {pedido.dni}</p>
                            <p>Cliente: {pedido.nombre}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pedido;
