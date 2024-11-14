import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Planner } from './pages/Planner';
export default function App() {
  return (
    <main className="px-[25%]">
      <header className="border-b-4 border-primary">
        <h1
          className="text-5xl font-bold my-8"
          test-id="title"
          role="title"
        >Kadivaalam</h1>
      </header>
      <main role="main">
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/session-planner" component={Planner} />
        </Router>
      </main>
    </main>
  );
}