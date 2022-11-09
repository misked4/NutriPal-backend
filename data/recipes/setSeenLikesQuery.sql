UPDATE lajkoviRecept
  SET Seen='true'
  FROM lajkoviRecept INNER JOIN recepti ON lajkoviRecept.ReceptId = recepti.id
  WHERE recepti.KreatorId=@userId AND Seen='false'