INSERT INTO [nutripal].[dbo].[dijete] (Naziv, Opis, UH_min, UH_max, PROTEINI_min, PROTEINI_max, MASTI_min, MASTI_max, KreatorId)
VALUES (@Naziv, @Opis, @UH_min, @UH_max, @PROTEINI_min, @PROTEINI_max, @MASTI_min, @MASTI_max, @KreatorId)

SELECT SCOPE_IDENTITY() as lastAdded
