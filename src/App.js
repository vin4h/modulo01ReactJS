import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import { Header } from './components/Header';


function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
       const response = await api.post('/projects', {
            title: `Projeto usando React ${Date.now()}`,
            owner: "Vinicius Freitas"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects">

                <ul>
                    {projects.map(project => <li key={project.id}>{project.title} / {project.owner}</li>)}
                </ul>
            </Header>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;