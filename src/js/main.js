document.addEventListener("DOMContentLoaded", main, false);

// matches polyfill
this.Element && function(ElementPrototype) {
    ElementPrototype.matches = ElementPrototype.matches ||
    ElementPrototype.matchesSelector ||
    ElementPrototype.webkitMatchesSelector ||
    ElementPrototype.msMatchesSelector ||
    function(selector) {
        var node = this, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
        while (nodes[++i] && nodes[i] != node);
        return !!nodes[i];
    }
}(Element.prototype);

// closest polyfill
this.Element && function(ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest ||
    function(selector) {
        var el = this;
        while (el.matches && !el.matches(selector)) el = el.parentNode;
        return el.matches ? el : null;
    }
}(Element.prototype);


function main () {
    if ('addEventListener' in document) {
        FastClick.attach(document.body);
    }

    var $menu = document.querySelector('.menu .menu-mobile');
    var $menuDropdown = document.querySelector('.menu .menu-dropdown');
    
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
        toggleClass($menuDropdown, 'menu-dropdown-open');
    }, false);

    window.addEventListener('hashchange', function (e) {
        e.preventDefault();
        var hash = window.location.hash.substring(1) || 'work';
        transitionPage(currentPageName, hash);
    }, false);

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.menu-mobile')) {
            hideMenuDropdown();
        }
    }, false);

    function transitionPage(oldPage, newPage) {
        if (pages[oldPage]) {
            addClass(pages[oldPage], 'hidden');
            removeClass(pages[oldPage], 'active');
        }

        if (titles[oldPage]) {
            removeClass(titles[oldPage], 'bold');
        }

        if (pages[newPage]) {
            removeClass(pages[newPage], 'hidden');
            addClass(pages[newPage], 'active');
        }

        if (titles[newPage]) {
            addClass(titles[newPage], 'bold');
        }

        currentPageName = newPage;
    }

    function hideMenuDropdown() {
        addClass($menuDropdown, 'hidden');
        removeClass($menuDropdown, 'menu-dropdown-open');
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
