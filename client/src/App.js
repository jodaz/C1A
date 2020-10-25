import React, { useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import { VotationCentersList, VotationCentersCreate } from './components/VotationCenters';
import { VotersList } from './components/Voters';
import Login from './components/Login';
import { customRoutes } from './utils';
import { Provider } from 'react-redux';
import { isEmpty } from './utils';

import {
  store,
  dataProvider,
  i18nProvider,
  history
} from './initializers';

function App() {

  useEffect(() => {
    if (isEmpty(localStorage.votingApp) && window.location.pathname == 'dashboard') {
      history.push('/login');
    }
  }, []);

  return (
    <Provider
      store={store}
    >
      <Admin
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        loginPage={Login}
        customRoutes={customRoutes}
        history={history}
        title='Vote'
      >
        <Resource 
          name="votation-centers"
          list={VotationCentersList}
          create={VotationCentersCreate}
          options={{ label: 'Centros de votación' }}
        />
        <Resource 
          name="voters" 
          list={VotersList}
          options={{ label: 'Votantes' }}
        />
      </Admin>
    </Provider>
  );
}

export default App;
