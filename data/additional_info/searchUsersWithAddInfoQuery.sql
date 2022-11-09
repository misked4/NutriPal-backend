SELECT TOP 5 korisnici.[id]
      ,korisnici.[Ime]
      ,korisnici.[Prezime]
      ,korisnici.[Email]
      ,korisnici.[Lozinka]
      ,korisnici.[Datum_rodjenja]
      ,korisnici.[Uloga]
      ,korisnici.[Telefon]
      ,korisnici.[Adresa]
      ,korisnici.[Slika]
      ,korisnici.[Dodatne_info_Id]
      ,korisnici.[Pol]
      ,dodatne_informacije.[KreatorId]
      ,dodatne_informacije.[Visina]
      ,dodatne_informacije.[Tezina]
      ,dodatne_informacije.[PotrosnjaKalorija]
      ,dodatne_informacije.[DijetaId]
      ,dodatne_informacije.[Cilj_ishrane]
      ,dodatne_informacije.[Prvi_izvestaj]
  FROM korisnici
  INNER JOIN dodatne_informacije
  ON korisnici.Dodatne_info_Id = dodatne_informacije.id
  WHERE dodatne_informacije.[KreatorId] = @userId AND korisnici.Email LIKE @word+'%'