// title,
// description,
// location,
// salary,
// company,
// skills: jobSkills,
// remote,
// type,

// 'Full Time', 'Part Time', 'Contract', 'Internship']
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
export default function NewJob() {
    const { id } = useParams()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        company: '',
        skills: '',
        remote: false,
        type: 'Full Time',
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('submit')
        try {
            const url = id ? `${import.meta.env.VITE_API_URL}/jobs/${id}` : `${import.meta.env.VITE_API_URL}/jobs`
            const res = await fetch(url, {
                method: id ? "PUT" : "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData),
            })
            console.log(res)
            if (res.status === 200) {
                alert(`Job ${id ? 'updated' : 'created'} successfully`)
            } else { throw new Error(`Job ${id ? 'updated' : 'created'} failed`) }
        }
        catch (error) {
            alert(error)
            console.log(error)
        }
    }
    useEffect(() => {
        if (id) {
            fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        ...formData,
                        title: data.title,
                        description: data.description,
                        location: data.location,
                        salary: data.salary,
                        company: data.company,
                        skills: data.skills.join(', '),
                        remote: data.remote,
                        type: data.type,
                    })
                })
                .catch(error => console.log(error))
        }
    }, [id])
    return (
        <div>
            <h1>New Job</h1>
            <form onSubmit={handleSubmit}>
                <input value={formData.title} type="text" placeholder="title" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <input value={formData.description} type="text" placeholder="description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <input value={formData.location} type="text" placeholder="location" onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                <input value={formData.salary} type="number" placeholder="salary" onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
                <input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder='Company' />
                <input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} placeholder='skills' />
                <input id='remote' checked={formData.remote} type="checkbox" onChange={(e) => setFormData({ ...formData, remote: e.target.checked })} />
                <label htmlFor='remote'>Remote</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                    <option value="Full Time">Full time</option>
                    <option value="Part Time">Part time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}