---
title: Region Halland Design
---
Här hittar du allt du behöver för att designa tjänster och processer med kunden i fokus.

Denna webbplats är under konstant förändring så det är en god idé att ha lite koll på de olika sidornas status:

<div class='p-4 mt-8 bg-grey-lightest rounded'>
	{{#each _config.docs.statuses}}

	  		<label class="Status Status-label" style="background-color: {{color}};">{{label}}</label>
	  		<p>{{description}}</p>

	{{/each}}
</div>
