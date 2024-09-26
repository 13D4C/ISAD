import ColorPicker from './ColorPicker';
import styles from '../styles/CourseModal.module.css';

interface CourseModalProps {
  course: string;
  onClose: () => void;
  onColorChange: (color: string) => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onColorChange }) => {
  return (
    <div className={styles.modal}>
      <h2>{course}</h2>
      <p>เรียนรู้วิธีการสร้างเสน่ห์...</p>
      <div>
        <label>เลือกสีในตาราง:</label>
        <ColorPicker onColorChange={onColorChange} />
      </div>
      <div className={styles.actions}>
        <button onClick={onClose}>ซ่อนตาราง</button>
        <button className={styles.danger}>นำออกจากวิชาที่เลือก</button>
      </div>
    </div>
  );
};

export default CourseModal;