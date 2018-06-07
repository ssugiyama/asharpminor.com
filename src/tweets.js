import React from 'react'
import ReactDOM from 'react-dom'
import { Tweet } from 'react-twitter-widgets'
import TweetIds from './tweet-ids'

const limit = 50;

const searchParams = new URLSearchParams(location.search);
const page = Number(searchParams.get('page')) || 1;

const offset = (page - 1) * limit;
const page_count = Math.ceil(TweetIds.length / limit);

const Tweets = () => 
      TweetIds.slice(offset, offset+limit).map(tweetId => (
        <Tweet tweetId={tweetId} key={tweetId} options={{ align: 'center' }} />
      ));

const Pagination = () => (
  <nav aria-label="Tweets Pagination">
    <ul className="pagination justify-content-center flex-wrap">
      { page > 1 ? 
      <li className="page-item"><a className="page-link" href={ '?page=' + (page - 1) }>
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </a></li> :
      <li className="page-item disabled"><span className="page-link">
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </span></li>
      }
      { [...Array(page_count).keys()].map(n => 
      n+1 != page ? 
      <li className="page-item" key={n}><a className="page-link" href={ '?page=' + (n+1)}>{n+1}</a></li> :
      <li className="page-item active" key={n}><span className="page-link">{n+1}</span></li>
      )}
      { page <= page_count - 1  ?
      <li className="page-item"><a className="page-link" href={ '?page=' + (page + 1)}>
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </a></li> :
      <li className="page-item disabled"><span className="page-link">
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </span></li> 
      }
    </ul>
  </nav>
)

ReactDOM.render(
  <div>
<Tweets />
<Pagination />
  </div>,
  document.getElementById('tweets')
)

