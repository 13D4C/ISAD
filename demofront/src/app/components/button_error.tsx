
import { useState } from 'react';

const AlertBox: React.FC<{ message: string, onClose: () => void }> = ({ message, onClose }) => {
    const [isHovered, setIsHovered] = useState(false);

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            alignItems: 'center',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            transition: 'opacity 0.8s ',
        },
        box: {
            backgroundColor: 'white',
            border: '2px solid #007bff',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            minHeight: '20vh',
            width: '35vw',
            minWidth: '200px',
        },
        text: {
            color: 'black',
            marginTop: '40px',
            fontSize: '1.1em',
            fontWeight: 'bold',
        },
        buttonParent: {
            width: '100%',
            height: '100%',
        },
        button: {
            backgroundColor: isHovered ? '#0056b3' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            minWidth: '75px',
            marginBottom: '10px',
            transition: '0.15s ease-in',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <p style={styles.text}>{message}</p>
                <div style={styles.buttonParent}>
                    <button
                        style={styles.button}
                        onClick={() => { onClose(); console.log("Alert closed"); }} 
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};


export default AlertBox;