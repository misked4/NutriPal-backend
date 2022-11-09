SELECT
	korisnici.Ime,
	korisnici.Prezime,
	recepti.Id as receptId,
	recepti.Naslov
  FROM lajkoviRecept
  INNER JOIN korisnici
  ON korisnici.id = lajkoviRecept.KorisnikId
  INNER JOIN recepti
  ON recepti.id = lajkoviRecept.ReceptId
WHERE lajkoviRecept.Seen = 'false' AND recepti.KreatorId = @userId AND korisnici.id != recepti.KreatorId
ORDER BY lajkoviRecept.ReceptId DESC