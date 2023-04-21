
function getEmbedUrl() {
    let tinhThanh = $('input[name=TinhThanh]').val();
    if (!tinhThanh) {
        tinhThanh = $('#TinhTnanh').val();
    }
    let days = $('#soNgay').val();
    let headerColor = $('#HeaderColor').val();
    let headerBackground = $('#HeaderBackground').val();
    let textColor = $('#TextColor').val();
    let borderColor = $('#BorderColor').val();
    let lineColor = $('#LineColor').val();

    let url = `https://thoitiet.edu.vn/embed/${tinhThanh}?days=${days}&hC=${encodeURIComponent(headerColor)}&hB=${encodeURIComponent(headerBackground)}&tC=${encodeURIComponent(textColor)}&bC=${encodeURIComponent(borderColor)}&lC=${encodeURIComponent(lineColor)}`;

    return url;
}

function fillEmbedUrl() {
    let url = getEmbedUrl();
    let htmlData = `<!--Begin thoitiet.edu.vn Weather Widget --><iframe src="${url}" id="widgeturl" width="100%" height="300" scrolling="no" frameborder="0" allowtransparency="true" style="border:none;overflow:hidden;"></iframe><!-- End Widget -->`;
    $('#urlValue').val(htmlData);
}

function reRenderWidget() {
    let url = getEmbedUrl();
    let htmlData = `<!--Begin thoitiet.edu.vn Weather Widget --><iframe src="${url}" id="widgeturl" width="100%" height="300" scrolling="no" frameborder="0" allowtransparency="true" style="border:none;overflow:hidden;"></iframe><!-- End Widget -->`;
    $('.widget-container').html(htmlData);
}

// Khai báo hàm để khởi tạo tính năng tìm kiếm location
function initSearchWidget() {
    /*
    Áp dụng plugin jQuery UI Autocomplete cho các phần tử HTML có
        class ".search-location"
    */
    $(".search-location").autocomplete({
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
                    + ".json?access_token=pk.eyJ1IjoiYmFiaXB1bnNvY2l1IiwiYSI6ImNsZnFvZnNpazAwZ24zeXFtZGw3am5xNzUifQ.kPyybZgMT0bhvmIKSgyqKA",
                type: 'GET',
                dataType: "json",
                lang: 'vi',
                success: function (data) {
                    var cities = [];
                    for (var i = 0; i < data.features.length; i++) {
                        /*
                        if (data.features[i].place_type[0] === 'place') {
                            cities.push(data.features[i].text);
                        }
                        */
                        cities.push(data.features[i].text);
                    }
                    response(cities);
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error('Lỗi khi gọi API MapBox: ' + textStatus, errorThrown);
                }
            });
        },
        /* Cập nhật giá trị của phần tử  */
        focus: function (event, ui) {
            $(".search-location").val(ui.item.text);
            $('input[name=TinhThanh]').val(ui.item.value)
            return false;
        },
        /* Hàm callback được gọi khi một mục được chọn từ gợi ý */
        select: function (event, ui) {
            fillbedUrl()
            reRenderWidget()
            return false;
        }
    })
        /* Tạo cách hiển thị gợi ý mặc định của Autocomlete:
                - Tạo thẻ <li> với nội dung item.text
                - Add thẻ <li> vào <ul> để hiển thị
            */
        .autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<span class='dropdown-item'>" + item.text + "</span>")
                .appendTo(ul);
        };

}

/* Hàm sử lý sự kiện khi DOM được tải lên hoàn tất */
$(document).ready(function () {
    //$('#carousel-ngay-toi').on('slide.bs.carousel', function (e) {
    //    var $e = $(e.relatedTarget);
    //    var idx = $e.index();
    //    var itemsPerSlide = 4;
    //    var totalItems = $('.carousel-item').length;

    //    if (idx >= totalItems - (itemsPerSlide - 1)) {
    //        var it = itemsPerSlide - (totalItems - idx);
    //        for (var i = 0; i < it; i++) {
    //            // append slides to end
    //            if (e.direction == "left") {
    //                $('.carousel-item').eq(i).appendTo('.carousel-inner');
    //            }
    //            else {
    //                $('.carousel-item').eq(0).appendTo('.carousel-inner');
    //            }
    //        }
    //    }
    //});

    //$('#carousel-ngay-toi').carousel({
    //    interval: false,
    //    touch: true
    //});

    //======================================================================
    //      Xử lý search thành phố
    // API MapBox để tìm thành phố
    $(".search-auto").autocomplete({
        minLength: 0,
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
                    /*
                    var cities = [];
                    for (var i = 0; i < data.features.length; i++) {
                        var x = data.features[i].text;
                        cities.push(x);
                    }
                    console.log("List city: " + cities);
                    response(cities);
                    */
                    response(data.features);
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error('Lỗi khi gọi API MapBox: ' + textStatus, errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#searchInput").val(ui.item.place_name);
            $("#searchValue").val(ui.item.value);
            return false;
        },
        select: function (event, ui) {
            window.location.href = ui.item.value;
            return false;
        }
    })
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
