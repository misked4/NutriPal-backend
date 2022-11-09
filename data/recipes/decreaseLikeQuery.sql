UPDATE recepti
SET Broj_lajkova = Broj_lajkova - 1
WHERE id = @ReceptId

DELETE FROM [nutripal].[dbo].[lajkoviRecept] WHERE ReceptId=@ReceptId AND KorisnikId=@KorisnikId

SELECT Broj_lajkova
FROM recepti
where id = @ReceptId
select * from recepti
