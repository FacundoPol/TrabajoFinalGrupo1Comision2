import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
function LoginForm() {

    const [loginError,setLoginError] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const {login,user,isAuthenticated} = useLogin();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated === true){
            if(user?.rol === 'ADMINISTRATIVO'){
                navigate('/', {replace: true});
            }else if (user?.rol === 'USUARIO'){
                navigate('/', {replace: true});
            } else {
                navigate('/error');
            }
        }
    },[isAuthenticated,navigate,user]);

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setLoginError('');

        if(!username || !password ){
            setLoginError('Por favor, ingresa usuario y contraseña');
            return;
        }

        const result = await login ({username,password});

        if( !result.success){
            setLoginError(result.message || 'Error de autenticacion')
        }
    }


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <h3 className="text-center mb-4">Iniciar Sesión</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
                {loginError && (
                    <Alert variant='danger' className="mt-3">
                        {loginError}
                    </Alert>
                )}
              <Button variant="primary" type="submit" className="w-100">
                Acceder
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;