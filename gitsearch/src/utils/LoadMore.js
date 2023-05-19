import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { Button } from "grommet";

// this class provides functionality for the Load more results button.
export const LoadMore = (props) => {
  const queryLink = props.queryLink;
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const octokit = new Octokit({
    auth: process.env.REACT_APP_GH,
  });

  // uses a regex to pull the url that is located in from of rel="next"
  // in the queryLink string. Returns null if no match found (which is okay since button will already be disabled)
  const getNextUrl = () => {
    const regex = /<([^>]+)>;\s*rel="next"/;
    const match = regex.exec(queryLink);
    if (match && match.length >= 2) {
      return match[1];
    }
    return null; // Return null if no match found
  };

  const queryForMoreResults = async () => {
    // check if there is even a next page of results. only make the load more request if there is,
    if (buttonEnabled) {
      console.log(queryLink);
      const firstUrl = getNextUrl();
      console.log(firstUrl);
      // makes a call to get the next page of results that has been parsed from the link header
      await octokit
        .request(firstUrl, {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
        .then((response) => {
          props.setAdditionalRepos(response.data);
          props.setHeaders(response.headers);
        })
        .catch((error) => {
          console.log(
            "No repositories found for that user. Please enter a valid user."
          );
          props.setAdditionalRepos([]);
        });
    }
  };

  useEffect(() => {
    // only enable the load more results button if there is a next page available
    console.log(props.queryLink.includes("next"));
    setButtonEnabled(props.queryLink.includes("next"));
  }, [props.queryLink]);

  return (
    <Button
      data-testid="loadmorebutton"
      alignSelf="center"
      size="large"
      margin={{ bottom: "medium" }}
      label="Load more results"
      disabled={!buttonEnabled}
      onClick={() => {
        queryForMoreResults();
      }}
    ></Button>
  );
};
