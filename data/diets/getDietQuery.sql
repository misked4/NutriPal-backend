/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[Naziv]
      ,[Opis]
      ,[UH_min]
      ,[UH_max]
      ,[PROTEINI_min]
      ,[PROTEINI_max]
      ,[MASTI_min]
      ,[MASTI_max]
      ,[KreatorId]
  FROM [nutripal].[dbo].[dijete]
  WHERE id = @id