import React from "react";
import { Star, Github } from 'grommet-icons';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Anchor,
  Text
} from 'grommet';

export const RepositoryCard = (props) => {

    const repo = props.repo; 

      return (
        <Card background='background' margin="medium">
          <CardBody gap="small" align="start" flex="grow">
            <CardHeader pad="small"justify='evenly' level={2}>
              <Text color='text-strong' data-testid={'reponame-' + repo.name}>{repo.name}</Text>
              <Anchor alignSelf="end" label={<Github color="brand"/>} href={repo.html_url}></Anchor>
            </CardHeader>
            <Box pad="small">
            <Text margin={{vertical:'medium'}} size="medium">{repo.description ? repo.description : "No description provided"}</Text>
            <Text size='medium'>{repo.stargazers_count}<Star color="brand"size='small'/></Text>
            <Text size="small">{repo.language ? repo.language : "No identified language"}</Text>
            </Box>
            <CardFooter alignSelf='baseline'pad="small" >
               
            </CardFooter>
            
            
          </CardBody>
        </Card>
       
      );
}