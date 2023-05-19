import React, { useState } from "react";
import User from "./components/User";
import Repositories from "./components/Repositories";
import { Grommet, Page, Text } from "grommet";

function App() {
  const [noUserFound, setNoUserFound] = useState(false);

  return (
    <div className="App">
      <Grommet full={true}>
        <Page overflow="auto">
          {noUserFound && (
            <Text alignSelf="center" pad="small" data-testid="errortext">
              There are no users available by that name. Please enter a valid
              user and try again.
            </Text>
          )}
          {!noUserFound && (
            <>
              <User setNoUserFound={setNoUserFound} />
              <Repositories />
            </>
          )}
        </Page>
      </Grommet>
    </div>
  );
}

export default App;
