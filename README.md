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

- `assets/logo/logo-mark.png` — το επίσημο λογότυπο (διαφανές φόντο).
  Χρησιμοποιείται στο header, gate, hero, footer, favicon.
- `assets/photos/` — φωτογραφίες καταστήματος (εξωτερικό, εσωτερικό, ιδιοκτήτης)
  και `assets/photos/cuts/` — κοντινά πλάνα προϊόντων ανά κατηγορία.
- `assets/video/hero-loop.mp4` (+ `.webm` fallback) — το βίντεο background του
  hero, χωρίς ήχο (muted autoplay), με `assets/photos/hero-video-poster.jpg`
  ως poster frame.

## Προς συμπλήρωση πριν το production deploy

Τηλέφωνο (`2241 304916`), διεύθυνση (Ατταβύρου & Τύρου 1, Ροδίνι 851 00, Ρόδος)
και ωράριο είναι πλέον τα πραγματικά στοιχεία του καταστήματος (από Google Maps),
ενημερωμένα σε `index.html` και στο αντικείμενο `hours` του `js/main.js`
(το live status Ανοιχτά/Κλειστά στο `#hoursCard` χρωματίζεται πράσινο/κόκκινο
βάσει αυτών). Παραμένουν placeholder:

- **Google Review link**: το κουμπί "Κριτική στο Google" έχει placeholder
  `placeid=REPLACE_WITH_PLACE_ID` — αντικαταστήστε με το πραγματικό Place ID.
- **Έτος έναρξης / γενιές**: `data-count` attributes στο `#about` (1985 / 3)
  είναι ενδεικτικά — βάλτε τα πραγματικά στοιχεία του καταστήματος.
