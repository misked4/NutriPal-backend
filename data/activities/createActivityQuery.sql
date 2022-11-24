INSERT INTO [nutripal].[dbo].[aktivnosti] (Naziv, Faktor)
VALUES (@Naziv, @Faktor)

SELECT SCOPE_IDENTITY() as lastAdded
