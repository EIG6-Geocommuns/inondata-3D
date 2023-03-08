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
edit src/index.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
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
wincmd w
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
2wincmd k
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
exe '1resize ' . ((&lines * 16 + 28) / 56)
exe 'vert 1resize ' . ((&columns * 106 + 114) / 229)
exe '2resize ' . ((&lines * 3 + 28) / 56)
exe 'vert 2resize ' . ((&columns * 106 + 114) / 229)
exe '3resize ' . ((&lines * 16 + 28) / 56)
exe 'vert 3resize ' . ((&columns * 106 + 114) / 229)
exe '4resize ' . ((&lines * 16 + 28) / 56)
exe 'vert 4resize ' . ((&columns * 106 + 114) / 229)
exe '5resize ' . ((&lines * 17 + 28) / 56)
exe 'vert 5resize ' . ((&columns * 122 + 114) / 229)
exe '6resize ' . ((&lines * 18 + 28) / 56)
exe 'vert 6resize ' . ((&columns * 122 + 114) / 229)
exe '7resize ' . ((&lines * 17 + 28) / 56)
exe 'vert 7resize ' . ((&columns * 122 + 114) / 229)
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
let s:l = 1 - ((0 * winheight(0) + 8) / 16)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 0
wincmd w
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
if bufexists("src/Layers/WaterLayer.ts") | buffer src/Layers/WaterLayer.ts | else | edit src/Layers/WaterLayer.ts | endif
if &buftype ==# 'terminal'
  silent file src/Layers/WaterLayer.ts
endif
balt ~/code/inondata-3D/node_modules/itowns/lib/Layer/LayerUpdateState.d.ts
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
let s:l = 141 - ((10 * winheight(0) + 8) / 16)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 141
normal! 037|
wincmd w
argglobal
if bufexists("src/index.ts") | buffer src/index.ts | else | edit src/index.ts | endif
if &buftype ==# 'terminal'
  silent file src/index.ts
endif
balt node_modules/itowns/lib/Core/TileMesh.d.ts
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
let s:l = 45 - ((0 * winheight(0) + 8) / 16)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 45
normal! 023|
wincmd w
argglobal
if bufexists("~/code/itowns/src/Renderer/Shader/Chunk/elevation_pars_vertex.glsl") | buffer ~/code/itowns/src/Renderer/Shader/Chunk/elevation_pars_vertex.glsl | else | edit ~/code/itowns/src/Renderer/Shader/Chunk/elevation_pars_vertex.glsl | endif
if &buftype ==# 'terminal'
  silent file ~/code/itowns/src/Renderer/Shader/Chunk/elevation_pars_vertex.glsl
endif
balt ~/code/itowns/src/Renderer/Shader/Chunk/elevation_vertex.glsl
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
let s:l = 28 - ((7 * winheight(0) + 8) / 17)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 28
normal! 021|
wincmd w
argglobal
if bufexists("~/code/itowns/src/Renderer/Shader/Chunk/elevation_pars_vertex.glsl") | buffer ~/code/itowns/src/Renderer/Shader/Chunk/elevation_pars_vertex.glsl | else | edit ~/code/itowns/src/Renderer/Shader/Chunk/elevation_pars_vertex.glsl | endif
if &buftype ==# 'terminal'
  silent file ~/code/itowns/src/Renderer/Shader/Chunk/elevation_pars_vertex.glsl
endif
balt ~/code/itowns/src/Renderer/Shader/TileVS.glsl
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
let s:l = 14 - ((13 * winheight(0) + 9) / 18)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 14
normal! 016|
wincmd w
argglobal
if bufexists("~/code/itowns/src/Renderer/Shader/TileVS.glsl") | buffer ~/code/itowns/src/Renderer/Shader/TileVS.glsl | else | edit ~/code/itowns/src/Renderer/Shader/TileVS.glsl | endif
if &buftype ==# 'terminal'
  silent file ~/code/itowns/src/Renderer/Shader/TileVS.glsl
endif
balt ~/code/itowns/src/Renderer/Shader/Chunk/elevation_vertex.glsl
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
let s:l = 27 - ((7 * winheight(0) + 8) / 17)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 27
normal! 022|
wincmd w
3wincmd w
exe '1resize ' . ((&lines * 16 + 28) / 56)
exe 'vert 1resize ' . ((&columns * 106 + 114) / 229)
exe '2resize ' . ((&lines * 3 + 28) / 56)
exe 'vert 2resize ' . ((&columns * 106 + 114) / 229)
exe '3resize ' . ((&lines * 16 + 28) / 56)
exe 'vert 3resize ' . ((&columns * 106 + 114) / 229)
exe '4resize ' . ((&lines * 16 + 28) / 56)
exe 'vert 4resize ' . ((&columns * 106 + 114) / 229)
exe '5resize ' . ((&lines * 17 + 28) / 56)
exe 'vert 5resize ' . ((&columns * 122 + 114) / 229)
exe '6resize ' . ((&lines * 18 + 28) / 56)
exe 'vert 6resize ' . ((&columns * 122 + 114) / 229)
exe '7resize ' . ((&lines * 17 + 28) / 56)
exe 'vert 7resize ' . ((&columns * 122 + 114) / 229)
tabnext 1
badd +140 src/Layers/WaterLayer.ts
badd +0 src/index.ts
badd +15 ~/code/inondata-3D/node_modules/itowns/lib/Layer/LayerUpdateState.d.ts
badd +21 node_modules/itowns/lib/Core/TileMesh.d.ts
badd +21 ~/code/itowns/src/Layer/GeometryLayer.js
badd +562 ~/code/itowns/src/Converter/Feature2Mesh.js
badd +0 ~/code/itowns/src/Layer/FeatureGeometryLayer.js
badd +19 ~/code/itowns/src/Core/TileMesh.js
badd +12 ~/code/itowns/src/Process/FeatureProcessing.js
badd +16 node_modules/itowns/lib/Layer/GeometryLayer.d.ts
badd +210 ~/code/itowns/src/Layer/Layer.js
badd +386 ~/code/itowns/src/Core/View.js
badd +8 tsconfig.json
badd +20 ~/code/itowns/src/Main.js
badd +1 ~/code/inondata-3D/node_modules/itowns/lib/Main.d.ts
badd +6 ~/code/inondata-3D/node_modules/@types/three/src/materials/ShaderMaterial.d.ts
badd +5 ~/code/itowns/src/Layer/ReferencingLayerProperties.js
badd +16 src/GUI/DatTools.ts
badd +431 ~/code/itowns/src/Layer/TiledGeometryLayer.js
badd +179 ~/code/itowns/src/Process/LayeredMaterialNodeProcessing.js
badd +3 ~/code/itowns/src/Renderer/LayeredMaterial.js
badd +4 ~/code/itowns/src/Renderer/Shader/TileVS.glsl
badd +4 ~/code/itowns/src/Renderer/Shader/Chunk/elevation_vertex.glsl
badd +0 ~/code/itowns/src/Renderer/Shader/Chunk/elevation_pars_vertex.glsl
badd +1 ~/code/itowns/src/Renderer/Shader/Chunk/geoid_vertex.glsl
badd +1 ~/code/itowns/src/Renderer/Shader/Chunk/project_pars_vertex.glsl
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
