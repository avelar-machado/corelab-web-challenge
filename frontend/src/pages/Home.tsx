import { useEffect, useState } from 'react';
import { useTasks } from '../store/useTasks';
import { TaskCard } from '../components/TaskCard';
import { Header } from '../components/Header';
import { TaskForm } from '../components/TaskForm';
import { Login } from '../components/Login';
import '../styles/Home.scss';

const Home = () => {
  const { tasks, fetchTasks, searchTerm } = useTasks();

  // Verifica se o usuário já está logado com base no e-mail salvo no localStorage
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userEmail'));

  // Ao entrar ou alterar estado de login, busca as tarefas se logado
  useEffect(() => {
    if (loggedIn) {
      fetchTasks();
    }
  }, [loggedIn, fetchTasks]);

  // Função para sair: remove e-mail do localStorage e recarrega a página
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.location.reload();
  };

  // Termo de busca normalizado
  const search = searchTerm.toLowerCase();

  // Filtra as tarefas com base no termo de busca (título ou descrição)
  const filteredTasks = tasks.filter(
    (task) =>
      (task.title || '').toLowerCase().includes(search) ||
      (task.description || '').toLowerCase().includes(search)
  );

  // Separa tarefas favoritas e não favoritas
  const favorites = filteredTasks.filter((t) => t.isFavorite);
  const others = filteredTasks.filter((t) => !t.isFavorite);

  return (
    <>
      {/* Se não estiver logado, exibe o modal de login */}
      {!loggedIn && <Login onLogin={() => setLoggedIn(true)} />}

      {/* Cabeçalho com campo de busca e botão de logout */}
      <Header onLogout={handleLogout} />

      {/* Formulário para criar nova tarefa */}
      <TaskForm />

      {/* Lista principal de tarefas */}
      <main className="home">
        {/* Se houver favoritas, exibe seção */}
        {favorites.length > 0 && (
          <div className="section">
            <h2>Favoritas</h2>
            <div className="task-list">
              {favorites.map((task) => (
                <TaskCard key={task._id} {...task} />
              ))}
            </div>
          </div>
        )}

        {/* Se houver outras tarefas, exibe seção */}
        {others.length > 0 && (
          <div className="section">
            <h2 className="other">Outras</h2>
            <div className="task-list">
              {others.map((task) => (
                <TaskCard key={task._id} {...task} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
