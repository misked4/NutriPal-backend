SELECT recepti.[id]
      ,recepti.[Naslov]
      ,recepti.[Opis]
      ,recepti.[Broj_lajkova]
      ,recepti.[Datum]
      ,recepti.[Minutaza]
      ,recepti.[Broj_porcija]
      ,recepti.[KreatorId]
      ,recepti.[Slika] as ReceptSlika
      ,korisnici.[Ime]
      ,korisnici.[Prezime]
      ,korisnici.[Email]
      ,korisnici.[Slika] as KorisnikSlika
  FROM [nutripal].[dbo].[recepti]
  INNER JOIN korisnici
  ON korisnici.id = recepti.KreatorId
  WHERE Naslov LIKE @word+'%'
  ORDER BY Datum DESC
   OFFSET @number ROWS
 FETCH NEXT 10 ROWS ONLY