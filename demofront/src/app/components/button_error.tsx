
import { useState } from 'react';

const AlertBox: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    visible ? (
      <div style={styles.container}>
        <div style={styles.box}>
          <p style={styles.text}>รหัสผู้ใช้ไม่ถูกต้อง</p>
          <button style={styles.button} onClick={handleClose}>Ok</button>
        </div>
      </div>
    ) : null
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  // ใช้ความสูงเต็มหน้าจอเพื่อให้อยู่ตรงกลางแนวตั้ง
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  box: {
    backgroundColor: 'white',
    border: '2px solid #007bff', // กรอบสีน้ำเงิน
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '50px',  // กล่องจะขยายตามเนื้อหา
    minWidth: '200px',  // ตั้งค่าความกว้างขั้นต่ำ
  },
  text: {
    color: 'black', // กำหนดสีตัวอักษรเป็นสีดำ
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    minWidth: '75px'
  },
};

export default AlertBox;
