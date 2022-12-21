(() => {
    async function createBlogList() {
        const pageParams = new URLSearchParams(window.location.search);
        const response = await fetch(`https://gorest.co.in/public-api/posts?page=${Number(pageParams.get("page"))}`);
        const post = await response.json();

        createBlogListArticles(post.data);
        createPageNumberingBlock(Number(pageParams.get("page")), post.meta.pagination.pages);
    }

    function createBlogListArticles(data) {
        let articleList = document.createElement("div");
        articleList.classList.add("list-group", "mb-3");
        for (let item of data) {
            const articleItem = document.createElement("a");
            articleItem.classList.add("list-group-item", "list-group-item-action");
            articleItem.textContent = item.title;
            articleItem.setAttribute("href", `post.html?id=${item.id}`);
            articleList.append(articleItem);
        }

        document.querySelector("div").append(articleList);
    }

    function createPageNumberingBlock(temp, maxPageNum) {
        const navBlock = document.createElement("nav");
        const pageList = document.createElement("ul");
        pageList.classList.add("pagination");
        temp = temp === 0 ? 1 : temp;
        for (let i = temp - 1; i < temp + 4; i++) {
            const pageItem = document.createElement("li");
            let pageLink = document.createElement("a");
            if (i === temp - 1) {
                if (temp - 1 === 0) {
                    pageItem.classList.add("disabled");
                    pageLink = document.createElement("span");
                } else
                    pageLink.setAttribute("href", `index.html${temp - 1 === 1 ? "" : "?page=" + (temp - 1)}`);

                pageLink.textContent = "Previous";
            } else if (i === temp + 3) {
                if (temp === maxPageNum) {
                    pageItem.classList.add("disabled");
                    pageLink = document.createElement("span");
                } else
                    pageLink.setAttribute("href", `index.html?page=${temp + 1}`);

                pageLink.textContent = "Next";
            } else {
                if (i > maxPageNum) {
                    pageItem.classList.add("disabled");
                    pageLink = document.createElement("span");
                } else if (i === temp) {
                    pageLink = document.createElement("span");
                    pageItem.classList.add("active");
                } else
                    pageLink.setAttribute("href", `index.html?page=${i}`)

                pageLink.textContent = i.toString();
            }

            pageItem.classList.add("page-item");
            pageLink.classList.add("page-link");
            pageItem.append(pageLink);
            pageList.append(pageItem);
        }

        navBlock.append(pageList);
        document.querySelector("div").append(navBlock);
    }

    document.addEventListener("DOMContentLoaded", () => {
        createBlogList();
    });
})();