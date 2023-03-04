let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/code/inondata-3D
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
$argadd src/index.ts
edit node_modules/itowns/lib/Core/TileMesh.d.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
3wincmd k
wincmd w
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 1 + 28) / 56)
exe 'vert 1resize ' . ((&columns * 106 + 114) / 229)
exe '2resize ' . ((&lines * 52 + 28) / 56)
exe 'vert 2resize ' . ((&columns * 106 + 114) / 229)
exe '3resize ' . ((&lines * 1 + 28) / 56)
exe 'vert 3resize ' . ((&columns * 122 + 114) / 229)
exe '4resize ' . ((&lines * 1 + 28) / 56)
exe 'vert 4resize ' . ((&columns * 122 + 114) / 229)
exe '5resize ' . ((&lines * 46 + 28) / 56)
exe 'vert 5resize ' . ((&columns * 122 + 114) / 229)
exe '6resize ' . ((&lines * 3 + 28) / 56)
exe 'vert 6resize ' . ((&columns * 122 + 114) / 229)
argglobal
enew
balt src/Layers/WaterLayer.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
wincmd w
argglobal
balt src/Layers/WaterLayer.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 39 - ((34 * winheight(0) + 26) / 52)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 39
normal! 0
wincmd w
argglobal
if bufexists("~/code/itowns/src/Layer/GeometryLayer.js") | buffer ~/code/itowns/src/Layer/GeometryLayer.js | else | edit ~/code/itowns/src/Layer/GeometryLayer.js | endif
if &buftype ==# 'terminal'
  silent file ~/code/itowns/src/Layer/GeometryLayer.js
endif
balt src/Layers/WaterLayer.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 48 - ((0 * winheight(0) + 0) / 1)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 48
normal! 047|
wincmd w
argglobal
if bufexists("~/code/itowns/src/Core/TileMesh.js") | buffer ~/code/itowns/src/Core/TileMesh.js | else | edit ~/code/itowns/src/Core/TileMesh.js | endif
if &buftype ==# 'terminal'
  silent file ~/code/itowns/src/Core/TileMesh.js
endif
balt ~/code/itowns/src/Process/FeatureProcessing.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 40 - ((0 * winheight(0) + 0) / 1)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 40
normal! 038|
wincmd w
argglobal
if bufexists("~/code/itowns/src/Process/FeatureProcessing.js") | buffer ~/code/itowns/src/Process/FeatureProcessing.js | else | edit ~/code/itowns/src/Process/FeatureProcessing.js | endif
if &buftype ==# 'terminal'
  silent file ~/code/itowns/src/Process/FeatureProcessing.js
endif
balt ~/code/itowns/src/Layer/LayerUpdateState.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 59 - ((20 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 59
normal! 030|
wincmd w
argglobal
if bufexists("~/code/itowns/src/Core/TileMesh.js") | buffer ~/code/itowns/src/Core/TileMesh.js | else | edit ~/code/itowns/src/Core/TileMesh.js | endif
if &buftype ==# 'terminal'
  silent file ~/code/itowns/src/Core/TileMesh.js
endif
balt ~/code/itowns/src/Process/FeatureProcessing.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 50 - ((1 * winheight(0) + 1) / 3)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 50
normal! 014|
wincmd w
2wincmd w
exe '1resize ' . ((&lines * 1 + 28) / 56)
exe 'vert 1resize ' . ((&columns * 106 + 114) / 229)
exe '2resize ' . ((&lines * 52 + 28) / 56)
exe 'vert 2resize ' . ((&columns * 106 + 114) / 229)
exe '3resize ' . ((&lines * 1 + 28) / 56)
exe 'vert 3resize ' . ((&columns * 122 + 114) / 229)
exe '4resize ' . ((&lines * 1 + 28) / 56)
exe 'vert 4resize ' . ((&columns * 122 + 114) / 229)
exe '5resize ' . ((&lines * 46 + 28) / 56)
exe 'vert 5resize ' . ((&columns * 122 + 114) / 229)
exe '6resize ' . ((&lines * 3 + 28) / 56)
exe 'vert 6resize ' . ((&columns * 122 + 114) / 229)
tabnext 1
badd +54 src/index.ts
badd +16 node_modules/itowns/lib/Layer/GeometryLayer.d.ts
badd +1 ~/code/itowns/src/Core/TileMesh.js
badd +49 ~/code/itowns/src/Layer/FeatureGeometryLayer.js
badd +115 ~/code/itowns/src/Layer/GeometryLayer.js
badd +110 ~/code/itowns/src/Layer/Layer.js
badd +97 src/Layers/WaterLayer.ts
badd +15 ~/code/itowns/src/Layer/PotreeLayer.js
badd +186 ~/code/itowns/src/Layer/PointCloudLayer.js
badd +9 ~/code/itowns/src/Layer/LayerUpdateStrategy.js
badd +18 ~/code/itowns/src/Layer/InfoLayer.js
badd +386 ~/code/itowns/src/Core/View.js
badd +5 src/Layers/index.ts
badd +8 tsconfig.json
badd +100 ~/code/itowns/src/Source/FileSource.js
badd +20 ~/code/itowns/src/Process/FeatureProcessing.js
badd +20 ~/code/itowns/src/Process/ObjectRemovalHelper.js
badd +12 ~/code/itowns/src/Layer/LayerUpdateState.js
badd +20 ~/code/itowns/src/Main.js
badd +1 ~/code/inondata-3D/node_modules/itowns/lib/Main.d.ts
badd +6 ~/code/inondata-3D/node_modules/@types/three/src/materials/ShaderMaterial.d.ts
badd +0 node_modules/itowns/lib/Core/TileMesh.d.ts
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOF
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
