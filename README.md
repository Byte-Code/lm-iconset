Per chi conosceva il vecchio metodo di agiornamento delle icone e' pregato di leggere le seguenti righe;
chi non lo conosceva puo' saltare direttamente a procedure di upgrading





# Procedure di upgrading

Esistono due procedure di upgrading del modulo *lm-iconset*, una automatica ed una manuale
quando non dovesse funzionare la prima. Di default il comando 

Open *demo.html* to see a list of all the glyphs in your font along with their codes/ligatures.

To use the generated font in desktop programs, you can install the TTF font. In order to copy the character associated with each icon, refer to the text box at the bottom right corner of each glyph in demo.html. The character inside this text box may be invisible; but it can still be copied. See this guide for more info: https://icomoon.io/#docs/local-fonts

You won't need any of the files located under the *demo-files* directory when including the generated font in your own projects.

You can import *selection.json* back to the IcoMoon app using the *Import Icons* button (or via Main Menu → Manage Projects) to retrieve your icon selection.

You can add new icon to the set, using the hamburger menu on the right side of the set and by clicking *Import to Set*

After import the new selection of icons, bump version in **bower.json**
