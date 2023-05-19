import React from "react";
import { Star, Github } from "grommet-icons";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Anchor,
  Text,
} from "grommet";

// essentially returns a card object for each of the repos that are passed from the repositories class
export const RepositoryCard = (props) => {
  const repo = props.repo;

  return (
    <Card background="background" margin="medium">
      <CardBody gap="small" align="start" flex="grow">
        <CardHeader pad="small" justify="evenly" level={2}>
          <Anchor
            href={repo.html_url}
            data-testid={"reponamebutton-" + repo.name}
          >
            <Text color="text-strong" data-testid={"reponame-" + repo.name}>
              {repo.name}
            </Text>
          </Anchor>
          <Anchor
            alignSelf="end"
            label={<Github color="brand" />}
            href={repo.html_url}
            data-testid={"repobutton-" + repo.name}
          />
        </CardHeader>
        <Box pad="small">
          <Text margin={{ vertical: "medium" }} size="medium">
            {repo.description ? repo.description : "No description provided"}
          </Text>
          <Text size="medium">
            {repo.stargazers_count}
            <Star color="brand" size="small" />
          </Text>
          <Text size="small">
            {repo.language ? repo.language : "No identified language"}
          </Text>
        </Box>
        <CardFooter alignSelf="baseline" pad="small"></CardFooter>
      </CardBody>
    </Card>
  );
};
