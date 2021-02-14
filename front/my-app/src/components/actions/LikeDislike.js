import IconUp from '../icons/IconUp.js';
import IconDown from '../icons/IconDown.js';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useHistory } from 'react-router-dom';

const LikeDislike = ({ data }) => {
  const { REACT_APP_URL } = process.env;
  const [auth] = useContext(AuthContext);
  const [votes, setVotes] = useState(data.votes);
  const [voted, setVoted] = useState(+data.voted);

  const history = useHistory();

  useEffect(() => {
    setVotes(data.votes);
    setVoted(+data.voted);
  }, [data]);

  const useUnVote = async () => {
    setVoted(null);

    const res = await fetch(`${REACT_APP_URL}/vote/${data.threadId}`, {
      method: 'DELETE',
      headers: {
        auth: auth,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const [json] = await res.json();

    setVotes(json.votes);
  };

  const useVoteUp = async () => {
    if (auth === '') {
      history.push('/register');
    } else {
      if (voted !== 1) {
        setVoted(1);
      } else {
        return null;
      }

      const res = await fetch(`${REACT_APP_URL}/vote/${data.threadId}?vote=p`, {
        method: 'POST',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const [json] = await res.json();

      setVotes(json.votes);
    }
  };

  const useVoteDown = async () => {
    if (auth === '') {
      history.push('/register');
    } else {
      if (voted !== -1) {
        setVoted(-1);
      } else {
        return null;
      }
      const res = await fetch(`${REACT_APP_URL}/vote/${data.threadId}?vote=n`, {
        method: 'POST',
        headers: {
          auth: auth,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const [json] = await res.json();

      setVotes(json.votes);
    }
  };
  return (
    <div className="post-single-action vote-block">
      {voted === 1 ? (
        <IconUp className="vote up ico small active" onClick={useUnVote} />
      ) : (
        <IconUp className="vote up ico small " onClick={useVoteUp} />
      )}
      <p>{votes ? votes : 0}</p>
      {voted === -1 ? (
        <IconDown className="vote down ico small active" onClick={useUnVote} />
      ) : (
        <IconDown className="vote down ico small " onClick={useVoteDown} />
      )}
    </div>
  );
};

export default LikeDislike;
