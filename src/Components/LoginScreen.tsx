import { useState } from 'react';
import axios from 'axios';
import EmailInput from './inputs/EmailInput';
import NameInput from './inputs/NameInput';

function LoginForm()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<any>(null);

    const handleSubmit = async(event: { preventDefault: () => void; }) => {
    event.preventDefault();
        try {
            const response = await axios.post('URL_BACKEND/api/login', 
      {
        email,
        password,
      });
            console.log(response.data);
        // Redirigir al usuario a la página principal después del login exitoso
        }
        catch (error: any) 
        {
          setError(error);
        }
    };

    return (
      < form onSubmit ={ handleSubmit}>
        < h2 > Login </ h2 >
        <EmailInput
         label = "Email"
          name = "email"
          value ={email}
onChange ={ (value) => setEmail(value)}
        />
      < br />
      <NameInput
          label = "Contraseña"
          name = "password"
          value ={password}
onChange ={ (value) => setPassword(value)}
        />
      < br />
      < button type = "submit" > Iniciar sesión </ button >
      { error && < p style ={ { color: 'blue' } }>{ error}</ p >}
    </ form >
  );
}

export default LoginForm;
