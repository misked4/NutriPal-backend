SELECT TOP (1000) [ReceptId]
      ,[KorisnikId]
      ,[ObrokUTokuDanaId]
      ,[receptKorisnikaPoObroku].[Broj_porcija]
      ,[sum_kcal]
      ,[sum_UH]
      ,[sum_PROTEINI]
      ,[sum_MASTI]
      ,[recepti].[Naslov]
  FROM [nutripal].[dbo].[receptKorisnikaPoObroku]
  INNER JOIN recepti on receptKorisnikaPoObroku.ReceptId = recepti.id
  WHERE KorisnikId = @KorisnikId AND ObrokUTokuDanaId = @ObrokUTokuDanaId