UPDATE recepti
SET Broj_lajkova = Broj_lajkova + 1
WHERE id = @ReceptId

INSERT INTO [nutripal].[dbo].[lajkoviRecept] (ReceptId, KorisnikId,Seen)
VALUES(@ReceptId, @KorisnikId, 'false')

SELECT Broj_lajkova
FROM recepti
where id = @ReceptId
select * from recepti
