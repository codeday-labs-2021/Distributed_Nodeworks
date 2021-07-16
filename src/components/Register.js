import React, { useState, useEffect} from 'react';

// im just testing at the moment, this will need to be polished later
export default function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function Submit(){
        const user = {
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({'username': username, 'email': email, 'password': password})
        }
        await fetch('/api/v1/register', user)
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }

    return(
        <div style={{display: 'block', textAlign: 'center'}}>
            <div style={{display: 'inline-block'}}>
                <form style={{display: 'flex', flexDirection: 'column', width: '25vw', alignItems: 'center'}}>
                    <input 
                        required 
                        type="text" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                        />
                    <input 
                        required 
                        type="text" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        />
                    <input 
                        required 
                        type="text" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        />
                    <button
                        type="submit"
                        onClick={Submit}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}