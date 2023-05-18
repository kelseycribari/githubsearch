import React, { useState, useEffect, useContext } from "react";
import { Octokit } from  "@octokit/rest"; 
import { RepositoryCard } from '../utils/RepositoryCard';
import {
  Box,
  Grid,
  ResponsiveContext,
  Text
} from 'grommet';

const Repositories = (props) => {

    //grab the user's name from the path by removing all leading and trailing slashes
    const [pathName] = useState(window.location.pathname.replace(/\//g,''));  
    const [repos, setRepos] = useState([]); 
    const size = useContext(ResponsiveContext); 

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
          }).catch(error => {
            console.log("No repositories found for that user. Please enter a valid user."); 
            setRepos([]);
          });
        }
        getRepos();
      },[]);

      return (
        <Box>
            <Grid columns={!['xsmall','small'].includes(size) ? 'medium' : '100%'} 
            rows={[['small', 'small']]} gap='medium' fill>
                {repos.map(r => (
                    <RepositoryCard repo={r} key={r.name}/>
                ))}
            </Grid> 
        </Box>
      );
}

export default Repositories;