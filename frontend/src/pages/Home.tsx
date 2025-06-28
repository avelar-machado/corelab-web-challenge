// Importa hooks e componentes necessários
import { useEffect, useState } from 'react';
import { useTasks } from '../store/useTasks';
import { TaskCard } from '../components/TaskCard';
import { Header } from '../components/Header';
import { TaskForm } from '../components/TaskForm';
import { TaskFilters } from '../components/TaskFilters';
import { Login } from '../components/Login';
import '../styles/Home.scss';

const Home = () => {
  // Obtém tarefas, função de busca e termo de busca do store global
  const { tasks, fetchTasks, searchTerm } = useTasks();

  // Estado local para saber se o usuário está logado
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userEmail'));

  // Filtros de UI
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Quando estiver logado, busca as tarefas da API
  useEffect(() => {
    if (loggedIn) {
      fetchTasks();
    }
  }, [loggedIn, fetchTasks]);

  // Função de logout: remove o e-mail salvo e recarrega a página
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.location.reload();
  };

  // Termo de busca convertido para minúsculas
  const search = searchTerm.toLowerCase();

  // Aplica os filtros: busca, favoritos e cor
  const filteredTasks = tasks.filter((task) => {
    // Verifica se título ou descrição correspondem à busca
    const matchesSearch =
      (task.title || '').toLowerCase().includes(search) ||
      (task.description || '').toLowerCase().includes(search);

    // Verifica se é favorito, se o filtro estiver ativado
    const matchesFavorite = !showOnlyFavorites || task.isFavorite;

    // Verifica se a cor corresponde à cor selecionada
    const matchesColor = !selectedColor || task.color === selectedColor;

    // Só inclui tarefas que passam nos 3 filtros
    return matchesSearch && matchesFavorite && matchesColor;
  });

  // Divide tarefas filtradas em favoritas e outras
  const favorites = filteredTasks.filter((t) => t.isFavorite);
  const others = filteredTasks.filter((t) => !t.isFavorite);

  return (
    <>
      {/* Se o usuário não estiver logado, mostra o modal de login */}
      {!loggedIn && <Login onLogin={() => setLoggedIn(true)} />}

      {/* Cabeçalho com campo de busca e botão de logout */}
      <Header onLogout={handleLogout} />

      {/* Formulário para criar nova tarefa */}
      <TaskForm />

      {/* Componente de filtros (favoritos + cor) */}
      <TaskFilters
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={setShowOnlyFavorites}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <main className="home">
        {/* Se houver tarefas favoritas, renderiza seção "Favoritas" */}
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

        {/* Se houver outras tarefas (não favoritas), renderiza seção "Outras" */}
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
