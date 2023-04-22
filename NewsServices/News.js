function HotNews() {
    $.ajax({
        url: "https://newsdata.io/api/1/news?country=vi&category=top&apikey=pub_209245d45e19f30cdcc75f0cbe8e24733332e",
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            strHTML = ``;
            // Xử lí dữ liệu
            for (let i = 0; i < 3; i++) {
                var title = data.results[i].title;
                var imageUrl = data.results[i].image_url;
                str = `<li class="media my-1 pb-2 list-top-new-items">
                            <img src="${imageUrl}" class="me-3">
                            <div class="media-body">
                                <h5 class="mt-0 mb-1">${title} </h5>
                            </div>
                            <a href="#" class="top-news-link"></a>
                        </li>`;
                strHTML += str;
            }
            $("#hot_news").html(strHTML);
        },
        error: function () {
            alert("Không thể lấy News!");
        }
    });
}
$(document).ready(function () {
    HotNews();
})