import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import { Auth, BASE_URL } from "./../../Constants";
import { useProtectedPage } from "./../../hooks/useProtectedPage";

import { Container } from "./styled";
import { BsFillBackspaceFill } from "react-icons/bs";

import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Post from "./../../components/Post/index";
import Comment from "./../../components/Comment/index";
import CreateComment from "./../../components/CreateComment/index";
import Pagination from './../../components/Pagination/index';

const PostDetails = () => {
  useProtectedPage();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [searchName, setSearchName] = useState("");
  const history = useHistory();
  let { postId } = useParams();

  const getDetails = () => {
    axios
      .get(`${BASE_URL}/posts/${postId}`, Auth)
      .then((res) => {
        setDetails(res.data.post);

        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

    // PAGINAÇÃO-----------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = "10";
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = details && details.comments && details.comments
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    })
    .slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(details.comments.length / postsPerPage)
    ) {
      setCurrentPage(pageNumber);
      history.push(`/post/${details.id}/${pageNumber}`);
    } else {
      alert("Escolha um número válido.");
    }
  };
  
  // -------------------------------------------------------------------

  // FILTRO DE BUSCA ---------------------------------------------------
  const filterComments = () => {
    let filteredItems = currentPosts.filter((comment) =>
      comment.text
        .concat(comment.username)
        .toLowerCase()
        .includes(searchName.toLowerCase())
    );
    return filteredItems;
  };
  const filteredComments = details && details.comments && filterComments();
  // --------------------------------------------------------------------
  const totalPosts = searchName
    ? filteredComments && filteredComments.length
    : details && details.comments && details.comments.length;

  return (
    <>
      <Header setSearchName={setSearchName} searchName={searchName} />
      <Container>
        <div id="back-button" onClick={() => history.goBack()}>
          <BsFillBackspaceFill />
          <span>Voltar</span>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Post
              key={details.id}
              postId={details.id}
              title={details.title}
              user={details.username}
              date={details.createdAt}
              text={details.text}
              comments={details.commentsCount}
              votes={details.votesCount}
              userVoteDirection={details.userVoteDirection}
            />
            <CreateComment postId={postId} getDetails={getDetails} />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={totalPosts}
              paginate={paginate}
            />
            {details.comments &&
              filteredComments
                .sort((a, b) => {
                  return b.createdAt - a.createdAt;
                })
                .map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      postId={postId}
                      commentId={comment.id}
                      user={comment.username}
                      date={comment.createdAt}
                      text={comment.text}
                      direction={comment.userVoteDirection}
                      votes={comment.votesCount}
                    />
                  );
                })}
          </>
        )}
      </Container>
    </>
  );
};

export default PostDetails;
