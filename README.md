Per chi conosceva il vecchio metodo di agiornamento delle icone e' pregato di leggere le seguenti righe;
chi non lo conosceva, puo' saltare direttamente a **Procedure di generazione**

# Procedure di generazione

Esistono due procedure di upgrading del modulo *lm-iconset*, una automatica ed una manuale (quando non dovesse funzionare la prima). 

## procedura auto

`yarn generate <path_della_folder_contenente_le_nuove_icone_in_formato_svg>`

questo comando prendera' tutti gli svg contenuti nella folder e si occupera' di aggiungere le nuove icone 
al set attuale. Nello specifico, ogni file trovato generera' un'icona che avra' il nome del file con il prefisso icon- 
```
e.g. mia-nuova-icona.svg -> icon-mia-nuova-icona
```

Se il precedente comando restituisce un errore di questo tipo:
```
It appears that icomoon.io is not responding correctly...
```

Si puo' aspettare e riprovare dopo un po' o procedere con la procedura manuale

## procedura manuale

Navigare su [icomoon.io](https://icomoon.io/app/#/select) in anonimo, cliccare sul bottone **Import Icons** ed aprire il file **selection.json**
situato sotto dist/, cliccare poi su **No** alla domanda che vi verra' posta. 
Questo carichera' l'attuale iconset all'interno dell'app e ci consentira' di aggiungere manualmente nuove icone per ri-generare un iconset nuovo.
Cliccare quindi sull'hamburgher menu a destra, successivamente su **Import to Set** ed andare ad aggiungere tutte le icone che si vuole aggiungere.
Assicurarsi poi di selezionare tutte le nuove icone (bordino giallo) e cliccare sul tasto **Generate Font** in basso a destra.
Nella pagina successiva, cliccate in basso a destra sul tasto **Download** ed eseguite il comando seguente

`yarn generate --manual <path_dello_zip_scaricato_da_icomoon.io>`

a prescindere dalla procedura utilizzata ora avrete all'interno della folder dist l'iconset aggiornato. Dopo aver committato le modifiche
sara' possibile rilasciare il nuovo pacchetto per poterlo utilizzare all'interno di [lm-site](https://github.com/Byte-Code/lm-site)

# Procedura di rilascio


Open *demo.html* to see a list of all the glyphs in your font along with their codes/ligatures.

To use the generated font in desktop programs, you can install the TTF font. In order to copy the character associated with each icon, refer to the text box at the bottom right corner of each glyph in demo.html. The character inside this text box may be invisible; but it can still be copied. See this guide for more info: https://icomoon.io/#docs/local-fonts

You won't need any of the files located under the *demo-files* directory when including the generated font in your own projects.

You can import *selection.json* back to the IcoMoon app using the *Import Icons* button (or via Main Menu → Manage Projects) to retrieve your icon selection.

You can add new icon to the set, using the hamburger menu on the right side of the set and by clicking *Import to Set*

After import the new selection of icons, bump version in **bower.json**
