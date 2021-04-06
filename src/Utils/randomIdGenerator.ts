const uuid = () =>
  "10000000100040008000100000000000".replace(/[018]/g, (c: any) =>
    (
      c ^
      ((window.crypto || window.Crypto).getRandomValues(new Uint8Array(1))[0] &
        (15 >> (c / 4)))
    ).toString(16)
  );

export default uuid;
