$(document).ready(function() {
    
    loadMenu();
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

function loadMenu() {
    const categories = getCategories();
    const items = getItems();
    for(let i in categories) {
        if(categories[i]) {
            console.log(categories[i]);
            appendTableCategory(i);
            onCategoryClick(`h3#${i}`, i);
        }
    }
}

function toggleAddCategoryButton(bool) {
    $('#add-category-btn').prop('disabled', bool);
}

function appendTableCategory(categoryCount) {
    let storedItem = `
    <div id='categoryName-${categoryCount}'>
        <div class="categoryRow flex-center-row">
            <h3 class="text-center" id='${categoryCount}' placeholder="Type category name here" contenteditable="true"></h3>
            <i class="fas fa-times display-none red-x-${categoryCount}"></i>
        </div>
        <div id="categoryItems-${categoryCount}">
             
        </div>
    </div>
    ` 
    
    $('#categories-and-items').append(storedItem);
    saveCategory(categoryCount, storedItem);
    getCategories();
}

function appendMenuItem(categoryCount, itemCount) {
    
    let storedItem =
    `
        <div class="itemRow" class="${categoryCount}${itemCount}">
            <h4 class="${categoryCount}${itemCount} text-center" contenteditable="true" placeholder="Type item here"></h4>
            <i class="fas fa-times display-none red-x-item-${categoryCount}${itemCount}"></i>
        </div> 
    `;
    $(`#categoryItems-${categoryCount}`).append(storedItem);
    saveItem(categoryCount, storedItem);
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
            removeCategory(categoryCount)
            $(element).remove();
            $(`#categoryItems-${categoryCount}`).remove();
            $(this).remove();
            itemCount = 0;
        });
        $(element).on('blur', function () {
            setTimeout( function() {
                $(`.red-x-${categoryCount}`).addClass('display-none');
                addUnderlineTo(element);
                toggleButtonDisabled('#add-item-btn', true);
                updateTextContent(categoryCount);
            }, 200); 
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
                    removeItemFromStorage(categoryCount, itemCount);
                    $(`h4.${categoryCount}${itemCount}`).remove();
                    $(this).remove();
                });
                $(this).on('blur', function() {
                    setTimeout( function() {
                        $(`.red-x-item-${categoryCount}${itemCount}`).addClass('display-none');
                    }, 200);
                });
            });
        });
    }
}

function updateTextContent(categoryCount) {
    const categories = JSON.parse(localStorage.getItem('categories'));
    if($(`h3#${categoryCount}`).html()) {
        categories[categoryCount] = `
        <div id='categoryName-${categoryCount}'>
            <div class="categoryRow flex-center-row">
                <h3 class="text-center" id='${categoryCount}' placeholder="Type category name here" contenteditable="true">${$(`h3#${categoryCount}`).html()}</h3>
                <i class="fas fa-times display-none red-x-${categoryCount}"></i>
            </div>
            <div id="categoryItems-${categoryCount}">
                
            </div>
        </div>

    `;
    localStorage.setItem('categories', JSON.stringify(categories));
    }
    
}


function saveCategory(categoryCount,storedItem) {
    const categories = JSON.parse(localStorage.getItem('categories'));
    if(categories) {
        let countArray = [];
        for(let category of categories) {
            countArray.push(category.categoryCount);
        }
        if(countArray.includes(categoryCount)) {
            for(let i in categories) {
                if(i === categoryCount) {
                    categories[i] = storedItem;
                }
            }
        } else {
            categories[categoryCount] = storedItem;
        }
        localStorage.setItem('categories', JSON.stringify(categories));
    } else {
        const newObj = [storedItem];
        localStorage.setItem('categories', JSON.stringify(newObj));
    }
}

function removeCategory(categoryCount) {
    let categories = getCategories();
    console.log(categoryCount);
    categories[categoryCount] = '';
    localStorage.setItem('categories', JSON.stringify(categories)); 
}

function removeItemFromStorage(categoryCount, itemCount) {

}

function getCategories() {
    const categories = JSON.parse(localStorage.getItem('categories'));
    if(categories) {
        return categories;
    } else {
        return '';
    }
}

function saveItem(categoryCount,storedItem) {
    const categories = getCategories();
    let itemsArray = [{}];
    let items = getItems();
    if(items) {
        itemsArray = items;
        for(let i in categories) {
            if(i == categoryCount) {
                itemsArray.push({categoryCount : storedItem});
            }
        }
    } else {
        itemsArray = [ {0: storedItem} ];
    }
    console.log(itemsArray);
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

function getItems() {
    const items = JSON.parse(localStorage.getItem('items'));
    if(items) {
        return items;
    } else return [];
}













