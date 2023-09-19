import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Pedido from './pages/pedidos/pedido';
import Pedidos from './pages/pedidos/pedidos';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/pedidos/:idPedido" element={<Pedido />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
