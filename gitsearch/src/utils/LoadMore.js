import React, {useEffect, useState} from "react";
import { Octokit } from  "@octokit/rest"; 
import {
  Button
} from 'grommet';

export const LoadMore = (props) => {
    const queryLink = props.queryLink; 
    const [buttonEnabled, setButtonEnabled] = useState(true); 

    const octokit = new Octokit({
        auth: process.env.REACT_APP_GH
      })

     const queryForMoreResults = async () => {
        // check if there is even a next page of results. only make the load more request if there is, 
        if (buttonEnabled) {
            // parse the link to pull out the first URL which is the next URL
            const regex = /<([^>]*)>/;
            const match = queryLink.match(regex);
            var firstUrl = match ? match[1] : null;
            await octokit.request(firstUrl, {
                headers: {
                'X-GitHub-Api-Version': '2022-11-28'
                }
            }).then((response) => {
                props.setAdditionalRepos(response.data);
                props.setHeaders(response.headers); 
            }).catch(error => {
                console.log("No repositories found for that user. Please enter a valid user."); 
                props.setAdditionalRepos([]);
            });
        }
        
    }

    useEffect(() => {
        // only enable the load more results button if there is a next page available
        setButtonEnabled(props.queryLink.includes("next"));
    }, [props.queryLink]);


      return (
       <Button alignSelf="center" size="large" margin={{bottom:'medium'}} 
            label="Load more results"
            disabled={!buttonEnabled}
            onClick={() => {queryForMoreResults()}}></Button>
            
      );
}