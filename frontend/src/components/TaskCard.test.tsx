import { render, screen } from '@testing-library/react';
import { TaskCard } from './TaskCard';

describe('TaskCard', () => {
  const task = {
    _id: '123',
    title: 'Corelab',
    description: 'Casos de testes',
    color: '#ffffff',
    isFavorite: false,
    userEmail: 'avelar@gmail.com',
  };

  it('renderiza o título e descrição da tarefa', () => {
    render(<TaskCard {...task} />);
    expect(screen.getByText('Casos de testes')).toBeInTheDocument();
    expect(screen.getByText('Casos de testes')).toBeInTheDocument();
  });
});
