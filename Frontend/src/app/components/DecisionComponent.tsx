
import { useState } from 'react';

const DecisionBox: React.FC<{ message_1: string, message_2: string, onClose: (action: string) => void }> = ({ message_1, message_2, onClose }) => {
    const [isDelHovered, setIsDelHovered] = useState(false);
    const [isCancelHovered, setIsCancelHovered] = useState(false);

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
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            minHeight: '20vh',
            width: '30vw',
            minWidth: '200px',
        },
        text: {
            color: 'black',
            marginTop: '40px',
            fontSize: '1.1em',
            fontWeight: '540',
        },
        buttonParent: {
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
        },
        del_button: {
            backgroundColor: isDelHovered ? '#b80000' : '#E3342F',
            color: 'white',
            border: 'none',
            padding: '5px',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer',
            minWidth: '75px',
            marginBottom: '10px',
            transition: '0.15s ease-in',
        },
        cancel_button: {
            backgroundColor: isCancelHovered ? '#8c8c8c' : '#b1b1b1',
            color: 'white',
            border: 'none',
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            minWidth: '75px',
            marginBottom: '10px',
            marginRight: '10px',
            transition: '0.15s ease-in',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <p style={styles.text}>{message_1}<br/>{message_2}</p>
                <div style={styles.buttonParent}>
                    <button
                        style={styles.del_button}
                        onClick={() => { onClose('delete');}}
                        onMouseEnter={() => setIsDelHovered(true)}
                        onMouseLeave={() => setIsDelHovered(false)}
                    >
                        Delete
                    </button>
                    <button
                        style={styles.cancel_button}
                        onClick={() => { onClose('cancel');}}
                        onMouseEnter={() => setIsCancelHovered(true)}
                        onMouseLeave={() => setIsCancelHovered(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


export default DecisionBox;