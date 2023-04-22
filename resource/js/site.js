
/* Hàm sử lý sự kiện khi DOM được tải lên hoàn tất */
$(document).ready(function () {

    //      Xử lý search thành phố
    // API MapBox để tìm thành phố
    $(".search-auto").autocomplete({
        /*
        Thiết lập độ dài tối thiểu của chuỗi input là 0
        => Sẽ hiển thị gợi ý ngay khi người dùng bắt đầu nhập
        */
        minLength: 0,
        /*
        Xử lý dữ liệu nguồn để gợi ý cho autocomplete:
            Nó thực hiện một yêu cầu AJAX đến url với dữ liệu truyền lên là giá trị
            của chuỗi tìm kiếm: request.term
            => Xử lý kết quả thành JSON: response(data)
        */
        source: function (request, response) {
            $.ajax({
                // Truyền vào chuỗi tìm kiếm
                url: "https://api.mapbox.com/geocoding/v5/mapbox.places/"
                    + request.term
                    + ".json?access_token=pk.eyJ1IjoiYmFiaXB1bnNvY2l1IiwiYSI6ImNsZnFvZnNpazAwZ24zeXFtZGw3am5xNzUifQ.kPyybZgMT0bhvmIKSgyqKA&types=place",
                type: 'GET',
                dataType: "json",
                lang: 'vi',
                success: function (data) {
                    console.log(data);
                    response(data.features);
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error('Lỗi khi gọi API MapBox: ' + textStatus, errorThrown);
                }
            });
        },
        // Callback Cập nhật giá trị của phần tử
        focus: function (event, ui) {
            $("#searchInput").val(ui.item.place_name);
            $("#searchValue").val(ui.item.value);
            return false;
        },
        // Hàm callback được gọi khi một mục được chọn từ gợi ý
        select: function (event, ui) {
            let place = ui.item.place_name;
            let lon = ui.item.center[0];
            let lat = ui.item.center[1];
            console.log("Place name:" + place + "\nLon:" + lon + "\nLat:" + lat)

            let url = "/ThoiTiet/Index?place=" + encodeURIComponent(place) + "&lon=" + lon + "&lat=" + lat;

            window.location.href = url;
            return false;
        }
    })
         /*
        Tạo cách hiển thị gợi ý mặc định của Autocomlete:
        - Tạo thẻ < li > với nội dung item.text
        - Add thẻ < li > vào < ul > để hiển thị
        */
        .autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<span class='ui-menu-item'>" + item.place_name + "</span>")
                .appendTo(ul);
        };

    /*
    Xử lý sự kiện form submit:
    - Ngăn chặn hành vi mặc định của form: evt.preventDefault()
    - Lấy giá trị của trường có id="searchValue"
    - Chuyển hướng đến URL tương ứng nếu có giá trị hợp lệ
    */
    $('.frmSearch').submit(function (evt) {
        evt.preventDefault();
        const url = $('#searchValue').val()
        if (url && url.trim().length > 0) {
            window.location.href = url;
        }
    })


    $('#showMoreContent').click(function (evt) {
        evt.preventDefault();
        if ($('.cover-content').hasClass('active')) {
            $('.cover-content').removeClass('active')
            $('#showMoreContent').text('Xem thêm')
        } else {
            $('.cover-content').addClass('active')
            $('#showMoreContent').text('Ẩn bớt')
        }
    })
    $('.showMoreContent').click(function (evt) {
        evt.preventDefault();
        const target = $(this).data('target');
        if ($(target).hasClass('active')) {
            $(target).removeClass('active')
            $(this).text('Xem thêm')
        } else {
            $(target).addClass('active')
            $(this).text('Ẩn bớt')
        }
    })
    $('.btn-toggle-toc').click(function (evt) {
        evt.preventDefault();
        $('.toc-links').toggle();
    })

});
