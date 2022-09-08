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
    // thêm tính năng ấn esc ở bất cứ đâu đều ẩn toàn bộ combobox
    $(document).on("keydown", document, hideComboboxOnESC)
    // thêm tính năng ấn enter ở trong 1 danh sách thì sẽ nhập dữ liệu có
    // trong item vào trong input và combobox
    $(document).on("keydown", ".combobox .combobox__item", comboboxItemKeydown)
})

/**
 * lắng nghe nhập liệu vào ô input của combobox
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

function inputComboboxOnClick(){
    try {
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
        $(comboboxData).parents(".combobox").first().attr("value", value)

    } catch (error) {
        console.log(error)
    }
}

/**
 * tạo combobox thay thế element có tên là <mcombobox></mcombobox>
 * trong DOM
 * Author: Tô Nguyễn Đức Mạnh (03/09/2022)
 */

function createCombobox() {
    try {
        // tìm các element có tag là "mcombobox"
        let comboboxs = $("mcombobox")
        // build từng combobox
        for (const combobox of comboboxs) {
            // lấy id
            const id = $(combobox).attr("id")
            // lấy class
            const clasName = $(combobox).attr("class")
            // lấy data-title
            const dataTitle = $(combobox).attr("data-title")
            // lấy api
            const api = $(combobox).attr("api")
            // lấy ra prop text 
            const propText = $(combobox).attr("text")
            // lấy ra prop value
            const propValue = $(combobox).attr("value")
            // lấy ra placeholder
            const placeholder = $(combobox).attr("placeholder")
            // lấy ra propName
            const propName = $(combobox).attr("propName")
            // lấy ra data có sẵn phòng trường hợp k có api
            const data = $(combobox).attr("data")
            // lấy ra defaulValue
            const defaultVal = $(combobox).attr("defaultValue")
            // lấy ra defaultValueShort
            const unique = $(combobox).attr("unique")
            // lấy dữ liệu từ api
            if(api !== undefined){
                $.ajax({
                    type: "GET",
                    url: api,
                    async: false,
                    success: function (response) {
                        let comboboxHTML = $(`
                        <div id="${id}" propName="${propName}" class="combobox" value=""
                            data-title="${dataTitle}"
                        >
                            <input class="combobox__input ${clasName}" type="text" placeholder="${placeholder}">
                            <button class="combobox__button">
                                <div class="combobox__drop">
                                </div>
                            </button>
                            <div class="combobox__data">
                            </div>
                        </div> `)
    
                        for (const item of response) {
                            //tạo ra combobox__item từ response
                            let html = `<div tabindex='0' class="combobox__item" value="${item[propValue]}">${item[propText]}</div>`
                            // append vào comboboxHTML
                            $(comboboxHTML).find(".combobox__data").append(html)
                        }
                        // thay thế mcombobox trong DOM bằng comboboxHTML
                        $(comboboxHTML).data("data", response)
                        $(combobox).replaceWith(comboboxHTML);
                    }
                });
            }else{
            // render dữ liệu từ đầu vào nếu không có api
            let comboboxHTML = $(`
            <div id="${id}" class="combobox" value="${unique}"
                data-title="${dataTitle}"
            >
                <input class="combobox__input ${clasName}" type="text" placeholder="${placeholder}" value="${defaultVal !== undefined ? defaultVal : ""}">
                <button class="combobox__button">
                    <div class="combobox__drop">
                    </div>
                </button>
                <div class="combobox__data">
                </div>
            </div> `)
            // phân chia các item bằng dấu ;
            let items = data.split(";")
            for(const item of items){
                // phân chia giá trị và text bằng dấu :
                let arrItem = item.split(":")
                // kiểm tra xem có phải giá trị mặc định không
                let html =""
                if(defaultVal.trim() === arrItem[0].trim()){
                   html  = `<div tabindex='0' class="combobox__item ${comboboxEnum.comboboxItem.selected}" value="${arrItem[1].trim()}">${arrItem[0].trim()}</div>`
                }else{
                   html = `<div tabindex='0' class="combobox__item" value="${arrItem[1].trim()}">${arrItem[0].trim()}</div>`
                }
                // append vào comboboxHTML
                $(comboboxHTML).find(".combobox__data").append(html)
            }
            // thay thế mcombobox trong DOM bằng comboboxHTML
            $(combobox).replaceWith(comboboxHTML);
            }
        }
    } catch (error) {
        console.log(error)
    }
}


/**
 * khi ấn ESC thì sẽ thu gọn toàn bộ combobox
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

function hideComboboxOnESC(e){
    try {
        if(e.keyCode == comboboxEnum.keycode.esc){
            let comboboxDataList = $(".combobox .combobox__data")
            // xóa class có chứa thuộc tính display:block đi là sẽ ẩn được
            $(comboboxDataList).removeClass(comboboxEnum.comboboxData.show)
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * khi ấn các phím như lên, xuống, trái, phải, enter
 * khi tab index đang ở 1 trong các combobox item thì sẽ
 * trả về các kết quả tương ứng như di chuyển sang tabindex
 * khác hoặc nhập dữ liệu vào trong input và value combobox
 * Author: Tô Nguyễn Đức Mạnh (01/09/2022)
 */

function comboboxItemKeydown(e){
    try {
        let currentItem = e.target
        let currentText = $(currentItem).text()
        let currentVal = $(currentItem).attr("value")
        let input = $(currentItem).parents(".combobox").first().children(".combobox__input").first()
        let combobox = $(currentItem).parents(".combobox").first()
        switch(e.keyCode){
            // phím enter
            case comboboxEnum.keycode.enter :
                // lưu giá trị
                $(input).val(currentText)
                $(combobox).attr("value", currentVal)
                // ẩn combobox data đi
                $(combobox).children(".combobox__data").removeClass(comboboxEnum.comboboxData.show)
                break
            // phím lên
            case comboboxEnum.keycode.up :
                if($(this).prev())
                $(this).prev().focus()
                break
            // phím xuống
            case comboboxEnum.keycode.down :
                if($(this).next())
                $(this).next().focus()
                break
            // phím sang trái
            case comboboxEnum.keycode.left :
                if($(this).prev())
                $(this).prev().focus()
                break
            // phím sang phải
            case comboboxEnum.keycode.right :
                if($(this).next())
                $(this).next().focus()
                break
            default:
                break
        }
    } catch (error) {
        console.log(error)
    }
}