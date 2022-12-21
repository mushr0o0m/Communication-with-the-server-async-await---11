(() => {
    async function createArticle() {
        const pageParams = new URLSearchParams(window.location.search);
        const articleResponse = await fetch(`https://gorest.co.in/public-api/posts/${Number(pageParams.get("id"))}`);
        const article = await articleResponse.json();
        createArticleContent(article.data);
        const articleCommentsResponse = await fetch(`https://gorest.co.in/public-api/comments?post_id=${Number(pageParams.get("id"))}`);
        const articleComments = await articleCommentsResponse.json();
        createArticleComments(articleComments.data);
    }

    function createArticleComments(data) {
        const commentsList = document.createElement("ul");
        commentsList.classList.add("list-group");
        for (let item of data) {
            const commentsItem = document.createElement("li");
            const commentBody = document.createElement("div");
            const commentTitle = document.createElement("div");
            const commentText = document.createElement("span");
            commentBody.classList.add("ms-2", "me-auto");
            commentTitle.classList.add("fw-bold");
            commentsItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");
            commentTitle.textContent = item.name;
            commentText.textContent = item.body;
            commentBody.append(commentTitle, commentText);
            commentsItem.append(commentBody);
            commentsList.append(commentsItem);
            console.log("NAME-", item.name, "BODY-", item.body)
        }

        document.querySelector("div").append(commentsList);
    }

    function createArticleContent(data) {
        const title = document.createElement("h1");
        const content = document.createElement("p");
        title.classList.add("mb-3");
        content.classList.add("mb-5");
        title.textContent = data.title;
        content.textContent = data.body;

        document.querySelector("div").append(title, content);
    }

    document.addEventListener("DOMContentLoaded", () => {
        createArticle();
    });
})();
