import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import LikesApis from "../../core/network/apis/likes";

const likesService = new LikesApis();

const addLike = (body) => {
  return likesService.post(body, "new");
};

export const LikeAction = ({ contentId }) => {
  const { data, isSuccess, refetch } = useQuery(
    `like-posts-${contentId}`,
    () => {
      return likesService.get(`check/${contentId}`);
    }
  );
  const mutation = useMutation(addLike);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isSuccess && data?.data?.data) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [data?.data?.data, isSuccess]);

  const likePost = async () => {
    const body = { contentId, isLiked: isLiked };

    mutation.mutate(body, {
      onError: (d) => {
        console.log(d);
      },
      onSuccess: (d) => {
        refetch();
      }
    });
  };

  return (
    <>
      <button
        className="action-post-btn"
        onClick={likePost}
        style={{ color: isLiked ? "crimson" : "gray" }}
      >
        <ThumbUpOffAltIcon />
        {isLiked ? "Liked" : "Like"}
      </button>
    </>
  );
};
