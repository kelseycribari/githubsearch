import './App.css';
import React, {useState, useEffect} from "react"; 
import { Octokit } from "https://cdn.skypack.dev/octokit";
import {
  Box,
  Data,
  Header,
  List,
  Grommet,
  Page } from 'grommet'; 

function App() {

  const [users, setUsers] = useState(''); 

  const octokit = new Octokit({
    auth: process.env.REACT_APP_GH
  })

   
  useEffect(() => {
    async function getUsers() {
      await octokit.request('GET /users/{username}', {
        username: 'kelseycribari',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }).then((response) => {
        console.log(response); 
        setUsers(response.data);
      });
    }
    getUsers();
  },[]);



  return (
    <div className="App">
      <Grommet full={true}>
        <Page>
          <Box>
            <Header fill="horizontal"
              pad={{ horizontal: 'medium', vertical: 'small' }}
              background="background-front">
            </Header>
          </Box>
        </Page>
      </Grommet>
    </div>
  );
}

export default App;
