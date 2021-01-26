$(".bl-plus").click(function () {
    $(this).parent().find(".bl-label").html(parseInt($(this).parent().find(".bl-label").text()) + 1);
    $(this).parent().find(".bl-minus").prop('disabled', false);
    $(this).parent().find(".bl-minus").css("background", "#db2828");
    $(this).parent().find(".bl-minus").css("box-shadow", "inset 0 -3px 0 #a42020");
    var nameOfProduct = "#" + $(this).parent().parent().find(".bl-productName").val();
    $(nameOfProduct).find(".bl-productsNumber").html($(this).parent().find(".bl-label").text());
});

$(".bl-minus").click(function () {
    $(this).parent().find(".bl-label").html(parseInt($(this).parent().find(".bl-label").text()) - 1);
    if ($(this).parent().find(".bl-label").text() == 1) {
        this.disabled = true;
        $(this).css("background", "#d65050");
        $(this).css("box-shadow", "inset 0 -3px 0 #9f4848");
    }
    var nameOfProduct = "#" + $(this).parent().parent().find(".bl-productName").val();
    $(nameOfProduct).find(".bl-productsNumber").html($(this).parent().find(".bl-label").text());
});

window.onload = checkButtons();

function checkButtons() {
    var testElements = document.getElementsByClassName('bl-minus');
    for (let item of testElements) {
        if ($(item).parent().find(".bl-label").text() == 1) {
            item.disabled = true;
            $(item).css("background", "#d65050");
            $(item).css("box-shadow", "inset 0 -3px 0 #9f4848");
        }
    }
}

$(".bl-delete").click(function () {
    $(this).parent().parent().remove();
    var nameOfProduct = "#" + $(this).parent().parent().find(".bl-productName").val();
    $(nameOfProduct).remove();
});