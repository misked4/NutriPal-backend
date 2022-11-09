SELECT recepti.[id]
      ,recepti.[Naslov]
      ,recepti.[Opis]
      ,recepti.[Broj_lajkova]
      ,recepti.[Datum]
      ,recepti.[Minutaza]
      ,recepti.[Broj_porcija]
      ,recepti.[KreatorId]
      ,korisnici.[Ime]
      ,korisnici.[Prezime]
      ,korisnici.[Email]
  FROM [nutripal].[dbo].[recepti]
  INNER JOIN korisnici
  ON korisnici.id = recepti.KreatorId
WHERE recepti.id = @id