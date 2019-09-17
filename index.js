(function () {
    const tooltip_style = document.createElement('style');
    tooltip_style.innerHTML = `
    .tool:hover .tooltip{
        opacity: 1 !important;
        visibility: visible!important;
    }
    .tool .tooltip {
        position: fixed;
        transition-delay: 100ms;
        opacity: 0;
        visibility: hidden;
        font-size: 13px;
        white-space: initial;
        font-weight: normal;
        max-width: 250px;
        background-color: white;
        color: black;
        line-height: 20px;
        padding: 5px 15px;
        border-radius: 3px;
        z-index: 1000000000;
        transition: 200ms all;
        transition-delay: 200ms;
        box-shadow:  0px 2px 20px 3px rgba(0, 0, 0, 0.35), 2px 2px 9px 0px rgba(0, 0, 0, 0.23), 0px 1px 5px 0 rgba(0, 0, 0, 0.21);
    }
    .tool .tooltip::after {
        position: absolute;
        height: 0px;
        width: 0px;
        border: 8px solid transparent;
        content: "";
    }

    .tool .tooltip.bottomRight::after {
        top: -16px;
        left: 5px;
        border-bottom-color: white;
    }

    .tool .tooltip.topRight::after {
        bottom: -16px;
        left: 5px;
        border-top-color: white;
    }

    .tool .tooltip.bottomLeft::after {
        top: -16px;
        right: 5px;
        border-bottom-color: white;
    }

    .tool .tooltip.topLeft::after {
        bottom: -16px;
        right: 5px;
        border-top-color: white;
    }
    `;
    document.head.appendChild(tooltip_style);
})();
var eles = [];
document.getElementsByTagName('body')[0].addEventListener('mouseenter', function (e) {
    var ele = document.querySelectorAll('[data-tooltip]');
    for (var i = 0; i < ele.length; i++) {
        if (eles.findIndex(el => el == ele[i]) < 0) {
            eles.push(ele[i]);
            ele[i].classList.add('tool');
            ele[i].addEventListener('mouseenter', mouseEnter, false);
        }
    }
    function mouseEnter(e) {    
        let winHeight = window.innerHeight;
        let winWidth = window.innerWidth;
        let elProperties = this.getBoundingClientRect();//it contains height,width,top,right,bottom,left
        let top = (elProperties.top / winHeight) * 100;
        let left = (elProperties.left / winWidth) * 100;
        let tooltip_data = this.getAttribute("data-tooltip");
        let tooltip = this.querySelector('.tooltip');
        if (!tooltip) {
            this.classList.add('tool');
            tooltip = document.createElement('span');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = tooltip_data;
            this.appendChild(tooltip);
        } else if (tooltip_data != '' && tooltip_data != 'undefined') {
            tooltip.innerHTML = tooltip_data;
        }
        else if (text.data == '') {
            this.removeChild(tooltip);
            return;
        }
        if (elProperties.height == 0) {
            elProperties.height = 20;
        }
        if (elProperties.width == 0) {
            elProperties.width = 20;
        }
        tooltip.classList.remove('bottomRight');
        tooltip.classList.remove('topRight');
        tooltip.classList.remove('bottomLeft');
        tooltip.classList.remove('topLeft');
        if (left < 60 && top < 60) { // el top left
            tooltip.style.left = elProperties.left + 2 + 'px';
            tooltip.style.top = elProperties.top + elProperties.height + 10 + 'px';
            tooltip.style.right = 'initial';
            tooltip.style.bottom = 'initial';
            tooltip.classList.add('bottomRight');
        }
        else if (left < 60 && top > 60) { //el bottom left
            tooltip.style.left = elProperties.left + 2 + 'px';
            tooltip.style.top = 'initial';
            tooltip.style.right = 'initial';
            tooltip.style.bottom = winHeight - elProperties.top + 10 + 'px';
            tooltip.classList.add('topRight');
        }
        else if (left > 50 && top < 50) { //el top right
            tooltip.style.left = 'initial';
            tooltip.style.top = elProperties.top + elProperties.height + 10 + 'px';
            tooltip.style.right = winWidth - elProperties.left - elProperties.width + 2 + 'px';
            tooltip.style.bottom = 'initial';
            tooltip.classList.add('bottomLeft');
        }
        else if (left > 50 && top > 50) { // el bottom right
            tooltip.style.left = 'initial';
            tooltip.style.top = 'initial';
            tooltip.style.right = winWidth - elProperties.left - elProperties.width + 2 + 'px';
            tooltip.style.bottom = winHeight - elProperties.top + 10 + 'px';
            tooltip.classList.add('topLeft');
        }
    }
});
