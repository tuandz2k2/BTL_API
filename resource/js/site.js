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

function initSearchWidget() {
    $(".search-location").autocomplete({
            minLength: 0,
            source: function(request, response) {
                $.ajax({
                    url: "/api/Catalog/search-location-widget",
                    type: 'GET',
                    dataType: "json",
                    data: {
                        q: request.term
                    },
                    success: function(data) {
                        response(data);
                    }
                });
            },
            focus: function(event, ui) {
                $(".search-location").val(ui.item.text);
                $('input[name=TinhThanh]').val(ui.item.value)
                return false;
            },
            select: function(event, ui) {
                fillEmbedUrl()
                reRenderWidget()
                return false;
            }
        })
        .autocomplete("instance")._renderItem = function(ul, item) {
            return $("<li>")
                .append("<span class='dropdown-item'>" + item.text + "</span>")
                .appendTo(ul);
        };

}

$(document).ready(function() {
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

    $(".search-auto").autocomplete({
            minLength: 0,
            source: function(request, response) {
                $.ajax({
                    url: "/api/Catalog/search-location",
                    type: 'GET',
                    dataType: "json",
                    data: {
                        q: request.term
                    },
                    success: function(data) {
                        response(data);
                    }
                });
            },
            focus: function(event, ui) {
                $("#searchInput").val(ui.item.description);
                $("#searchValue").val(ui.item.value);
                return false;
            },
            select: function(event, ui) {
                window.location.href = ui.item.value;
                return false;
            }
        })
        .autocomplete("instance")._renderItem = function(ul, item) {
            return $("<li>")
                .append("<span class='dropdown-item'>" + item.text + "</span>")
                .appendTo(ul);
        };

    $('.frmSearch').submit(function(evt) {
        evt.preventDefault();
        const url = $('#searchValue').val()
        if (url && url.trim().length > 0) {
            window.location.href = url;
        }
    })


    $('#showMoreContent').click(function(evt) {
        evt.preventDefault();
        if ($('.cover-content').hasClass('active')) {
            $('.cover-content').removeClass('active')
            $('#showMoreContent').text('Xem thêm')
        } else {
            $('.cover-content').addClass('active')
            $('#showMoreContent').text('Ẩn bớt')
        }
    })
    $('.showMoreContent').click(function(evt) {
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
    $('.btn-toggle-toc').click(function(evt) {
        evt.preventDefault();
        $('.toc-links').toggle();
    })

});