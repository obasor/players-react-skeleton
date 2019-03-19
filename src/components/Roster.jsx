import React from 'react';
import { Link } from 'react-router-dom';

const LoadingSpinner = () => <div><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" /> Loading ...</div>;

const handleLogout = history => () => {
  localStorage.removeItem('id_token');
  history.push('/login');
};
const getToken = () => localStorage.getItem('id_token');
class Roster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      loading: true,
    };
  }

  componentDidMount() {
    if (getToken()) {
      setTimeout(() => {
        fetch('https://players-api.developer.alchemy.codes/api/players', {
          method: 'GET',
          headers: { Authorization: `Bearer ${getToken()}` },
          credentials: 'same-origin',
        })
          .then(res => res.json())
          .then(data => this.setState({ loading: false, players: data.players }));
      }, 500);
    } else {
        this.props.history.push('/login');
    }
  }
  handleDelete(e) {
    const token = localStorage.getItem('id_token');
    fetch(`https://players-api.developer.alchemy.codes/api/players/${e.target.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(response => window.location.reload())
      .catch(error => console.error('Error:', error));
  }

  render() {
    const { players, loading } = this.state;
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th colSpan="4" scope="col"><h2>Players Roster </h2></th>
              <th scope="col"><Link to="/login" className="btn btn-default btn-sm" onClick={handleLogout()}><span className="glyphicon glyphicon-log-out" /> Log out</Link></th>
            </tr>
            <tr>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Rating</th>
              <th scope="col">Handedness</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="5"><LoadingSpinner /></td></tr> : players.map(player =>
            (
              <tr key={player.id}>
                <td>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>{player.rating}</td>
                <td>{player.handedness}</td>
                <td><button id={player.id} className="delete btn btn-sm btn-danger" onClick={this.handleDelete.bind()}>Delete</button></td>
              </tr>
             ))
            }
          </tbody>
        </table>
        <div>
          {loading ? <div /> : <Link to="/player/new" href="/player/new" type="button" className="btn btn-primary ">Add Player</Link>}
        </div>
      </div>
    );
  }
}
export default Roster;
