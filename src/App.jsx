import Navbar from './components/Navbar';
import Main from './components/Main';
import TodoList from './components/Todos/Todos';
import { TodoProvider } from './context/TodoState';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';


const App = () => {


  return (
    <div className="App">
      <Navbar />
      <Main />
      <TodoProvider>
        <TodoList />
        <AddTodo />
      </TodoProvider>
      <Footer />
    </div>
  )
}

export default App
