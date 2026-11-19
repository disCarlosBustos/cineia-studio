# Prueba piloto 01: completa cada viñeta con escenario, luz y propuestas de cámara, sonido y cómic animado.
import json, sys
V = json.load(open(sys.argv[1]))
OUT = sys.argv[2]
# Escenarios y luz (documento del 4 nov). Rangos por viñeta.
ESC = [
 ((1,7),'El nido en el Bosque Dorado','Amanecer','sol','Sol bajo de lado entre los troncos, niebla a ras de suelo','pájaros del amanecer, hojas'),
 ((8,10),'La plataforma del Dorado','Media tarde','cenital','Cenital alta y plana, sin sombra','murmullo de la comunidad, viento'),
 ((11,12),'La línea de cercas','Tarde','sol lateral','Sol de lado, sombras largas de las estacas','martillazos, crujido de madera'),
 ((13,15),'El puesto de control','Tarde que cae','contraluz ámbar','Contraluz duro entre las tablas, contraste 8:1','servos de los robots, sellos'),
 ((16,16),'El árbol de detención, exterior','Crepúsculo','cielo cubierto','Luz plana de cielo cubierto, sin sombra','viento entre estacas'),
 ((17,21),'El árbol de detención, interior','Primera noche','luna abierta','Un solo haz de luna por la abertura de espinas','respiraciones, grillos lejanos'),
 ((22,22),'La orilla sur del río','Noche','plata de agua','Luna sobre el agua, la madre casi en silueta','corriente del río'),
 ((23,23),'El claro de los hongos','Noche','verde de luciérnagas','Luz verde fría desde el suelo','susurros, alas'),
 ((24,27),'El bosque de raíces','Noche cerrada','luna lateral','Luna fría muy lateral, niebla, luciérnagas','búhos, ramas'),
 ((28,28),'El túnel de los conejos','Noche, bajo tierra','punto al fondo','Un punto de luz al fondo, todo en contraluz','tierra que cae, patas al ritmo del golpeteo'),
 ((29,31),'El bosque de raíces','Noche cerrada','luna lateral','Luna fría muy lateral, niebla, luciérnagas','búhos, ramas'),
 ((32,33),'El arroyo de Junco','Noche','plata de agua','Luna en el agua quieta; la gorra roja es el único color','gotas, agua quieta'),
 ((34,36),'El puesto de control de noche','Madrugada','ámbar de farol','Farol ámbar en el poste','farol que zumba, servos'),
 ((37,37),'El puesto de control de noche','Madrugada','rojo de alarma','El rojo de los lentes invade todo','alarma'),
 ((38,38),'El árbol de detención, interior','Primera noche','luna abierta','Un solo haz de luna (lámina reciclada de la 21)','golpeteo en la madera'),
 ((39,39),'El claro de los hongos','Noche','verde de luciérnagas','Luz verde fría desde el suelo (lámina reciclada de la 23)','susurros, alas'),
 ((40,40),'El bosque de raíces','Noche cerrada','luna lateral','Luna lateral (lámina reciclada de la 24)','pasos de la caravana'),
 ((41,44),'El remanso del río','Noche, luna alta','plata de agua','Plata dura sobre el agua, ningún escondite','corriente, caparazones'),
 ((45,47),'Bajo el agua','Noche sumergida','luna rota','Luna rota vista desde abajo, negro hacia el fondo','sonido sordo; la canción se filtra'),
 ((48,51),'El remanso del río','Noche, luna alta','plata de agua','Plata dura sobre el agua','corriente, tos de Nuez'),
 ((52,54),'La selva','Alba azul','alba azul','Primera claridad fría que vira a dorado','selva que despierta'),
 ((55,58),'El Gran Árbol','Amanecer pleno','sol','Sol bajo sobre la corteza alta, niebla dorada','viento en la copa'),
 ((59,62),'El valle dañado','Día pleno','día','Luz limpia y alta, color drenado, polvo','herramientas, agua en canales'),
 ((63,65),'El valle en estaciones','Atardecer y amanecer alternados','variable','La hora cambia dentro del mismo encuadre','estaciones: lluvia, insectos, viento'),
 ((66,66),'El valle dañado','Día pleno','día','Luz limpia y alta','martillo de Junco'),
 ((67,72),'El valle reconstruido','Atardecer dorado','atardecer','Sol bajo cálido, luces de las casas encendidas','comunidad tranquila, grillos'),
]
def esc(n):
    for (a,b),*r in ESC:
        if a<=n<=b: return r
LENTE = {'Gran plano general':'24 mm','Plano general':'28 mm','Plano americano':'35 mm','Plano medio':'50 mm','Plano medio corto':'50 mm','Primer plano':'85 mm','Primerísimo / detalle':'100 mm macro'}
MOV = {'Establecer':'Paneo lento','Contemplar':'Fija','Impactar':'Fija, entra al corte','Revelar':'Empuje corto','Transitar':'Seguimiento lateral','Decidir':'Fija, empuje muy lento','Reaccionar':'Fija'}
COMP = {'Establecer':'Tercios, horizonte bajo, figuras pequeñas','Contemplar':'Aire amplio, figura descentrada','Impactar':'La figura llena el cuadro','Revelar':'El objeto en el punto fuerte','Transitar':'Diagonal de izquierda a derecha','Decidir':'Mirada hacia el lado abierto','Reaccionar':'Mirada fuera de cuadro'}
GUARDIAS = {8,9,10,11,13,37}
GOLPE = {6,21,26,38,56,57,67,72}
out=[]; prev=None
for r in V:
    n=r['n']; e=esc(n)
    lugar,hora,fuente,luz,amb = e
    f=r['funcion']; pl=r['plano']
    if n in (8,9,10,37): ang='Contrapicado'
    elif n==16: ang='Cenital'
    elif pl in ('Gran plano general',) : ang='Picado suave'
    elif f=='Decidir': ang='Frontal'
    else: ang='Normal'
    alt = 'A la altura de los guardias' if n in GUARDIAS else ('Desde lo alto' if pl=='Gran plano general' else 'A la altura de las crías')
    mov = MOV[f]
    if pl=='Primerísimo / detalle' and f!='Impactar': mov='Empuje lento al detalle'
    comp = COMP[f]
    if n in GUARDIAS and f=='Transitar': comp='Diagonal de derecha a izquierda, contra el viaje'
    # transición de entrada
    if n==1: tr='Abre de negro'
    elif f=='Impactar': tr='Corte seco'
    elif prev and prev['acto']!=r['acto']: tr='Fundido encadenado'
    elif prev and esc(prev['n'])[0]!=lugar and f in ('Contemplar','Establecer'): tr='Fundido encadenado'
    else: tr='Corte'
    son = amb
    if n in GOLPE: son = 'Golpeteo en la madera, a tiempo con la canción; ' + amb
    if n==21 or n==38 or n==56: son += '; silencio entre el segundo y el tercer golpe'
    if n==57: son = 'Silencio antes de la respuesta; después la corteza devuelve el ritmo'
    # cómic animado: movimiento sobre la lámina fija
    if f in ('Establecer','Transitar'): cm='Paneo'
    elif f in ('Revelar','Decidir'): cm='Acercamiento'
    elif f=='Contemplar': cm='Acercamiento muy lento'
    elif f=='Impactar': cm='Fijo, sacudida de 2 cuadros'
    else: cm='Fijo'
    d=dict(r); d.update(lugar=lugar,hora=hora,fuente=fuente,luz=luz,angulo=ang,altura=alt,lente=LENTE[pl],movimiento=mov,composicion=comp,transicion=tr,sonido=son,comic=cm,cuadros=round(r['dura']*24))
    out.append(d); prev=r
# fin
out[-1]['salida']='Fundido a negro'
# revisión de la regla de luz: dos escenarios nocturnos seguidos no comparten fuente
avisos=[]
for a,b in zip(out,out[1:]):
    if a['lugar']!=b['lugar'] and a['fuente']==b['fuente'] and 'Noche' in a['hora']+b['hora']:
        avisos.append((a['n'],b['n'],a['fuente']))
print('avisos luz', avisos)
print('cortes', {t:sum(1 for x in out if x['transicion']==t) for t in set(x['transicion'] for x in out)})
print('cuadros', sum(x['cuadros'] for x in out))
json.dump(out,open(OUT+'/vinetas.json','w'),ensure_ascii=False)
open(OUT+'/vinetas.js','w').write('/* vinetas.js · Prueba piloto 01 · 19 de noviembre de 2026\n * Las 72 viñetas del desglose con escenario y luz (documento del 4 de noviembre) y propuestas de cámara, sonido y cómic animado por regla.\n * Generado con cov_tools/piloto01.py; congelado.\n */\nwindow.CineIAVinetas = '+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
# subtítulos SRT: un subtítulo por verso, juntando viñetas seguidas con el mismo verso
def tc(s, sep=','):
    h=int(s//3600); m=int(s%3600//60); sec=s%60
    return f'{h:02d}:{m:02d}:{int(sec):02d}{sep}{int(round((sec-int(sec))*1000)):03d}'
t=0; subs=[]
for x in out:
    if subs and subs[-1][2]==x['verso']: subs[-1][1]=t+x['dura']
    else: subs.append([t,t+x['dura'],x['verso']])
    t+=x['dura']
with open(OUT+'/bosque-cambia.srt','w') as fh:
    for i,(a,b,v) in enumerate(subs,1): fh.write(f'{i}\n{tc(a)} --> {tc(b)}\n{v}\n\n')
# lista de edición CMX 3600 a 24 cuadros por segundo
def tcf(fr):
    return f'{fr//86400:02d}:{fr//1440%60:02d}:{fr//24%60:02d}:{fr%24:02d}'
fr=0
with open(OUT+'/bosque-cambia.edl','w') as fh:
    fh.write('TITLE: EL BOSQUE CAMBIA PILOTO 01\nFCM: NON-DROP FRAME\n\n')
    for x in out:
        c=x['cuadros']; src=f"V{x['n']:03d}"
        tipo='C   ' if x['transicion']!='Fundido encadenado' else 'D    012'
        fh.write(f"{x['n']:03d}  {src:<8} V     {tipo}  00:00:00:00 {tcf(c)} {tcf(3600*24+fr)} {tcf(3600*24+fr+c)}\n* FROM CLIP NAME: {src}_{x['lugar'][:24].upper()}\n\n")
        fr+=c
print(len(subs),'subtitulos', fr,'cuadros')
