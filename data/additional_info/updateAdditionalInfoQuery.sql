UPDATE [nutripal].[dbo].[dodatne_informacije]
   SET [Visina] = @Visina
    ,[Tezina] = @Tezina
    ,[PotrosnjaKalorija] = @PotrosnjaKalorija
    ,[DijetaId] = @DijetaId
    ,[Cilj_ishrane] = @Cilj_ishrane
 WHERE [id]=@id
 
 SELECT * FROM [nutripal].[dbo].[dodatne_informacije]
 WHERE [id]=@id

