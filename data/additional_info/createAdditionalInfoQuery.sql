insert into dodatne_informacije(
    [KreatorId],
    [Visina],
    [Tezina],
    [PotrosnjaKalorija],
    [DijetaId],
    [Cilj_ishrane],
    [Prvi_izvestaj],
    [BMR],
    [TEE],
    [BMI])
  values (@KreatorId, @Visina, @Tezina, @PotrosnjaKalorija, @DijetaId, @Cilj_ishrane, GETDATE(), @BMR, @TEE, @BMI)

SELECT SCOPE_IDENTITY() as lastAdded