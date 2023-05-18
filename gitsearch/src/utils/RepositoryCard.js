import React from "react";
import { Star } from 'grommet-icons';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Text
} from 'grommet';

export const RepositoryCard = (props) => {

    const repo = props.repo; 

      return (
        <Card background='background' margin="medium">
          <CardBody gap="small" align="start" flex="grow">
            <CardHeader pad="small"justify='evenly' level={3}>
              <Text>{repo.name}</Text>
            </CardHeader>
            <Box pad="small">
            <Text size="medium">{repo.description ? repo.description : "No description provided"}</Text>
            <Text size='small'>{repo.stargazers_count}<Star size='small'/></Text>
            
            <Text size="xsmall">{repo.language ? repo.language : "No identified language"}</Text>
            </Box>
            
            
          </CardBody>
        </Card>
       
      );
}