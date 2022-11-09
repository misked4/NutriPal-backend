INSERT INTO [nutripal].[dbo].[korisnici]
    (
        [Ime]
        ,[Prezime]
        ,[Email]
        ,[Lozinka]
        ,[Datum_rodjenja]
        ,[Uloga]
        ,[Telefon]
        ,[Adresa]
        ,[Slika]
        ,[Dodatne_info_Id]
        ,[Pol]
        ,[Cloudinary_public_id]
    )
VALUES
    (
        @Ime
        ,@Prezime
        ,@Email
        ,@Lozinka
        ,@Datum_rodjenja
        ,@Uloga
        ,@Telefon
        ,@Adresa
        ,@Slika
        ,@Dodatne_info_Id
        ,@Pol
        ,@Cloudinary_public_id
)

 SELECT * FROM [nutripal].[dbo].[korisnici]
 WHERE [Email]=@Email