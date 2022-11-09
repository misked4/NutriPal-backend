UPDATE [nutripal].[dbo].[korisnici]
SET [Dodatne_info_Id] = NULL
WHERE [Dodatne_info_Id] = @infoId
DELETE [nutripal].[dbo].[dodatne_informacije]
WHERE [id] = @infoId