---
title: "Vyhledávání na YouTube bez denní kvóty Google API"
date: 2026-10-25
category: "Novinky"
description: "Vyhledávání videí jsme přesunuli z Google API na yt-search. Odpadá denní kvóta API, nová metoda je ale méně předvídatelná."
---

Dosavadní vyhledávání používalo YouTube Data API od Googlu. Jedno hledání spotřebovalo 100 jednotek kvóty. Výchozí denní kvóta projektu bývá 10 000 jednotek, což představuje přibližně 100 hledání denně, pokud ji nečerpají další operace. Po vyčerpání kvóty další hledání selhala až do jejího obnovení.

Nově výsledky získáváme pomocí balíčku `yt-search`, který prohledává veřejné výsledky YouTube bez Google API klíče a jeho denní kvóty. Úspěšná hledání se na deset minut ukládají do mezipaměti; souběžné stejné dotazy sdílejí jeden požadavek.

Výhodou je, že hledání nezastaví vyčerpaná kvóta Google API a není potřeba udržovat API klíč. Nevýhodou je, že `yt-search` není oficiální API: způsob získávání výsledků se může po změnách YouTube přestat chovat správně nebo být zablokován. Také nezaručuje, že každé nalezené video půjde přehrát přímo v aplikaci.
