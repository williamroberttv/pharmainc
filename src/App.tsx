import Routes from './routes/routes'
import { ListUsersProvider } from './context/listUsersContext'

import GlobalStyles from './styles/global'

function App() {
  return (
    <ListUsersProvider>
      <Routes/>
      <GlobalStyles/>
    </ListUsersProvider>
  );
}

export default App;
