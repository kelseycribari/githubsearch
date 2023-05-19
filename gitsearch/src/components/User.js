import React, { useState, useEffect } from "react"; 
import { Octokit } from  "@octokit/rest";
import {Github} from 'grommet-icons'; 
import {
    Avatar,
    Anchor,
    Header,
    Text
} from 'grommet';

const User = (props) => {

    //grab the user's name from the path by removing all leading and trailing slashes
    const [pathName] = useState(window.location.pathname.replace(/\//g,''));  
    const [users, setUsers] = useState(''); 

    //initialize the Octokit variable and set the authentication to the token located in .env.local
    const octokit = new Octokit({
        auth: process.env.REACT_APP_GH
      })

    useEffect(() => {
        async function getUsers() {
          //makes the get request to grab the user based on the username given in the path
          await octokit.request('GET /users/{username}', {
            username:  pathName,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }).then((response) => {
            setUsers(response.data);
          }).catch(error => { 
            console.log("No users found at that path. Please enter a valid path and try again.");
            setUsers([]);
        });
        }
        getUsers();
      },[]);

      return (
            <Header fill="horizontal" background='dark-1'>
                <Avatar size='large' src={users.avatar_url} />
                <Text size='xlarge'>{users.login}</Text>
                <Anchor icon={<Github size="large" color="white"/>} href={users.html_url} />
            </Header>
      );
}

export default User;