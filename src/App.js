export default function App() {
  const posts = [
    {
      id: 1,
      text: 'こんばんは',
      timestamp: 'a minute ago',
      author: {
        username: 'james',
      },
    },
    {
      id: 2,
      text: 'bonne soirée',
      timestamp: 'an hour ago',
      author: {
        username: 'rick',
      },
    },
  ];

  return (
    <>
      <h1>Microblog</h1>
      {posts.length === 0 ?
        <p>There are no blog posts for now.</p>
      :
        posts.map(post => {
          return (
            <p key={post.id}>
              <b>{post.author.username}</b> &mdash; {post.timestamp}
              <br />
              {post.text}
            </p>
          );
        })
      }
    </>
  );
}
