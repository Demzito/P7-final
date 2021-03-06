import axios from "axios";

const url = "http://localhost:3001/api/posts";

export const handleNewCom = (post, newComment) =>
	axios.post(`${url}/${post.id}/comment`, newComment, {
		headers: {
			Authorization: localStorage.getItem("token")
		}
	});

export const handleComs = post =>
	axios.get(`${url}/${post.id}/comments`, {
		headers: {
			Authorization: localStorage.getItem("token")
		}
	});
