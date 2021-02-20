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
    <div id='categoryName-${categoryCount}' >
        <div class="categoryRow flex-center-row">
            <h3 class="text-center sortable" id='${categoryCount}' placeholder="Type category name here" contenteditable="true"></h3>
            <i class="fas fa-times display-none red-x-${categoryCount}"></i>
        </div>
        <div id="categoryItems-${categoryCount}">
             
        </div>
    </div>
    ` 
   
    $('#categories-and-items').append(storedItem);
    $(`#categoryName-${categoryCount}`).on('dblclick', turnOnSortable);
    turnOffSortable();
    $("[contenteditable='true']").keypress(function(e){ return e.which != 13 && 
    e.which != 32});
    

    // saveData();
}

function turnOnSortable() {
    $('#categories-and-items').sortable();
        if($('[contenteditable="true"]').text() === '') {
            $('[contenteditable="true"]').text() = 'Type here';
        }
        $('[contenteditable="true"]').attr('contenteditable', 'false');
        $('#stop-sort').removeClass('display-none');
}

function turnOffSortable() {
    $('#stop-sort').on('click', function() {
        $('#stop-sort').addClass('display-none');
        $('#categories-and-items').sortable('disable');
        $('.sortable').attr('contenteditable', 'true');
    });
}

function appendMenuItem(categoryCount, itemCount) {
    
    let storedItem =
    `
        <div class="itemRow"  id="${categoryCount}${itemCount}">
            <h4 class="${categoryCount}${itemCount} sortable text-center" contenteditable="true" placeholder="Type item here"></h4>
            <i class="fas fa-times display-none red-x-item-${categoryCount}${itemCount}"></i>
        </div> 
    `;
    $(`#categoryItems-${categoryCount}`).append(storedItem);

    
        $(`#${categoryCount}${itemCount}`).on('dblclick', function() {
            $(`#categoryItems-${categoryCount}`).sortable();
            if($('[contenteditable="true"]').text() === '') {
                $('[contenteditable="true"]').text() = 'Type here';
            }
            $('[contenteditable="true"]').attr('contenteditable', 'false');
            $('#stop-sort').removeClass('display-none');
        });
        $('#stop-sort').on('click', function() {
            $('#stop-sort').addClass('display-none');
            $(`#categoryItems-${categoryCount}`).sortable('disable');
            $('.sortable').attr('contenteditable', 'true');
        });
    
    
    // saveData();
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
    const maxLength = 30;
    let itemCount = 0;
    
    $(element).on('focus', function() {
        addItem(categoryCount, itemCount);
        itemCount++;
        // saveData();
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
            itemCount = 0;
            // saveData();
        });
        $(element).on('blur', function () {
            setTimeout( function() {
                $(`.red-x-${categoryCount}`).addClass('display-none');
                addUnderlineTo(element);
                // toggleButtonDisabled('#add-item-btn', true);
                // saveData();
            }, 200); 
        });
    
    });
}

function addItem(categoryCount,itemCount) {
    let maxLength = 30;
    toggleButtonDisabled('#add-item-btn', false);
    if($(`h3#${categoryCount}`).is(':focus')) {
        $('#add-item-btn').one('click', function() {
            appendMenuItem(categoryCount, itemCount);
            $(`h4.${categoryCount}${itemCount}`).on('focus', function() {
                $(this).on('keydown', function(e) {
                    if($(this).text().length > maxLength) {
                        e.preventDefault();
                    };
                });
                $(`.red-x-item-${categoryCount}${itemCount}`).removeClass('display-none');
                $(`.red-x-item-${categoryCount}${itemCount}`).on('click', function() {
                    // removeItemFromStorage(categoryCount, itemCount);
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



//Attempted code to allow me to loadMenu from localStorage
//and retain ability to delete (attempt failed):

// function saveData() {
//     const menuSection = $("#categories-and-items").html();
//     localStorage.setItem('menu-section', menuSection);
// }

// function loadData() {
//     return localStorage.getItem('menu-section');
// }

// function loadMenu() {
//     $("#categories-and-items").html(loadData());
// }

// function updateCategoryCount(categoryCount) {
//     localStorage.setItem('categoryCount', categoryCount);
// }
// function getCategoryCount() {
//     const count = localStorage.getItem('categoryCount');
//     if(count) {
//         return count;
//     } else {
//         return 0;
//     }
// }




// function updateTextContent(categoryCount) {
//     const categories = JSON.parse(localStorage.getItem('categories'));
//     if($(`h3#${categoryCount}`).html()) {
//         categories[categoryCount] = `
//         <div id='categoryName-${categoryCount}'>
//             <div class="categoryRow flex-center-row">
//                 <h3 class="text-center" id='${categoryCount}' placeholder="Type category name here" contenteditable="true">${$(`h3#${categoryCount}`).html()}</h3>
//                 <i class="fas fa-times display-none red-x-${categoryCount}"></i>
//             </div>
//             <div id="categoryItems-${categoryCount}">
                
//             </div>
//         </div>

//     `;
//     localStorage.setItem('categories', JSON.stringify(categories));
//     }
    
// }


// function saveCategory(categoryCount,storedItem) {
//     const categories = JSON.parse(localStorage.getItem('categories'));
//     if(categories) {
//         let countArray = [];
//         for(let category of categories) {
//             countArray.push(category.categoryCount);
//         }
//         if(countArray.includes(categoryCount)) {
//             for(let i in categories) {
//                 if(i === categoryCount) {
//                     categories[i] = storedItem;
//                 }
//             }
//         } else {
//             categories[categoryCount] = storedItem;
//         }
//         localStorage.setItem('categories', JSON.stringify(categories));
//     } else {
//         const newObj = [storedItem];
//         localStorage.setItem('categories', JSON.stringify(newObj));
//     }
// }

// function removeCategory(categoryCount) {
//     let categories = getCategories();
//     console.log(categoryCount);
//     categories[categoryCount] = '';
//     localStorage.setItem('categories', JSON.stringify(categories)); 
// }

// function removeItemFromStorage(categoryCount, itemCount) {

// }

// function getCategories() {
//     const categories = JSON.parse(localStorage.getItem('categories'));
//     if(categories) {
//         return categories;
//     } else {
//         return '';
//     }
// }

// function saveItem(categoryCount,storedItem) {
//     const categories = getCategories();
//     let itemsArray = [{}];
//     let items = getItems();
//     if(items) {
//         itemsArray = items;
//         for(let i in categories) {
//             if(i == categoryCount) {
//                 itemsArray.push({categoryCount : storedItem});
//             }
//         }
//     } else {
//         itemsArray = [ {0: storedItem} ];
//     }
//     console.log(itemsArray);
//     localStorage.setItem('items', JSON.stringify(itemsArray));
// }

// function getItems() {
//     const items = JSON.parse(localStorage.getItem('items'));
//     if(items) {
//         return items;
//     } else return [];
// }













