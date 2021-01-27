var LIST = $('.bl-row');
var ITEM_TEMPLATE = "<div class=\"bl-products\">" + $('.bl-products').html() + "</div>";
var LEFT_PRODUCT = "<div class=\"bl-leftProduct\">"+$('.bl-leftProduct').html()+ "</div>"

function addProduct(title) {
    var node = $(ITEM_TEMPLATE);
    node.css("display", "block");
    $(this).parent().find(".bl-text").val("");
    node.find(".bl-productName").val(title);
    node.find(".bl-plus").click(function () {
        $(this).parent().find(".bl-label").html(parseInt($(this).parent().find(".bl-label").text()) + 1);
        $(this).parent().find(".bl-minus").prop('disabled', false);
        $(this).parent().find(".bl-minus").css("background", "#db2828");
        $(this).parent().find(".bl-minus").css("box-shadow", "inset 0 -3px 0 #a42020");
        var nameOfProduct = "#" + $(this).parent().parent().find(".bl-productName").val();
        $(nameOfProduct).find(".bl-productsNumber").html($(this).parent().find(".bl-label").text());
    });
    node.find(".bl-minus").click(function () {
        $(this).parent().find(".bl-label").html(parseInt($(this).parent().find(".bl-label").text()) - 1);
        if ($(this).parent().find(".bl-label").text() == 1) {
            this.disabled = true;
            $(this).css("background", "#d65050");
            $(this).css("box-shadow", "inset 0 -3px 0 #9f4848");
        }
        var nameOfProduct = "#" + $(this).parent().parent().find(".bl-productName").val();
        $(nameOfProduct).find(".bl-productsNumber").html($(this).parent().find(".bl-label").text());
    });
    node.find(".bl-delete").click(function () {
        $(this).parent().parent().fadeOut(500, function () {
            $(this).remove();
        });
        var nameOfProduct = "#" + $(this).parent().parent().find(".bl-productName").val();
        $(nameOfProduct).fadeOut(500, function () {
            $(this).remove();
        });
    });
    var leftProductNode = $(LEFT_PRODUCT);
    leftProductNode.find(".bl-nameOfProduct").text(title);
    leftProductNode.css("display", "inline-block");
    leftProductNode.attr('id',title);
    if (title) {
        LIST.append(node);
        $(".bl-productsLeft").append(leftProductNode);
    }
}

$(".bl-addButton").click(function () {
    var name = $(this).parent().find(".bl-text").val();
    addProduct(name);
    $(this).parent().find(".bl-text").val("");
    $(this).parent().find(".bl-text").focus();
});