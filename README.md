Per chi conosceva il vecchio metodo di agiornamento delle icone e' pregato di leggere le seguenti righe;
chi non lo conosceva, puo' saltare direttamente a **Procedure di generazione**

# Legacy disclaimer
C'era un tempo in cui **lm-iconset** era un pacchetto bower e di fatto l'unico progetto che lo usava referenziava direttamente
l'ultimo commit del repo. Adesso e' diventato un pacchetto npm, ha cambiato nome in **@lmit/lm-iconset**
e di conseguenza ogni volta che si aggiorna sara' necessario aggiornare la sua versione nei progetti che lo utilizzano.

# Procedure di generazione

Esistono due procedure di upgrading del modulo *lm-iconset*, una automatica ed una manuale (quando non dovesse funzionare la prima).

## procedura auto
Prima di cominciare, scaricate tutte le nuove icone e mettetele in una cartella.
Una volta fatto lanciare il comando

`yarn generate <path_della_folder_contenente_le_nuove_icone_in_formato_svg>`

questo comando prendera' tutti gli svg contenuti nella folder e si occupera' di aggiungere le nuove icone
al set attuale. Nello specifico, ogni file trovato generera' un'icona che avra' il nome del file con il prefisso icon-
```
e.g. mia-nuova-icona.svg -> icon-mia-nuova-icona
```

Sotto dist/ verra' anche generato *demo.html* che permette di vedere le icone appena aggiunte che saranno in cima alla lista

Se il precedente comando restituisce un errore di questo tipo:
```
It appears that icomoon.io is not responding correctly...
```

Si puo' aspettare e riprovare dopo un po' o procedere con la procedura manuale

## procedura manuale

Navigare su [icomoon.io](https://icomoon.io/app/#/select) in anonimo, cliccare sul bottone **Import Icons** ed aprire il file **selection.json**
situato sotto dist/, cliccare poi su **No** alla domanda che vi verra' posta.
Questo carichera' l'attuale iconset all'interno dell'app e ci consentira' di aggiungere manualmente nuove icone per ri-generare un iconset nuovo.
Cliccare quindi sull'hamburger menu a destra, successivamente su **Import to Set** ed andare ad aggiungere tutte le icone che si vuole aggiungere.
Assicurarsi poi di selezionare tutte le nuove icone (bordino giallo) e cliccare sul tasto **Generate Font** in basso a destra.
Nella pagina successiva, cliccate in basso a destra sul tasto **Download** ed eseguite il comando seguente

`yarn generate --manual <path_dello_zip_scaricato_da_icomoon.io>`

# Procedura di rilascio

A prescindere dalla procedura utilizzata, ora avrete, all'interno della folder dist, l'iconset aggiornato. Dopo aver committato le modifiche
sara' possibile rilasciare il nuovo pacchetto per poterlo utilizzare all'interno di [lm-site](https://github.com/Byte-Code/lm-site)

Il comando `yarn release` si occupera' di fare il bumping della minor version, creare il git tag e pushare in remoto le modifiche

# Procedura di post-rilascio

Ora che il nostro iconset e' stato aggiornato non resta altro che fare l'upgrade del pacchetto **@lmit/lm-iconset** [lm-site](https://github.com/Byte-Code/lm-site)
