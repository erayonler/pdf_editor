#!/usr/bin/env node
// PDF Oluşturucu - yerel sunucu (yalnızca Node.js yerleşik modülleri, kurulum gerekmez)
// Çalıştırma:  node sunucu.js      →  http://127.0.0.1:8765
// Oluşturulan PDF'ler bu dosyanın bulunduğu klasöre kaydedilir.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const KLASOR = __dirname;
const PORT = Number(process.env.PORT || 8765);
const MAKS = 500 * 1024 * 1024;
const TURLER = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

function guvenliAd(ad) {
  ad = (ad || '').trim().replace(/\.pdf$/i, '');
  return ad.replace(/[\\/:*?"<>|\x00-\x1f]/g, '_').replace(/^[ .]+|[ .]+$/g, '');
}
function json(res, kod, veri) {
  const g = Buffer.from(JSON.stringify(veri));
  res.writeHead(kod, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': g.length });
  res.end(g);
}

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);

  if (req.method === 'GET' && url === '/durum') return json(res, 200, { sunucu: true, klasor: KLASOR });

  if (req.method === 'GET') {
    const rel = url === '/' ? 'index.html' : url.slice(1);
    const izinli = rel === 'index.html' || /^lib\/[\w.-]+\.js$/.test(rel);
    if (!izinli) { res.writeHead(404); return res.end(); }
    return fs.readFile(path.join(KLASOR, rel), (err, data) => {
      if (err) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': TURLER[path.extname(rel)] || 'application/octet-stream' });
      res.end(data);
    });
  }

  if (req.method === 'POST' && url === '/kaydet') {
    let ad;
    try { ad = guvenliAd(decodeURIComponent(req.headers['x-dosya-adi'] || '')); } catch { ad = ''; }
    const uzerineYaz = req.headers['x-uzerine-yaz'] === '1';
    if (!ad) return json(res, 400, { hata: 'Geçerli bir dosya adı girin.' });
    const hedef = path.join(KLASOR, ad + '.pdf');
    if (fs.existsSync(hedef) && !uzerineYaz) { req.resume(); return json(res, 409, { hata: 'var', dosya: ad + '.pdf' }); }

    const parcalar = []; let boyut = 0, asildi = false;
    req.on('data', p => { boyut += p.length; if (boyut > MAKS) { asildi = true; req.destroy(); } else parcalar.push(p); });
    req.on('end', () => {
      if (asildi) return;
      const veri = Buffer.concat(parcalar);
      if (veri.subarray(0, 4).toString() !== '%PDF') return json(res, 400, { hata: 'Gelen veri PDF değil.' });
      const gecici = hedef + '.tmp';
      fs.writeFileSync(gecici, veri);
      fs.renameSync(gecici, hedef);
      console.log('Kaydedildi:', hedef);
      json(res, 200, { tamam: true, dosya: ad + '.pdf', yol: hedef });
    });
    return;
  }

  res.writeHead(404); res.end();
}).listen(PORT, '127.0.0.1', () => {
  const adres = `http://127.0.0.1:${PORT}`;
  console.log(`PDF Oluşturucu çalışıyor: ${adres}`);
  console.log(`Kayıt klasörü: ${KLASOR}`);
  console.log('Durdurmak için Ctrl+C');
  if (!process.argv.includes('--tarayici-yok')) {
    const komut = process.platform === 'win32' ? `start "" "${adres}"` : process.platform === 'darwin' ? `open "${adres}"` : `xdg-open "${adres}"`;
    exec(komut, () => {});
  }
});
