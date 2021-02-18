$(document).ready(function() {
    
    addCategoryListener();
    $('body').attr("spellcheck",false);

});



function addCategoryListener() {
    let categoryCount = 0;
    $('#add-category-btn').on('click', function() {
        toggleButtonDisabled('#add-item-btn', true);
        toggleDisplayNone('#add-item-btn', true);
        $('p#message').removeClass('display-none');
        appendTableCategory(categoryCount);
        onCategoryClick(`h3#${categoryCount}`, categoryCount);
        categoryCount++;
    });
    
}

function toggleAddCategoryButton(bool) {
    $('#add-category-btn').prop('disabled', bool);
}

function appendTableCategory(categoryCount) {
    
    let storedItem = `
    <div id='categoryName-${categoryCount}'>
        <div class="categoryRow flex-center-row">
            <h3 id='${categoryCount}' placeholder="Type category name here" contenteditable="true"></h3>
            <i class="fas fa-times display-none red-x-${categoryCount}"></i>
        </div>
        <div id="categoryItems-${categoryCount}">
             
        </div>
    </div>
    ` 
    
    $('#categories-and-items').append(storedItem);
    saveCategoryToStorage(storedItem, categoryCount);
}

function appendMenuItem(categoryCount, itemCount) {

    let storedItem =
    `
        <div class="itemRow flex-center-row" class="${categoryCount}${itemCount}">
            <h4 class="${categoryCount}${itemCount}" contenteditable="true" placeholder="Type item here"></h4>
            <i class="fas fa-times display-none red-x-item-${categoryCount}${itemCount}"></i>
        </div> 
    `;
    $(`#categoryItems-${categoryCount}`).append(storedItem);
    saveItemToStorage(storedItem, categoryCount, itemCount);
}


function toggleButtonDisabled(btn, bool) {
    $(btn).prop('disabled', bool);
}

function toggleDisplayNone(element, bool) {
    (bool === true) 
    ? $(element).removeClass('display-none')
    : $(element).addClass('display-none');
}

function addUnderlineTo(element) {
    $(element).css('text-decoration', 'underline');
}

function onCategoryClick(element, categoryCount) {
    const maxLength = 20;
    let itemCount = 0;
    $(element).on('focus', function() {
        itemCount++;
        addItem(categoryCount, itemCount);
        $(this).on('keydown', function(e) {
            if($(this).text().length > maxLength) {
                e.preventDefault();
            };
        });
        
        $(`.red-x-${categoryCount}`).removeClass('display-none');
        $(`.red-x-${categoryCount}`).on('click', function() {
            $(element).remove();
            $(`#categoryItems-${categoryCount}`).remove();
            $(this).remove();
        });
        $(element).on('blur', function () {
            setTimeout( function() {
                $(`.red-x-${categoryCount}`).addClass('display-none');
                addUnderlineTo(element);
                toggleButtonDisabled('#add-item-btn', true);
            }, 500); //this was the shortest time that would still allow me to delete using the X
        });
    
    });
}

function addItem(categoryCount,itemCount) {
    toggleButtonDisabled('#add-item-btn', false);
    if($(`h3#${categoryCount}`).is(':focus')) {
        $('#add-item-btn').one('click', function() {
            appendMenuItem(categoryCount, itemCount);
            $(`h4.${categoryCount}${itemCount}`).on('focus', function() {
                $(`.red-x-item-${categoryCount}${itemCount}`).removeClass('display-none');
                $(`.red-x-item-${categoryCount}${itemCount}`).on('click', function() {
                    $(`h4.${categoryCount}${itemCount}`).remove();
                    $(this).remove();
                });
                $(this).on('blur', function() {
                    $(`.red-x-item-${categoryCount}${itemCount}`).addClass('display-none');
                });
            });
        });
    }
}

function saveCategoryToStorage(storedCat, categoryCount) {
    let storedObject = { categoryCount, storedCat};
    localStorage.setItem('category', JSON.stringify(storedObject));
}

function getCategoriesFromStorage() {
    const categories = JSON.parse(localStorage.getItem('category'));
    return categories;
}

function saveItemToStorage(storedItem, categoryCount, itemCount) {
    const categories = getCategoriesFromStorage();
    console.log(categories);
}











