import React from 'react';
import { Link } from 'react-router-dom';

const handleLogout = history => () => {
  localStorage.removeItem('id_token');
  history.push('/login');
};

class Newplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      rating: '',
      handedness: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getToken() {
    return localStorage.getItem('id_token');
  }
  getRosters(re) {
    if (re.error) {
      const error = `Error: , ${re.error.message}`;
      this.setState({ passError: error });
    } else {
      this.setState({ passError: '' });
      this.props.history.push('/roster');
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    if (this.getToken()) {
      const url = 'https://players-api.developer.alchemy.codes/api/players';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.getToken(),
        },
        credentials: 'same-origin',
      })
        .then(res => res.json())
        .then(response => this.getRosters(response))
        .catch(error => console.error('Error:', error));
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    const {
      first_name,
      last_name,
      rating,
      handedness,
      submitted,
      passError,
    } = this.state;
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th colSpan="4" scope="col">
                <h4>Add a player to your roster</h4>
                <div className="help-block" style={{ color: '#a94442' }}>{ passError }</div>
              </th>
              <th scope="col">
                <Link to="/login" href="/login" onClick={handleLogout()} className="btn btn-default btn-sm"><span className="glyphicon glyphicon-log-out" /> Log out</Link>
              </th>
            </tr>
          </thead>
        </table>
        <div className="col-md-6 col-md-offset-3">
          <form name="form" onSubmit={this.handleSubmit}>
            <div className={'form-group' + (submitted && !first_name ? ' has-error' : '')}>
              <label htmlFor="first_name">First Name
                <input id="first_name" type="text" className="form-control" name="first_name" value={first_name} onChange={this.handleChange} />
                {submitted && !first_name &&
                  <div className="help-block">Name is required</div>
                }
              </label>
            </div>
            <div className={'form-group' + (submitted && !last_name ? ' has-error' : '')}>
              <label htmlFor="last_name">Last Name
                <input id="last_name" type="text" className="form-control" name="last_name" value={last_name} onChange={this.handleChange} />
                {submitted && !last_name &&
                <div className="help-block">Last Name is required</div>
                }
              </label>
            </div>
            <div className={'form-group' + ((submitted && !rating) || rating.length > 4 ? ' has-error' : '')}>
              <label htmlFor="rating">Rating
                <input id="rating" type="number" className="form-control" name="rating" value={rating} onChange={this.handleChange} />
                {(submitted && !rating) || (rating.length > 4 && <div className="help-block">Enter a max of 4 digit number</div>)}
              </label>
            </div>
            <div className={'form-group' + (submitted && !handedness ? ' has-error' : '')}>
              <label htmlFor="handedness">Handedness
                <select name="handedness" id="handedness" className="form-control" onChange={this.handleChange}>
                  <option value="" />
                  <option value="right">Right</option>
                  <option value="left">Left</option>
                </select>
                {submitted && !handedness && <div className="help-block">Handedness is required</div>}
              </label>
            </div>
            <div className="form-group">
              <button id="create" className="btn btn-primary">Create</button> <Link to="/roster" href="/roster" type="button" className="btn btn-info">View Players</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Newplayer;
