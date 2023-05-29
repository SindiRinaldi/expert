const itActsAsFavoriteWartegModel = (favoriteWarteg) => {
  it('should return the warteg that has been added', async () => {
    favoriteWarteg.putWarteg({ id: 1 });
    favoriteWarteg.putWarteg({ id: 2 });

    expect(await favoriteWarteg.getWarteg(1))
      .toEqual({ id: 1 });
    expect(await favoriteWarteg.getWarteg(2))
      .toEqual({ id: 2 });
    expect(await favoriteWarteg.getWarteg(3))
      .toEqual(undefined);
  });

  it('should refuse a warteg from being added if it does not have the correct property', async () => {
    favoriteWarteg.putWarteg({ aProperty: 'property' });

    expect(await favoriteWarteg.getAllWarteg()).toEqual([]);
  });

  it('can return all of the warteg that have been added', async () => {
    favoriteWarteg.putWarteg({ id: 1 });
    favoriteWarteg.putWarteg({ id: 2 });

    expect(await favoriteWarteg.getAllWarteg()).toEqual(
      [
        { id: 1 },
        { id: 2 },
      ],
    );
  });

  it('should remove favorite warteg', async () => {
    favoriteWarteg.putWarteg({ id: 1 });
    favoriteWarteg.putWarteg({ id: 2 });
    favoriteWarteg.putWarteg({ id: 3 });

    await favoriteWarteg.deleteWarteg(1);

    expect(await favoriteWarteg.getAllWarteg()).toEqual([
      { id: 2 },
      { id: 3 },
    ]);
  });

  it('should handle request to remove a warteg even though the warteg has not been added', async () => {
    favoriteWarteg.putWarteg({ id: 1 });
    favoriteWarteg.putWarteg({ id: 2 });
    favoriteWarteg.putWarteg({ id: 3 });

    await favoriteWarteg.deleteWarteg(4);

    expect(await favoriteWarteg.getAllWarteg()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });

  it('should be able to search for wartegs', async () => {
    favoriteWarteg.putWarteg({ id: 1, title: 'warteg a' });
    favoriteWarteg.putWarteg({ id: 2, title: 'warteg b' });
    favoriteWarteg.putWarteg({ id: 3, title: 'warteg abc' });
    favoriteWarteg.putWarteg({ id: 4, title: 'ini mah warteg abcd' });

    expect(await favoriteWarteg.SearchWarteg('warteg a')).toEqual([
      { id: 1, title: 'warteg a' },
      { id: 3, title: 'warteg abc' },
      { id: 4, title: 'ini mah warteg abcd' },
    ]);
  });
};

export { itActsAsFavoriteWartegModel };
