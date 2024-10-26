import { CharacterProvider } from './contexts/CharacterContext';
import { AppRouter } from './router';

function App() {
  return (
    <CharacterProvider>
      <AppRouter />
    </CharacterProvider>
  );
}

export default App;