import { useState } from 'react'
export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        phone: "",
        password: '',
        email: '',
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch("http://localhost:3000/api/users/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            res.status === 200 ? alert('Registration successful') : alert('Registration failed')
        }
        catch (error) {
            console.log(error)
            alert('Registration failed')
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={(event) => setFormData((prev) => {
                    return {
                        ...prev,
                        username: event.target.value,
                    }
                })} value={formData.username} type='text' placeholder='Username' />
                <input onChange={(event) => setFormData((prev) => {
                    return {
                        ...prev,
                        name: event.target.value,
                    }
                })} value={formData.name} type='text' placeholder='Name' />
                <input onChange={(event) => setFormData((prev) => {
                    return {
                        ...prev,
                        email: event.target.value,
                    }
                })} value={formData.email} type='email' placeholder='Email' />
                <input onChange={(event) => setFormData((prev) => {
                    return {
                        ...prev,
                        phone: event.target.value,
                    }
                })} value={formData.phone} type='text' placeholder='phone' />
                <input onChange={(event) => setFormData((prev) => {
                    return {
                        ...prev,
                        password: event.target.value,
                    }
                })} value={formData.password} type='password' placeholder='Password' />

                <button type='submit'>Register</button>
            </form>
        </div>
    )
}


// make login page 
// add loading state and error state in both pages