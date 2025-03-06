import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if (res.status === 200) {
                alert('Login successful')
                const data = await res.json()
                console.log(data)
                const token = data.token
                localStorage.setItem('token', token)
                navigate('/newJob')
            } else { throw new Error('Login failed') }

        }
        catch (e) { console.log(e); alert('Login failed') }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input value={formData.email} type="text" placeholder="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input value={formData.password} type="password" placeholder="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
} 