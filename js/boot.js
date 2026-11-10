(() => {
  const a = [90,186,185,217,120,16,120,169,96,92,149,12,68,37,61,167,169,75,225,150,146,127,197,79,136,0,67,191,181,59,7,247];
  const z = [138,216,80,172,14,18,201,16,217,166,221,75,91,41,107,224,143,203,227,53,128,13,33,147,144,34,206,58,117,106,5,76];
  const fail = () => {
    const bootEl = document.getElementById("boot");
    if (bootEl) {
      bootEl.hidden = false;
      bootEl.textContent = "LOAD FAILED";
    }
  };
  const boot = async () => {
    const res = await fetch("app.dat?v=protect2");
    if (!res.ok) throw new Error("payload " + res.status);
    const bytes = new Uint8Array(await res.arrayBuffer());
    const k = a;
    void z;
    for (let i = 0; i < bytes.length; i++) bytes[i] ^= k[i % k.length];
    const code = new TextDecoder("utf-8").decode(bytes);
    if (code.indexOf("AOOOText") < 0) throw new Error("bad payload");
    (0, eval)(code);
  };
  boot().catch((err) => {
    console.error(err);
    fail();
  });
})();
