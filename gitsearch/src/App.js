import './App.css';
import React, { useState, useEffect } from "react"; 
import User from './components/User';
import Repositories from './components/Repositories'; 
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
          <Repositories/>
        </Page>
      </Grommet>
    </div>
  );
}

export default App;
