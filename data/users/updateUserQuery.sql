UPDATE [nutripal].[dbo].[korisnici]
   SET  [Ime] = @Ime
        ,[Prezime] = @Prezime
        /*NEMAMO EMAIL*/
        ,[Lozinka] = @Lozinka
        ,[Datum_rodjenja] = @Datum_rodjenja
        ,[Uloga] = @Uloga
        ,[Telefon] = @Telefon
        ,[Adresa] = @Adresa
        ,[Slika] = @Slika
        ,[Pol] = @Pol
        ,[Cloudinary_public_id] = @Cloudinary_public_id
 WHERE [id]=@id

 SELECT * FROM [nutripal].[dbo].[korisnici]
 WHERE [id]=@id

