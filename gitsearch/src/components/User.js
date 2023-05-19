import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import { Github } from "grommet-icons";
import { Avatar, Anchor, Header, Text } from "grommet";

const User = (props) => {
  //grab the user's name from the path by removing all leading and trailing slashes
  const [pathName] = useState(window.location.pathname.replace(/\//g, ""));
  const [users, setUsers] = useState("");

  //initialize the Octokit variable and set the authentication to the token located in .env
  const octokit = new Octokit({
    auth: process.env.REACT_APP_GH,
  });

  const getUsers = async () => {
    //makes the get request to grab the user based on the username given in the path
    await octokit
      .request("GET /users/{username}", {
        username: pathName,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        // make sure to set the variable back to false since a new user has been found
        props.setNoUserFound(false);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(
          "No users found at that path. Please enter a valid path and try again."
        );
        // setting the no user found variable to ensure the page only displays the error text
        props.setNoUserFound(true);
        setUsers([]);
      });
  };

  useEffect(() => {
    getUsers();
    // disabling because the empty array is what we want.
    //ensures that the users call only gets made when the page is loaded which is the correct behavior
    // eslint-disable-next-line
  }, []);

  return (
    <Header fill="horizontal" background="dark-1">
      <Avatar size="large" src={users.avatar_url} />
      <Anchor href={users.html_url} data-testid="usernamebutton">
        <Text color="white" size="xlarge" data-testid="username">
          {users.login}
        </Text>
      </Anchor>
      <Anchor
        icon={<Github size="large" color="white" />}
        href={users.html_url}
        data-testid="userbutton"
      />
    </Header>
  );
};

export default User;
