import React, { useState, useEffect } from "react"; 
import { Octokit } from "https://cdn.skypack.dev/octokit";
import {
  Box
} from 'grommet';

const Repositories = (props) => {

    //grab the user's name from the path by removing all leading and trailing slashes
    const [pathName] = useState(window.location.pathname.replace(/\//g,''));  
    const [repos, setRepos] = useState(''); 

    //initialize the Octokit variable and set the authentication to the token located in .env.local
    const octokit = new Octokit({
        auth: process.env.REACT_APP_GH
      })

    useEffect(() => {
        async function getRepos() {
          //makes the get request to grab the user's repos based on the username given in the path
          await octokit.request('GET /users/{username}/repos', {
            username:  pathName,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }).then((response) => {
            console.log("Inside repositories");
            console.log(response); 
            console.log(pathName);
            setRepos(response.data);
          });
        }
        getRepos();
      },[]);

      return (
        <Box>
            
        </Box>
      );
}

export default Repositories;