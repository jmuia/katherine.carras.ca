document.addEventListener("DOMContentLoaded", main);

function main () {
    var $menu = document.querySelector('.menu .menu-mobile');
    var $menuDropdown = document.querySelector('.menu .menu-dropdown');

    var dropdownNodeList = $menuDropdown.querySelectorAll('a');
    forEach(dropdownNodeList, function (item) {
        item.addEventListener('click', function (e) {
            addClass($menuDropdown, 'hidden');
        });
    });
    
    var currentPageName = window.location.hash.substring(1) || 'work';

    var pages = {};
    var pagesNodeList = document.querySelectorAll('main div[data-page]');
    forEach(pagesNodeList, function (page) {
        var name = page.dataset.page;

        if (name === currentPageName) {
            removeClass(page, 'hidden');
            addClass(page, 'active');
        } else {
            addClass(page, 'hidden');
            removeClass(page, 'active');
        }

        pages[name] = page;
    });

    var titles = {};
    var titlesNodeList = document.querySelectorAll('.menu div[data-title]');
    forEach(titlesNodeList, function (title) {
        var name = title.dataset.title;

        if (name === currentPageName) {
            addClass(title, 'bold');
        } else {
            removeClass(title, 'bold');
        }

        titles[name] = title;
    });

    $menu.addEventListener('click', function (e) {
        e.preventDefault();
        toggleClass($menuDropdown, 'hidden');
    }, false);


    window.addEventListener('hashchange', function (e) {
        e.preventDefault();
        var hash = window.location.hash.substring(1) || 'work';
        transitionPage(currentPageName, hash);
    }, false);

    function transitionPage(oldPage, newPage) {
        addClass(pages[oldPage], 'hidden');
        removeClass(titles[oldPage], 'bold');
        removeClass(pages[oldPage], 'active');

        removeClass(pages[newPage], 'hidden');
        addClass(titles[newPage], 'bold');
        addClass(pages[newPage], 'active');

        currentPageName = newPage;
    }
}

function toggleClass(element, cls) {
    if (element.classList.contains(cls)) {
        element.classList.remove(cls);
    } else {
        element.classList.add(cls);
    }
}

function addClass(element, cls) {
    if (!element.classList.contains(cls)) {
        element.classList.add(cls);
    }
}

function removeClass(element, cls) {
    if (element.classList.contains(cls)) {
        element.classList.remove(cls);
    }
}

function forEach(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, array[i]);
  }
}
