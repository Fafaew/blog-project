import React from 'react';

const Post = () => {
  return (
    <div className="post">
    <div className="image">
      <img src="https://techcrunch.com/wp-content/uploads/2023/07/CMC_7326.jpg?w=730&crop=1" alt="" />
    </div>  
    <div className="texts">
      <h2>Technologies full house title coming this year, right ?</h2>
      <p className="info">
        <a className="author">Rafa</a>
        <time>2023-01-08 18:50</time>
      </p>
      <p className="summary">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus officia debitis itaque impedit, </p>
    </div>
  </div>
  )
}

export default Post;