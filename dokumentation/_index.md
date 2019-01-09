---
title: Spelregler/handbok/?
---
I det här skedet håller vi namnet ännu så länge öppet för reflektion och diskussion. Prioritet ett är innehåll och struktur.

## Inledning
Lorem ipsum.

## Syfte
Lorem ipsum.



<div class='p-4 mt-8 bg-grey-lightest rounded'>
Denna webbplats är under konstant förändring så det är en god idé att ha lite koll på de olika sidornas status:<br/>
	{{#each _config.docs.statuses}}

	  		<label class="Status Status-label" style="background-color: {{color}};">{{label}}</label>
	  		<p>{{description}}</p>

	{{/each}}
</div>
