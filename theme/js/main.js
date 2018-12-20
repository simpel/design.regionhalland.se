spriteURL = 'https://unpkg.com/@regionhalland/styleguide-v2@latest/dist/icons/icons.svg';



setupMenu = (index, group) => {


	collections = $(group).find(`[data-behaviour='collection']`);

	collections.each(function(index,item) {

		$('> ul', item).addClass('hidden');

		$('> span', item).on('click', function(e) {
			e.stopPropagation();
			var ul = $(e.currentTarget).siblings('ul')
			var icon = $(e.currentTarget).find('use');
			var iconAttr = icon.attr('xlink:href');


			ul.toggleClass('hidden');

			if (iconAttr == '#minus') {
				icon.attr('xlink:href', '#plus');
			} else {
				icon.attr('xlink:href', '#minus');
			}

		});
	})


	currentPage = $(group).find(`[data-state='current']`);

	currentItems = $(currentPage).parentsUntil($(".depth-0", group), 'ul');

	//show the path down to to the current page.

	if(currentItems.length > 0) {
		currentItems.each(function(index,item) {

			$(item).removeClass('hidden');
			var icon = $(item).siblings('span').find('use');
			var iconAttr = icon.attr('xlink:href', '#minus');
		});
	}
}

$.get(spriteURL).done(data => {
	var div = document.createElement('div');
	div.className = "hidden";
	div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	document.body.insertBefore(div, document.body.childNodes[0]);
})

$( ".componentTabs" ).tabs();

$( ".Navigation-group" ).each(setupMenu);
