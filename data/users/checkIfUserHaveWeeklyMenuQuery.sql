SELECT TOP (1000) [ReceptId]
      ,[KorisnikId]
      ,[ObrokUTokuDanaId]
      ,[Broj_porcija]
  FROM [nutripal].[dbo].[receptKorisnikaPoObroku]
INNER JOIN obrokUTokuDana on ObrokUTokuDanaId = obrokUTokuDana.id
WHERE KorisnikId = @KorisnikId AND obrokUTokuDana.Cilj_ishrane = @Cilj_ishrane