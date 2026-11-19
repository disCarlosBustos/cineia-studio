import re, json, html, sys
s=open(sys.argv[1],encoding='utf8').read()
rows=[]; acto=''; bloque=''
for tr in re.findall(r'<tr( class="[^"]*")?>(.*?)</tr>', s, re.S):
    cls, body = tr
    txt=lambda x: html.unescape(re.sub(r'<[^>]+>','',x)).strip()
    if 'acto' in cls: acto=txt(re.sub(r'<em>.*?</em>','',body)).replace('∞','').strip(); continue
    if 'bloque' in cls: bloque=txt(re.sub(r'<em>.*?</em>','',body)); continue
    tds=re.findall(r'<td[^>]*>(.*?)</td>', body, re.S)
    if len(tds)!=6: continue
    n,t=re.match(r'(\d+)<span class="t">([^<]+)',tds[0]).groups()
    desc,micro=re.match(r'(.*?)<div class="micro">(.*?)</div>',tds[2],re.S).groups()
    m=re.match(r'<b>(.*?)</b> &middot; int\. (\d)<br>(.*?)<br><span class="est">(.*?)</span>',tds[3])
    fun,inten,plano,emo=[html.unescape(x) for x in m.groups()]
    dur=float(re.match(r'([\d.]+)',tds[4]).group(1))
    org=txt(tds[5])
    tipo='rec' if 'c-rec' in tds[5] else ('nueva' if 'c-new' in tds[5] else 'boceto')
    rows.append(dict(n=int(n),entra=t,acto=acto,bloque=bloque,verso=txt(tds[1]),ve=txt(desc),micro=txt(micro),funcion=fun,intensidad=int(inten),plano=plano,emocion=emo,dura=dur,origen=org,tipo=tipo))
print(len(rows), round(sum(r['dura'] for r in rows),1), {k:sum(1 for r in rows if r['tipo']==k) for k in ['boceto','nueva','rec']})
json.dump(rows,open(sys.argv[2],'w'),ensure_ascii=False)
