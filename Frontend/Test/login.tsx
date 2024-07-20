import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // คุมตัวพวก login ตรงนี้
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        //container ตรงกลาง
        <h1>Welcome</h1>
        <p>Sign in with KMITL account or ITKMITL account.</p>
        // ปุ่ม
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="it660xxxxx"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
                //box password
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
        <button style={styles.googleButton}>Login with Google</button>
      </div>
    </div>
  );
};
//Css
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#3B82F6',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  form: {
    marginTop: '1rem',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#3B82F6',
    color: 'white',
    cursor: 'pointer',
  },
  //google ยังหารูปที่โอไม่ได้เลยให้ GPT gen ตัวพวกนี้มาก่อน ถ้ามีรูปแล้วฝากเปลี่ยนด้วย
  googleButton: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#DB4437',
    color: 'white',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default LoginPage;
