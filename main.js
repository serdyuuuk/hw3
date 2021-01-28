var LIST = $('.bl-row');
var ITEM_TEMPLATE = "<div class=\"bl-products\">" + $('.bl-products').html() + "</div>";
var LEFT_PRODUCT = "<div class=\"bl-leftProduct\">" + $('.bl-leftProduct').html() + "</div>";
var BOUGHT_PRODUCT = "<div class=\"bl-boughtProduct\">" + $('.bl-boughtProduct').html() + "</div>";
var idForObj = 0;

function addProduct(title) {
    var node = $(ITEM_TEMPLATE);
    node.css("display", "block");
    $(this).parent().find(".bl-text").val("");
    node.find(".bl-productName").val(title);

    node.find(".bl-productName").on("input", updateValue);

    node.find(".bl-minus").click(clickMinus);

    node.find(".bl-plus").click(clickPlus);

    node.find(".bl-buy").click(clickBuy);

    node.find(".bl-delete").click(clickDelete);

    var leftProductNode = $(LEFT_PRODUCT);
    leftProductNode.find(".bl-nameOfProduct").text(title);
    leftProductNode.css("display", "inline-block");
    leftProductNode.attr('id', idForObj);
    var boughtProductNode = $(BOUGHT_PRODUCT);
    boughtProductNode.find(".bl-nameOfProduct").text(title);
    boughtProductNode.attr('id', idForObj + "Bought");
    if (title) {
        node.hide();
        LIST.append(node);
        node.slideDown(500);
        leftProductNode.hide();
        $(".bl-productsLeft").append(leftProductNode);
        leftProductNode.fadeIn(500);
        $(".bl-alreadyBought").append(boughtProductNode);
    }
    node.find(".bl-id").text(idForObj);
    idForObj++;
}

function updateValue() {
    var idOfProduct = "#" + $(this).parent().parent().find(".bl-id").text();
    $(idOfProduct).find(".bl-nameOfProduct").text($(this).val());
    $(idOfProduct + "Bought").find(".bl-nameOfProduct").text($(this).val());
}

function clickMinus() {
    $(this).parent().find(".bl-label").text(parseInt($(this).parent().find(".bl-label").text()) - 1);
    if ($(this).parent().find(".bl-label").text() == 1) {
        this.disabled = true;
        $(this).css("background", "#d65050");
        $(this).css("box-shadow", "inset 0 -3px 0 #9f4848");
    }
    var idOfProduct = "#" + $(this).parent().parent().find(".bl-id").text();
    $(idOfProduct).find(".bl-productsNumber").text($(this).parent().find(".bl-label").text());
    $(idOfProduct + "Bought").find(".bl-productsNumber").text($(this).parent().find(".bl-label").text());
}

function clickPlus() {
    $(this).parent().find(".bl-label").text(parseInt($(this).parent().find(".bl-label").text()) + 1);
    $(this).parent().find(".bl-minus").prop('disabled', false);
    $(this).parent().find(".bl-minus").css("background", "#db2828");
    $(this).parent().find(".bl-minus").css("box-shadow", "inset 0 -3px 0 #a42020");
    var idOfProduct = "#" + $(this).parent().parent().find(".bl-id").text();
    $(idOfProduct).find(".bl-productsNumber").text($(this).parent().find(".bl-label").text());
    $(idOfProduct + "Bought").find(".bl-productsNumber").text($(this).parent().find(".bl-label").text());
}

function clickBuy() {
    if ($(this).parent().find(".bl-delete").is(":visible")) {
        $(this).parent().parent().fadeOut(500, function () {
            $(this).find(".bl-delete").css("display", "none");
            $(this).find(".bl-plus").css("display", "none");
            $(this).find(".bl-minus").css("display", "none");
            $(this).find(".bl-productName").css("text-decoration", "line-through");
            $(this).find(".bl-productName").attr('readonly', 'readonly');
            $(this).find(".bl-buy").text("Не куплено");
            $(this).find(".bl-buy").attr("data-tooltip", "Повернути в Залишилося");
        });
        var idOfProduct = "#" + $(this).parent().parent().find(".bl-id").text();
        $(idOfProduct).fadeOut(500, function () {
            $(this).css("display", "none");
        });
        $(idOfProduct + "Bought").css("display", "inline-block");
        $(idOfProduct + "Bought").hide();
        $(idOfProduct + "Bought").fadeIn(500);
        $(this).parent().parent().fadeIn(500);
    } else {
        $(this).parent().parent().fadeOut(500, function () {
            $(this).find(".bl-delete").css("display", "inline-block");
            $(this).find(".bl-plus").css("display", "inline-block");
            $(this).find(".bl-minus").css("display", "inline-block");
            $(this).find(".bl-productName").css("text-decoration", "none");
            $(this).find(".bl-productName").attr('read-write', 'read-write');
            $(this).find(".bl-buy").text("Куплено");
            $(this).find(".bl-buy").attr("data-tooltip", "Додати товар в Куплене");
        });
        var idOfProduct = "#" + $(this).parent().parent().find(".bl-id").text();
        $(idOfProduct).css("display", "inline-block");
        $(idOfProduct).hide();
        $(idOfProduct).fadeIn(500);
        $(idOfProduct + "Bought").fadeOut(500, function () {
            $(idOfProduct + "Bought").css("display", "none");
        });
        $(this).parent().parent().fadeIn(500);
    }
}

function clickDelete() {
    $(this).parent().parent().slideUp(500, function () {
        $(this).remove();
    })
    var idOfProduct = "#" + $(this).parent().parent().find(".bl-id").text();
    $(idOfProduct).fadeOut(500, function () {
        $(this).remove();
    });
    $(idOfProduct + "Bought").fadeOut(500, function () {
        $(this).remove();
    });
}

$(".bl-addButton").click(function () {
    var name = $(this).parent().find(".bl-text").val();
    addProduct(name);
    $(this).parent().find(".bl-text").val("");
    $(this).parent().find(".bl-text").focus();
});

$(".bl-text").keypress(function (e) {
    if (e.keyCode === 13) {
        var name = $(this).parent().find(".bl-text").val();
        addProduct(name);
        $(this).parent().find(".bl-text").val("");
        $(this).parent().find(".bl-text").focus();
    }
});
