# yettel-test

Implementiran REST API koristeći Express i PostgreSQL bazu podataka

# Kako pokrenuti?
Klonirati repozitorijum na lokalnu mašinu. U fajlu `/yettel-test/app/database/config.js` podesiti konfiguraciju za lokalnu PostgreSQL bazu. Potom u konzoli izvršiti komanu `npm install` radi instaliranja svih neophodnih paketa. Na kraju, u konzoli izvršiti komandu `npm run dev` kako bi se pokrenula aplikacija koja će slušati na putanji `http://localhost:3000`.

# Model i rute
Aplikacija omogućuje kreiranje, listanje i ažuriranje korisnika kao i CRUD operacije nad taskovima. Korisnicima se pristupa kroz putanju `/api/users`, dok se taskovima pristupa kroz `/api/tasks`. Na primer, sledećom komandom se vrši listanje svih korisnika zajedno sa straničenjem i sortiranjem po identifikatoru:
```
GET http://localhost:3000/api/users?page=0&size=3&sort=id,descc
```
Dok se listanje svih taskova zajedno sa straničenjem, sortiranjem po datumu kreiranja i filtriranjem po korisniku koji je autor vrši sa:
```
GET http://localhost:3000/api/tasks?page=0&size=3&sort=created,desc&userId=4
```

# Postman test kolekcija
U fajlu `/yettel-test/postman-collection/api-test.postman_collection.json` se nalazi kolekcija API testova koja se može importovati u postman i potom slati zahteve na server. Kolekcija sadrži dve podkolekcije: User i Task koje onda imaju svoje dve podkolekcije od kojih jedna sadrži zahteve koji očekuju uspešan odgovor sa servera, a druga sadrži zahteve koji očekuju neuspešan odgovor sa servera (na primer server prijavljuje grešku kao što je predugačko telo taska).

## Napomena
Usled nedostatka vremena, u rešenju nije implementirana authentikacija i autorizacija, te samim tim svaki korisnik može da lista sve druge korisnike i da menja njihove podatke i da lista i menja sve taskove (čak i one koje nije kreirao).
