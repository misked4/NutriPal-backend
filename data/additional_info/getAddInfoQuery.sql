SELECT TOP (1000) [id]
      ,[KreatorId]
      ,[Visina]
      ,[Tezina]
      ,[PotrosnjaKalorija]
      ,[DijetaId]
      ,[Cilj_ishrane]
      ,[Prvi_izvestaj]
  FROM [nutripal].[dbo].[dodatne_informacije]
  WHERE id = @id