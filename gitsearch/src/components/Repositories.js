import React, { useState, useEffect} from "react";
import { Octokit } from  "@octokit/rest"; 
import { RepositoryCard } from '../utils/RepositoryCard';
import { LoadMore } from "../utils/LoadMore";
import {
  Box,
  Grid
} from 'grommet';

const Repositories = (props) => {

    //grab the user's name from the path by removing all leading and trailing slashes
    const [pathName] = useState(window.location.pathname.replace(/\//g,''));  
    const [repos, setRepos] = useState([]); 
    const [headers, setHeaders] = useState([]);


    const setAdditionalRepos = (additionalRepos) => {
        setRepos([...repos, ...additionalRepos]);
    }

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
            setRepos(response.data);
            setHeaders(response.headers); 
          }).catch(error => {
            console.log("No repositories found for that user. Please enter a valid user."); 
            setRepos([]);
          });
        }
        getRepos();
      },[]);

      return (
        <Box>
            <Grid columns={['flex','flex','flex']} 
            rows={[['flex', 'flex','flex']]} gap='medium' fill>
                {repos.map(r => (
                    <RepositoryCard repo={r} key={r.name}/>
                ))}
            </Grid> 
            <LoadMore queryLink={headers.link ? headers.link : ""} setAdditionalRepos={setAdditionalRepos} setHeaders={setHeaders}></LoadMore>
        </Box>
      )
}

export default Repositories;