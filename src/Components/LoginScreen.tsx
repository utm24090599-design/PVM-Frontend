import { useState } from 'react';
import axios from 'axios';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';

function LoginForm()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Error| string | null>(null);

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
        catch (error) {
  if (error instanceof Error) {
    setError(error); // Error object
  } else {
    setError("Unknown error"); // fallback string
  }
}
    };

return (
< form onSubmit ={handleSubmit}>
< h2 > Login </ h2 >
<EmailInput
label = "Email"
name = "email"
value ={email}
onChange ={ (value, valid) => setEmail(value)}
/>
< br />
<PasswordInput
label = "Contraseña"
name = "password"
value ={password}
onChange ={(value, valid) => setPassword(value)}
/>
< br />
< button type = "submit" > Iniciar sesión </ button >
{ error && < p style ={ { color: 'red' } }>{ error instanceof Error ? error.message : error}</ p >}
</ form >
  );
}

export default LoginForm;
