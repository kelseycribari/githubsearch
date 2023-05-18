import React, { useState, useEffect } from "react"; 
import User from './components/User';
import Repositories from './components/Repositories'; 
import {
  Box,
  Header,
  Grommet,
  Page, 
  PageContent} from 'grommet'; 

function App() {

  return (
    <div className="App">
      <Grommet full={true}>
    
        <Page overflow='auto' >
          <User></User>
          <Repositories/>
        </Page>
      </Grommet>
    </div>
  );
}

export default App;