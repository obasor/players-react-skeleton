import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setToken(idToken) {
    if (idToken) {
      localStorage.setItem('id_token', idToken);
      this.props.history.push('/roster');
    } else {
      this.setState({ error: 'Login Failed' });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      const url = 'https://players-api.developer.alchemy.codes/api/login';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(response => this.setToken(response.token ? response.token : ''))
        .catch(error => console.error('Error:', error));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const {
      email,
      password,
      submitted,
      error,
    } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className={submitted ? 'submitted' : 'no'}><h2>Login</h2></div>
        <div><p className="text-danger">{error}</p></div>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
            <label htmlFor="email">Email
              <input id="email" type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
              {submitted && !email &&
                <div className="help-block">Email is required</div>
              }
            </label>
          </div>
          <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password
              <input id="password" type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
              {submitted && !password &&
                <div className="help-block">Password is required</div>
              }
            </label>
          </div>
          <div className="form-group">
            <button id="login" className="btn btn-primary">Login</button>
            <Link to="/register"href="/register" className="btn btn-link">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
