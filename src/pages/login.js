import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [message, setMessage] = useState('');
    const [cssError, setCssError] = useState('mb-4');

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            let res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/Usuario`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        correo: email,
                        clave: clave
                    }),
                    headers: {
                        Accept: 'applicaiton/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            let resJson = await res.json();
            if (resJson.token) {
                setEmail('');
                setClave('');
                setMessage('Logeado correctamente');
                setCssError('mb-4 text-black');
                localStorage.setItem('token', resJson.token);
                navigate('/pedidos');
            } else {
                setClave('');
                setCssError('mb-4 text-danger');
                setMessage('Correo y/o clave incorrectas');
            }
        } catch (error) {
            setClave('');
            setMessage('Correo y/o clave incorrectas');
        }
    }

    return (
        <div className="container">
            <div
                className="row align-items-center"
                style={{ minHeight: '80vh' }}
            >
                <div className="col-sm-10 col-md-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <h1 className="text-black text-bold text-center">
                                LOGIN
                            </h1>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo:</label>
                            <input
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                                type="password"
                                className="form-control"
                                id="clave"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Ingresar
                        </button>
                        <div className={cssError}>
                            {message ? <p>{message}</p> : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
