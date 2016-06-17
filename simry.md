## Members

<dl>
<dt><a href="#KEY_DOWN">KEY_DOWN</a> : <code>Number</code></dt>
<dd><p>&quot;S&quot; taustiņš</p>
</dd>
<dt><a href="#KEY_UP">KEY_UP</a> : <code>Number</code></dt>
<dd><p>&quot;W&quot; taustiņš</p>
</dd>
<dt><a href="#KEY_RIGHT">KEY_RIGHT</a> : <code>Number</code></dt>
<dd><p>&quot;D&quot; taustiņš</p>
</dd>
<dt><a href="#KEY_LEFT">KEY_LEFT</a> : <code>Number</code></dt>
<dd><p>&quot;A&quot; taustiņš</p>
</dd>
<dt><a href="#KEY_SPACEBAR">KEY_SPACEBAR</a> : <code>Number</code></dt>
<dd><p>&quot;Spacebar&quot; taustiņš</p>
</dd>
<dt><a href="#COLOR_RED">COLOR_RED</a> : <code>Number</code></dt>
<dd><p>Sarkana krāsa</p>
</dd>
<dt><a href="#COLOR_BLUE">COLOR_BLUE</a> : <code>Number</code></dt>
<dd><p>Zila krāsa</p>
</dd>
<dt><a href="#COLOR_GREEN">COLOR_GREEN</a> : <code>Number</code></dt>
<dd><p>Zaļa krāsa</p>
</dd>
<dt><a href="#COLOR_PINK">COLOR_PINK</a> : <code>Number</code></dt>
<dd><p>Rozā krāsa</p>
</dd>
<dt><a href="#COLOR_YELLOW">COLOR_YELLOW</a> : <code>Number</code></dt>
<dd><p>Dzeltena krāsa</p>
</dd>
<dt><a href="#COLOR_WHITE">COLOR_WHITE</a> : <code>Number</code></dt>
<dd><p>Balta krāsa</p>
</dd>
<dt><a href="#COLOR_BLACK">COLOR_BLACK</a> : <code>Number</code></dt>
<dd><p>Balta krāsa</p>
</dd>
<dt><a href="#COLOR_GRAY">COLOR_GRAY</a> : <code>Number</code></dt>
<dd><p>Pelēka krāsa</p>
</dd>
<dt><a href="#COLOR_ORANGE">COLOR_ORANGE</a> : <code>Number</code></dt>
<dd><p>Oranža krāsa</p>
</dd>
<dt><a href="#COLOR_PURPLE">COLOR_PURPLE</a> : <code>Number</code></dt>
<dd><p>Violeta krasa</p>
</dd>
<dt><a href="#COLOR_BROWN">COLOR_BROWN</a> : <code>Number</code></dt>
<dd><p>Brūna krāsa</p>
</dd>
<dt><a href="#COLOR_TEAL">COLOR_TEAL</a> : <code>Number</code></dt>
<dd><p>Teal krāsa</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#init">init(width, height, options)</a></dt>
<dd><p>Sākt spēli.</p>
</dd>
<dt><a href="#animate">animate(tick)</a></dt>
<dd><p>Iestatīt animācijas funkciju, kuru izsauc ar ļoti mazu laika starpību.</p>
</dd>
<dt><a href="#text">text(x, y, text, style)</a> ⇒</dt>
<dd><p>Zīmēt tekstu.</p>
</dd>
<dt><a href="#rectangle">rectangle(x, y, width, height, color)</a> ⇒</dt>
<dd><p>Zīmēt četrstūri.</p>
</dd>
<dt><a href="#triangle">triangle(x1, y1, x2, y2, x3, y3, color)</a> ⇒</dt>
<dd><p>Zīmēt trijstūri.</p>
</dd>
<dt><a href="#polygon">polygon(points, color)</a> ⇒</dt>
<dd><p>Zīmēt daudzstūri.</p>
</dd>
<dt><a href="#circle">circle(x, y, radius, color)</a> ⇒</dt>
<dd><p>Zīmēt riņķi.</p>
</dd>
<dt><a href="#elipse">elipse(x, y, width, height, color)</a> ⇒</dt>
<dd><p>Zīmēt elipsi.</p>
</dd>
<dt><a href="#image">image(x, y, url)</a> ⇒</dt>
<dd><p>Zīmēt attēlu.</p>
</dd>
<dt><a href="#onClick">onClick(g, fn)</a> ⇒ <code>PIXI.Graphics</code></dt>
<dd><p>Pievienot klikšķa notikumu grafiskajamm elementam.</p>
</dd>
<dt><a href="#move">move(g, x, y)</a> ⇒ <code>PIXI.Graphics</code></dt>
<dd><p>Pārvietot elementu uz pozīciju.</p>
</dd>
<dt><a href="#moveBy">moveBy(g, x, y)</a> ⇒ <code>PIXI.Graphics</code></dt>
<dd><p>Pārvietot elementu pa attālumu.</p>
</dd>
<dt><a href="#remove">remove(g)</a></dt>
<dd><p>Izdzēst elementu.</p>
</dd>
<dt><a href="#isCollision">isCollision(g1, g2, offset)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Pārbaudīt divu elementu sadursmi.</p>
</dd>
<dt><a href="#draggable">draggable(g)</a> ⇒ <code>PIXI.Graphics</code></dt>
<dd><p>Iespējot elementa vilkšanu.</p>
</dd>
<dt><a href="#resume">resume()</a></dt>
<dd><p>Atsākt spēles darbību.</p>
</dd>
<dt><a href="#pause">pause()</a></dt>
<dd><p>Apstādināt spēles darbību.</p>
</dd>
<dt><a href="#onKeyDown">onKeyDown(key, fn)</a></dt>
<dd><p>Pogas nospiešana uz leju.</p>
</dd>
<dt><a href="#onKeyUp">onKeyUp(key, fn)</a></dt>
<dd><p>Pogas atlaišana.</p>
</dd>
</dl>

<a name="KEY_DOWN"></a>

## KEY_DOWN : <code>Number</code>
"S" taustiņš

**Kind**: global variable  
<a name="KEY_UP"></a>

## KEY_UP : <code>Number</code>
"W" taustiņš

**Kind**: global variable  
<a name="KEY_RIGHT"></a>

## KEY_RIGHT : <code>Number</code>
"D" taustiņš

**Kind**: global variable  
<a name="KEY_LEFT"></a>

## KEY_LEFT : <code>Number</code>
"A" taustiņš

**Kind**: global variable  
<a name="KEY_SPACEBAR"></a>

## KEY_SPACEBAR : <code>Number</code>
"Spacebar" taustiņš

**Kind**: global variable  
<a name="COLOR_RED"></a>

## COLOR_RED : <code>Number</code>
Sarkana krāsa

**Kind**: global variable  
<a name="COLOR_BLUE"></a>

## COLOR_BLUE : <code>Number</code>
Zila krāsa

**Kind**: global variable  
<a name="COLOR_GREEN"></a>

## COLOR_GREEN : <code>Number</code>
Zaļa krāsa

**Kind**: global variable  
<a name="COLOR_PINK"></a>

## COLOR_PINK : <code>Number</code>
Rozā krāsa

**Kind**: global variable  
<a name="COLOR_YELLOW"></a>

## COLOR_YELLOW : <code>Number</code>
Dzeltena krāsa

**Kind**: global variable  
<a name="COLOR_WHITE"></a>

## COLOR_WHITE : <code>Number</code>
Balta krāsa

**Kind**: global variable  
<a name="COLOR_BLACK"></a>

## COLOR_BLACK : <code>Number</code>
Balta krāsa

**Kind**: global variable  
<a name="COLOR_GRAY"></a>

## COLOR_GRAY : <code>Number</code>
Pelēka krāsa

**Kind**: global variable  
<a name="COLOR_ORANGE"></a>

## COLOR_ORANGE : <code>Number</code>
Oranža krāsa

**Kind**: global variable  
<a name="COLOR_PURPLE"></a>

## COLOR_PURPLE : <code>Number</code>
Violeta krasa

**Kind**: global variable  
<a name="COLOR_BROWN"></a>

## COLOR_BROWN : <code>Number</code>
Brūna krāsa

**Kind**: global variable  
<a name="COLOR_TEAL"></a>

## COLOR_TEAL : <code>Number</code>
Teal krāsa

**Kind**: global variable  
<a name="init"></a>

## init(width, height, options)
Sākt spēli.

**Kind**: global function  

| Param | Type |
| --- | --- |
| width | <code>Number</code> | 
| height | <code>Number</code> | 
| options | <code>Object</code> | 

<a name="animate"></a>

## animate(tick)
Iestatīt animācijas funkciju, kuru izsauc ar ļoti mazu laika starpību.

**Kind**: global function  

| Param | Type |
| --- | --- |
| tick | <code>function</code> | 

<a name="text"></a>

## text(x, y, text, style) ⇒
Zīmēt tekstu.

**Kind**: global function  
**Returns**: PIXI.Text  

| Param | Type |
| --- | --- |
| x | <code>Number</code> | 
| y | <code>Number</code> | 
| text | <code>String</code> | 
| style | <code>Object</code> | 

<a name="rectangle"></a>

## rectangle(x, y, width, height, color) ⇒
Zīmēt četrstūri.

**Kind**: global function  
**Returns**: PIXI.Graphics  

| Param | Type |
| --- | --- |
| x | <code>Number</code> | 
| y | <code>Number</code> | 
| width | <code>Number</code> | 
| height | <code>Number</code> | 
| color |  | 

<a name="triangle"></a>

## triangle(x1, y1, x2, y2, x3, y3, color) ⇒
Zīmēt trijstūri.

**Kind**: global function  
**Returns**: PIXI.Graphics  

| Param | Type |
| --- | --- |
| x1 | <code>Number</code> | 
| y1 | <code>Number</code> | 
| x2 | <code>Number</code> | 
| y2 | <code>Number</code> | 
| x3 | <code>Number</code> | 
| y3 | <code>Number</code> | 
| color |  | 

<a name="polygon"></a>

## polygon(points, color) ⇒
Zīmēt daudzstūri.

**Kind**: global function  
**Returns**: PIXI.Graphics  

| Param | Type |
| --- | --- |
| points | <code>Array</code> | 
| color |  | 

<a name="circle"></a>

## circle(x, y, radius, color) ⇒
Zīmēt riņķi.

**Kind**: global function  
**Returns**: PIXI.Graphics  

| Param | Type |
| --- | --- |
| x | <code>Number</code> | 
| y | <code>Number</code> | 
| radius | <code>Number</code> | 
| color |  | 

<a name="elipse"></a>

## elipse(x, y, width, height, color) ⇒
Zīmēt elipsi.

**Kind**: global function  
**Returns**: PIXI.Graphics  

| Param | Type |
| --- | --- |
| x | <code>Number</code> | 
| y | <code>Number</code> | 
| width | <code>Number</code> | 
| height | <code>Number</code> | 
| color |  | 

<a name="image"></a>

## image(x, y, url) ⇒
Zīmēt attēlu.

**Kind**: global function  
**Returns**: PIXI.Sprite  

| Param | Type |
| --- | --- |
| x | <code>Number</code> | 
| y | <code>Number</code> | 
| url | <code>String</code> | 

<a name="onClick"></a>

## onClick(g, fn) ⇒ <code>PIXI.Graphics</code>
Pievienot klikšķa notikumu grafiskajamm elementam.

**Kind**: global function  

| Param | Type |
| --- | --- |
| g | <code>PIXI.Graphics</code> | 
| fn | <code>function</code> | 

<a name="move"></a>

## move(g, x, y) ⇒ <code>PIXI.Graphics</code>
Pārvietot elementu uz pozīciju.

**Kind**: global function  

| Param | Type |
| --- | --- |
| g | <code>PIXI.Graphics</code> | 
| x | <code>Number</code> | 
| y | <code>Number</code> | 

<a name="moveBy"></a>

## moveBy(g, x, y) ⇒ <code>PIXI.Graphics</code>
Pārvietot elementu pa attālumu.

**Kind**: global function  

| Param | Type |
| --- | --- |
| g | <code>PIXI.Graphics</code> | 
| x | <code>Number</code> | 
| y | <code>Number</code> | 

<a name="remove"></a>

## remove(g)
Izdzēst elementu.

**Kind**: global function  

| Param | Type |
| --- | --- |
| g | <code>PIXI.Graphics</code> | 

<a name="isCollision"></a>

## isCollision(g1, g2, offset) ⇒ <code>Boolean</code>
Pārbaudīt divu elementu sadursmi.

**Kind**: global function  

| Param | Type |
| --- | --- |
| g1 | <code>PIXI.Graphics</code> | 
| g2 | <code>PIXI.Graphics</code> | 
| offset | <code>Number</code> | 

<a name="draggable"></a>

## draggable(g) ⇒ <code>PIXI.Graphics</code>
Iespējot elementa vilkšanu.

**Kind**: global function  

| Param | Type |
| --- | --- |
| g | <code>PIXI.Graphics</code> | 

<a name="resume"></a>

## resume()
Atsākt spēles darbību.

**Kind**: global function  
<a name="pause"></a>

## pause()
Apstādināt spēles darbību.

**Kind**: global function  
<a name="onKeyDown"></a>

## onKeyDown(key, fn)
Pogas nospiešana uz leju.

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>Numeric</code> | 
| fn | <code>function</code> | 

<a name="onKeyUp"></a>

## onKeyUp(key, fn)
Pogas atlaišana.

**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>Numeric</code> | 
| fn | <code>function</code> | 

