# Μπουτίκ Κρεάτων — Website

Στατικό site (HTML/CSS/JS, χωρίς build step) για το κρεοπωλείο «Μπουτίκ Κρεάτων»
(Μαργάρης Κώστας, Ρόδος), με πραγματικές φωτογραφίες καταστήματος/προϊόντων και
το πραγματικό λογότυπο. Layout: Header sticky, Hero, Ιστορία, Επιλεγμένα Κρέατα
(carousel με φίλτρα), Review CTA, Quote, Επισκεφθείτε (live ωράριο), Footer,
gate Λιανική/Χονδρική.

## Τοπική εκτέλεση

Οποιοσδήποτε static server, π.χ.:

```
npx http-server -p 8080
```

## Assets

- `assets/logo/logo-mark.jpg` — το πραγματικό λογότυπο (crop από φωτογραφία
  βιτρίνας). Χρησιμοποιείται στο header, gate, hero, footer, favicon.
- `assets/photos/` — φωτογραφίες καταστήματος (εξωτερικό, εσωτερικό, ιδιοκτήτης)
  και `assets/photos/cuts/` — κοντινά πλάνα προϊόντων ανά κατηγορία, όλα
  cropped/συμπιεσμένα από το αρχικό φωτογραφικό υλικό του καταστήματος.

## Προς συμπλήρωση πριν το production deploy

Δεν δόθηκαν ακόμα τα εξής, οπότε παραμένουν placeholder:

- **Τηλέφωνο**: `+302101234567` εμφανίζεται σε header, hero, drawer, visit,
  footer — χρειάζεται find & replace με το πραγματικό.
- **Ακριβής διεύθυνση**: το visit section δείχνει μόνο "Ρόδος" — προσθέστε
  οδό/αριθμό/ΤΚ στο `index.html` (`.visit-address`) και στο link Google Maps.
- **Βίντεο hero**: το `<video>` (`#heroVideo`) έχει `poster="assets/photos/hero.jpg"`
  αλλά όχι πηγή βίντεο — αν υπάρξει αρχείο, ενεργοποιήστε το commented `<source>`.
- **Google Review link**: το κουμπί "Κριτική στο Google" έχει placeholder
  `placeid=REPLACE_WITH_PLACE_ID` — αντικαταστήστε με το πραγματικό Place ID.
- **Ωράριο**: το αντικείμενο `hours` στο `js/main.js` (και η λίστα στο
  `#hoursList`) έχουν ενδεικτικές ώρες — επιβεβαιώστε τις πραγματικές.
- **Έτος έναρξης / γενιές**: `data-count` attributes στο `#about` (1985 / 3)
  είναι ενδεικτικά — βάλτε τα πραγματικά στοιχεία του καταστήματος.
