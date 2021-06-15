const
	SELECTORS = {
		target: "keepaway-target",
		score: "keepaway-score"
	},
	IMAGES = {
		width: 54,
		height: 111,
		base: "url(../assets/images/projects/keepaway/nyx.png)",
		upStatic: "url(../assets/images/projects/keepaway/nyx-up.png)",
		upAnimated: "url(../assets/images/projects/keepaway/nyx-thrust-up.png)",
		downStatic: "url(../assets/images/projects/keepaway/nyx-down.png)",
		downAnimated: "url(../assets/images/projects/keepaway/nyx-thrust-down.png)"
	};

let count = 0,
	previousScrollPosition = 0,
	start = true,
	scrollTimeout;

/**
 * @function pageScroll
 * page scroll handler
 */
function pageScroll(target) {
	clearTimeout(scrollTimeout);

	if ( window.scrollY > previousScrollPosition || start === true ) {
		start = false;
		target.style.background = IMAGES.downAnimated;

		setTimeout(function() {
			target.style.background = IMAGES.downStatic;
		}, 500);
	} else {
		target.style.background = IMAGES.upAnimated;

		setTimeout(function() {
			target.style.background = IMAGES.upStatic;
		}, 500);
	}

	previousScrollPosition = window.scrollY;
}

/**
 * @function catchtargetEl
 * targetEl catch handler
 */
function catchTargetEl(target) {
	var area = {x: 0, y: 0},
		position = {x: 0, y: 0};

	area.y = window.innerHeight - IMAGES.width;
	area.x = window.innerWidth - IMAGES.height;

	position.y = Math.floor(Math.random() * area.y);
	position.x = Math.floor(Math.random() * area.x);

	target.style.left = position.x + 'px';
	target.style.top = position.y + 'px';

	count += parseInt(1);
	document.getElementById(SELECTORS.score).innerHTML = count;
}

/**
 * @function initListeners
 * setup the listeners for page scroll and mouse interactivity
 */
function initListeners(targetEl) {
	targetEl.addEventListener('mouseover', function() {
		catchTargetEl(targetEl);
	});

	targetEl.addEventListener('click', function() {
		catchTargetEl(targetEl);
	});

	scrollTimeout = setTimeout(function() {
		window.addEventListener('scroll', function() {
			pageScroll(targetEl);
		});
    }, 1000);
}

/**
 * @function init
 * Initialise code
 */
export default function init() {
	let targetEl;

	targetEl = document.getElementById(SELECTORS.target);
	targetEl.style.background = IMAGES.base;
	initListeners(targetEl);
}
