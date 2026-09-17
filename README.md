# Μπουτίκ Κρεάτων — Website

Στατικό site (HTML/CSS/JS, χωρίς build step) για το κρεοπωλείο, βασισμένο στο
layout: Header sticky, Hero, Ιστορία, Επιλεγμένα Κρέατα (carousel με φίλτρα),
Review CTA, Quote, Επισκεφθείτε (live ωράριο), Footer, gate Λιανική/Χονδρική.

## Τοπική εκτέλεση

Οποιοσδήποτε static server, π.χ.:

```
npx http-server -p 8080
```

## Προς αντικατάσταση με πραγματικά στοιχεία

Δεν υπήρχαν φωτογραφίες ή στοιχεία καταστήματος στο repository, οπότε
χρησιμοποιήθηκαν προσωρινά placeholders. Πριν το production deploy:

- **Φωτογραφίες**: τα σημεία με ετικέτα "Φωτογραφία…" (`index.html`,
  κλάσεις `.parallax-bg--exterior/--interior/--ambience` και οι κάρτες
  `.cut-photo--*`) έχουν gradient placeholders — προσθέστε πραγματικές
  φωτογραφίες καταστήματος/προϊόντων.
- **Βίντεο hero**: το `<video>` στο hero (`#heroVideo`) δεν έχει `<source>` —
  ενεργοποιήστε τη γραμμή στο `index.html` όταν υπάρχει αρχείο βίντεο.
- **Στοιχεία επικοινωνίας**: τηλέφωνο (`+302101234567`) και διεύθυνση
  εμφανίζονται σε πολλά σημεία (header, hero, footer, visit section) — κάντε
  find & replace.
- **Google Maps / Google Review links**: τα href στα κουμπιά "Οδηγίες" και
  "Κριτική στο Google" έχουν placeholder query params (`REPLACE_WITH_...`).
- **Ωράριο**: αντικείμενο `hours` στο `js/main.js` καθορίζει το live
  ανοιχτά/κλειστά status.
- **Έτος έναρξης / γενιές**: `data-count` attributes στο `#about`.
