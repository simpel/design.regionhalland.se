spriteURL = 'https://unpkg.com/@regionhalland/styleguide-v2@latest/dist/icons/icons.svg';

$.get(spriteURL).done(data => {
	var div = document.createElement('div');
	div.className = "hidden";
	div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	document.body.insertBefore(div, document.body.childNodes[0]);
})
