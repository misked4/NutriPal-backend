SELECT *
  FROM [nutripal].[dbo].[recepti]
  WHERE id IN (
  SELECT TOP (100) [ReceptId]
  FROM [nutripal].[dbo].[lajkoviRecept]
  where KorisnikId = @KreatorId
  ) or KreatorId = @KreatorId
  ORDER BY Datum DESC