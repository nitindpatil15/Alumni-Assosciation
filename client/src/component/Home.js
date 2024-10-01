import React, { useState } from "react";

const Home = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "John Doe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe",
      content: "Excited to reconnect with everyone!",
      likes: 0,
      comments: []
    },
    {
      id: 2,
      author: "Jane Smith",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
      content: "Looking forward to our alumni meet!",
      likes: 0,
      comments: []
    }
  ]);

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          author: "You",
          avatar: "https://ui-avatars.com/api/?name=You",
          content: newPost,
          likes: 0,
          comments: []
        }
      ]);
      setNewPost("");
    }
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleComment = (id, comment) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, comments: [...post.comments, comment] } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Alumni Posts</h2>
      <div className="mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share Knowledge , Job Posting? post here"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handlePost}
          className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow flex space-x-4">
            <img
              src={post.avatar}
              alt={`${post.author} avatar`}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <h4 className="font-bold">{post.author}</h4>
              <p>{post.content}</p>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Like ({post.likes})
                </button>
                <button
                  onClick={() => handleComment(post.id, "Great post!")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Comment ({post.comments.length})
                </button>
              </div>
              {post.comments.length > 0 && (
                <div className="mt-2">
                  <h5 className="font-bold text-sm">Comments</h5>
                  {post.comments.map((comment, idx) => (
                    <p key={idx} className="text-sm">{comment}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
