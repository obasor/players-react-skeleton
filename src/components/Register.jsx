import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  setToken(idToken) {
    if (idToken) {
      localStorage.setItem('id_token', idToken);
      this.setState({ passError: '' });
      this.props.history.push('/roster');
    } else {
      this.setState({ passError: 'Registration Failed. Try a different Email' });
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    } = this.state;
    // const { dispatch } = this.props;
    if ({ password } && confirm_password && password !== confirm_password) {
      this.setState({ submitted: true });
      this.setState({ passError: 'Password don\'t match' });
      console.log('no match');
      return;
    }
    this.setState({ passError: '' });

    if (first_name && last_name && email && password) {
      const url = 'https://players-api.developer.alchemy.codes/api/user';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(response => this.setToken(response.token))
        .catch(error => console.error('Error:', error));
    }
  }


  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      submitted,
      passError,
    } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !first_name ? ' has-error' : ''}`}>
            <label htmlFor="first_name">First Name
              <input id="first_name" type="text" className="form-control" name="first_name" value={first_name} onChange={this.handleChange} />
              {submitted && !first_name &&
              <div className="help-block">Name is required</div>
              }
            </label>
          </div>
          <div className={`form-group${submitted && !last_name ? ' has-error' : ''}`}>
            <label htmlFor="last_name">Last Name
              <input id="last_name" type="text" className="form-control" name="last_name" value={last_name} onChange={this.handleChange} />
              {submitted && !last_name &&
              <div className="help-block">Last is required</div>
              }
            </label>
          </div>
          <div className={`form-group${submitted && !email ? ' has-error' : ''}`}>
            <label htmlFor="email">Email
              <input id="email" type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
              {submitted && !email &&
              <div className="help-block">Email is required</div>
              }
            </label>
          </div>
          <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password
              <input id="password" type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
              {submitted && !password &&
              <div className="help-block">Password is required</div>
              }
            </label>
          </div>
          <div className={`form-group${submitted && !confirm_password ? ' has-error' : ''}`}>
            <label htmlFor="password">Confirm Password
              <input id="confirm_password" type="password" className="form-control" name="confirm_password" value={confirm_password} onChange={this.handleChange} />
              {submitted && !confirm_password &&
              <div className="help-block">Confirm Password is required</div>
              }
            </label>
            <div className="help-block" style={{ color: '#a94442' }}>{passError}</div>
          </div>
          <div className="form-group">
            <button id="register" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
