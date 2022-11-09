SELECT [ReceptId]
      ,[NamirnicaId]
      ,[Kolicina]
      ,[Jedinica_mere]
	  ,[Naziv]
      ,[kcal]
      ,[UH]
      ,[Proteini]
      ,[Masti]
      ,[Kategorija]
      ,[Slika]
  FROM [nutripal].[dbo].[namirnice_u_receptu]
  INNER JOIN namirnice ON [namirnice_u_receptu].NamirnicaId = namirnice.id
  WHERE ReceptId=@recipeId