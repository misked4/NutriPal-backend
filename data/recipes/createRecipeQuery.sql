INSERT INTO [nutripal].[dbo].[recepti] (Naslov, Opis, Broj_Lajkova, Datum, Minutaza, Broj_porcija, KreatorId, Slika, Cloudinary_public_id)
VALUES (@Naslov, @Opis, 0, GETDATE(), @Minutaza, @Broj_porcija, @KreatorId, @Slika, @Cloudinary_public_id)

SELECT SCOPE_IDENTITY() as lastAdded