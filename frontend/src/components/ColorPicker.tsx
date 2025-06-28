import '../styles/ColorPicker.scss';

// Define o tipo das props esperadas pelo componente
interface Props {
  onSelect: (color: string) => void; // Função chamada ao selecionar uma cor
}

// Componente funcional que renderiza círculos coloridos para seleção
export const ColorPicker = ({ onSelect }: Props) => {
  // Lista de cores disponíveis para seleção
  const colors = [
    '#ffffff',
    '#f28b82',
    '#fbbc04',
    '#fff475',
    '#ccff90',
    '#a7ffeb',
    '#cbf0f8',
    '#aecbfa',
    '#d7aefb',
    '#e6c9a8',
    '#e8eaed',
  ];

  return (
    <div className="color-picker">
      {/* Mapeia as cores e exibe cada uma como um botão em forma de círculo */}
      {colors.map((color) => (
        <span
          key={color}
          className="color-circle"
          style={{ backgroundColor: color }} // Define a cor de fundo do círculo
          onClick={() => onSelect(color)} // Chama onSelect ao clicar
        />
      ))}
    </div>
  );
};
