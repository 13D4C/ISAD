import styles from '../styles/ColorPicker.module.css';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const colors = ['#ffcc00', '#ff66cc', '#66cc66', '#ff9966', '#6699ff', '#9966ff'];

  return (
    <div className={styles.colorPicker}>
      {colors.map(color => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
