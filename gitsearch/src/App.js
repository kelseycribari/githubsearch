import './App.css';
import React, { useState, useEffect } from "react"; 
import User from './components/User';
import {
  Box,
  Header,
  Grommet,
  Page } from 'grommet'; 

function App() {

  return (
    <div className="App">
      <Grommet full={true}>
        <Page>
          <Box>
            <Header fill="horizontal"
              pad={{ horizontal: 'medium', vertical: 'small' }}
              background="background-front">
            </Header>
          </Box>
          <User/>
        </Page>
      </Grommet>
    </div>
  );
}

export default App;
