import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  //set a state variable and changer function
  const [reposit, setReposit] = useState([]);

  //run a GET request everytime the state is changed and at the beginning
  useEffect(() =>{
    api.get('repositories').then(response => {
      setReposit(response.data);
    });
  }, []);

  //this function add a new repo
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Mais um repo ${Date.now()}`,
      url: `www.${Date.now()}.com.br`,
      techs: [
        "tech 1",
        "tech 2",
        "tech 3"
      ]
    });

    const repo = response.data;

    //set the new repo inside the state variable
    setReposit([...reposit, repo]);
  }

  //this function removes a repo from the front and back end
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setReposit(reposit.filter(
      reposit => reposit.id != id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {reposit.map(repo => (
        <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
        </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
