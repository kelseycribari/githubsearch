import React, { useState, useEffect } from "react"; 
import { Octokit } from "https://cdn.skypack.dev/octokit";
import {Github} from 'grommet-icons'; 
import {
    Avatar,
    Box,
    Button,
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
            console.log(response); 
            console.log(pathName);
            setUsers(response.data);
          });
        }
        getUsers();
      },[]);

      return (
            <Box pad='medium' fill="horizontal">
                <Header background="neutral-3" round="large" sticky="scrollUp">
                <Avatar src={users.avatar_url} />
                <Text>{users.login}</Text>
                    <Button icon={<Github />} hoverIndicator />
                </Header>
            </Box>
      );
}

export default User;