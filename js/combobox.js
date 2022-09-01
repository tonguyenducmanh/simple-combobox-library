import comboboxEnum from './enum.js'

/**
 * lắng nghe các sự kiện liên quan tới combobox
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

$(document).ready(function () {
    // thêm chức năng mở combobox khi bấm vào input
    $(document).on("focus", ".combobox .combobox__input", inputComboboxOnClick)
    // lọc danh sách combobox theo dữ liệu nhập vào input
    $(document).on("input", ".combobox .combobox__input", inputComboboxOnChange)
    // thêm chức năng click vào button
    $(document).on("click", ".combobox .combobox__button", btnComboboxOnClick);
    // thêm chức năng click vào item
    $(document).on("click", ".combobox .combobox__item", comboboxItemOnSelect);
    // thêm chức năng ấn ra ngoài combobox thì sẽ ẩn combobox data đi
    $(document).mouseup(hideComboboxData);
    // render ra combobox vào DOM
    createCombobox()
})

/**
 * lắng nghe nhập liệu vào ô input của combobox
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

function inputComboboxOnClick(){
    try {
        console.log("hihi")
         // kiểm tra xem có cái combobox nào đang mở không, nếu có ẩn hết nó đi
         let comboboxDatas = $(".combobox")
         comboboxDatas.children(".combobox__data").removeClass(comboboxEnum.comboboxData.show);
         $(this).next().next().addClass(comboboxEnum.comboboxData.show)
    } catch (error) {
        console.log(error)
    }
}

/**
 * lắng nghe nhập liệu đầu vào combobox và thay đổi
 * danh sách kết quả trả về tương ứng
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

function inputComboboxOnChange(e){
    try {
        let currentInput = e.target
        let inputValue = $(currentInput).val().toLowerCase()
        let comboboxLists = $(currentInput).next().next().children()
        //  trước tiên thì cho hiện toàn bộ kết quả
        comboboxLists.removeClass(comboboxEnum.comboboxItem.hide)
        // dùng vòng lặp để kiểm tra xem có item nào chứa input đang nhập không
        for(let comboboxList of comboboxLists){
            let itemValues = $(comboboxList).text().toLowerCase()
            if(!itemValues.includes(inputValue)){
                // ẩn các kết quả không phù hợp
                $(comboboxList).addClass(comboboxEnum.comboboxItem.hide)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * ấn ra ngoài combobox thì ẩn toàn bộ comboboxData
 * (của tất cả combobox) đi, tránh trường hợp hiện khi không dùng
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

function hideComboboxData(e) {
    try {
        // chọn các combobox data có trong DOM
        let comboboxDatas = $(".combobox")
        // nếu click ra ngoài thì ẩn hết combobox data đi
        if (!comboboxDatas.is(e.target) && comboboxDatas.has(e.target).length === 0) {
            comboboxDatas.children(".combobox__data").removeClass(comboboxEnum.comboboxData.show);
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * click vào button thì hiện combobox item
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

function btnComboboxOnClick() {
    try {
        // kiểm tra xem có cái combobox nào đang mở không, nếu có ẩn hết nó đi
        let comboboxDatas = $(".combobox")
        comboboxDatas.children(".combobox__data").removeClass(comboboxEnum.comboboxData.show);
        // ẩn hiện element tiếp theo
        if ($(this).next().hasClass(comboboxEnum.comboboxData.show)) {
            $(this).next().removeClass(comboboxEnum.comboboxData.show);
        } else {
            $(this).next().addClass(comboboxEnum.comboboxData.show);
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * click vào các item trong combobox data thì
 * gán giá trị vào trong input
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

function comboboxItemOnSelect() {
    try {
        // lấy ra text, value vừa chọn
        const text = $(this).text()
        const value = $(this).attr("value")
        let comboboxData = this.parentElement
        // remove class select trên mọi item
        $(comboboxData).children().removeClass("combobox__item--selected")
        // thêm class thay đổi style item đã chọn
        $(this).addClass("combobox__item--selected")
        // binding text lên input
        let input = $(comboboxData).siblings(".combobox__input")
        $(input).val(text)
        $(comboboxData).removeClass(comboboxEnum.comboboxData.show);
        // gán value vào combobox
        $(comboboxData).parents().attr("value", value)

    } catch (error) {
        console.log(error)
    }
}

/**
 * tạo combobox thay thế element có tên là <mcombobox></mcombobox>
 * trong DOM
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

function createCombobox() {
    try {
        // tìm các element có tag là "mcombobox"
        let comboboxs = $("mcombobox")
        // build từng combobox
        for (const combobox of comboboxs) {
            // lấy id
            const id = $(combobox).attr("id")
            // lấy api
            const api = $(combobox).attr("api")
            // lấy ra prop text 
            const propText = $(combobox).attr("text")
            // lấy ra prop value
            const propValue = $(combobox).attr("value")

            // lấy dữ liệu từ api
            $.ajax({
                type: "GET",
                url: api,
                async: false,
                success: function (response) {
                    let comboboxHTML = $(`
                    <div id=${id} class="combobox" value="">
                        <input class="combobox__input" type="text">
                        <button class="combobox__button">
                            <div class="combobox__drop">
                            </div>
                        </button>
                        <div class="combobox__data">
                        </div>
                    </div> `)

                    for (const item of response) {
                        //tạo ra combobox__item từ response
                        let html = `<div class="combobox__item" value="${item[propValue]}">${item[propText]}</div>`
                        // append vào comboboxHTML
                        $(comboboxHTML).find(".combobox__data").append(html)
                    }
                    // thay thế mcombobox trong DOM bằng comboboxHTML
                    $(comboboxHTML).data("data", response)
                    $(combobox).replaceWith(comboboxHTML);
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}
