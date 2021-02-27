import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { BASE_URL, Auth } from "../../Constants";
import { useProtectedPage } from "./../../hooks/useProtectedPage";

import { Container } from "./styled";

import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Post from "../../components/Post/index";
import NewPost from "./../../components/NewPost/index";
import Pagination from './../../components/Pagination/index';


const Feed = () => {
  useProtectedPage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");

  const history = useHistory();

  const getPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/posts`, Auth);
      setPosts(res.data.posts);
      setLoading(false);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // PAGINAÇÃO-----------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = "10";
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = posts
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    })
    .slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(posts.length / postsPerPage)
    ) {
      setCurrentPage(pageNumber);
      history.push(`/feed/${pageNumber}`);
    } else {
      alert("Escolha um número válido.");
    }
  };
  // -------------------------------------------------------------------

  // FILTRO DE BUSCA ---------------------------------------------------
  const filterPosts = () => {
    if (searchName.length === 0) {
      let filteredItems = currentPosts.filter((post) =>
        post.title
          .concat(post.text, post.username)
          .toLowerCase()
          .includes(searchName.toLowerCase())
      );
      return filteredItems;
    } else {
      currentPosts = posts;
      let filteredItems =
        currentPosts.filter((post) =>
          post.title.concat(post.text, post.username).toLowerCase().includes(searchName.toLowerCase())
        )
      return filteredItems;
    }
  };
  const filteredPosts = filterPosts();
  // --------------------------------------------------------------------
  const totalPosts = searchName.length > 0 ? filteredPosts.length : posts.length

  return (
    <>
      <Header setSearchName={setSearchName} searchName={searchName} />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <NewPost getPosts={getPosts} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
            paginate={paginate}
          />
          {posts &&
            filteredPosts.map((post) => {
              return (
                <Post
                  key={post.id}
                  postId={post.id}
                  title={post.title}
                  user={post.username}
                  date={post.createdAt}
                  text={post.text}
                  comments={post.commentsCount}
                  votes={post.votesCount}
                  userVoteDirection={post.userVoteDirection}
                />
              );
            })}
        </Container>
      )}
    </>
  );
};

export default Feed;
