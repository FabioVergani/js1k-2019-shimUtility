(d=>{
	let f=(a,b,c)=>{const e=a.appendChild(d.createElement(b));e.id=b;if(c){e.setAttribute('style',c)};return e},
	x='margin:0;padding:0;border:0;';
	//
	const w=d.defaultView,
	Iframe=f(d.body,'iframe'),
	iWin=Iframe.contentWindow,
	iDoc=iWin.d=iWin.document,
	Html=f(d.createDocumentFragment(),'html',TOKEN_CANVAS_SHIM?x+'width:100%;height:100%;':x);
	f((x=f(Html,'body',x)),'canvas','display:block;'+(TOKEN_CENTER_CANVAS?'margin:auto;':'')),
	f(x,'script');
	x=null;
	//
	w.addEventListener('resize',f=()=>{w.location.reload()});//todo:debounce
	d.getElementById('reload').addEventListener('click',f);
	if(TOKEN_RELOAD_ONORIENTATIONCHANGE){w.addEventListener('orientationchange',f)};
	f=null;
	//
	with(Iframe.contentWindow){
		AudioContext=AudioContext||webkitAudioContext;
		requestAnimationFrame=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame||(f=>{setTimeout(f,33)});
		if(OscillatorNode){with(OscillatorNode.prototype){start=start||noteOn;stop=stop||noteOff}};
		with(navigator){getUserMedia=getUserMedia||webkitGetUserMedia||mozGetUserMedia||msGetUserMedia}
	};
	//
	iDoc.firstElementChild.replaceWith(Html.cloneNode(true));
	//
	iWin.b=iDoc.body;
	//
	if(TOKEN_CANVAS_SHIM){
		const M=Math,Max=M.max,Min=M.min,a=TOKEN_MAX_WIDTH,b=TOKEN_MAX_HEIGHT,canvas=iWin.a=iDoc.getElementById('canvas');
		canvas.requestPointerLock=canvas.requestPointerLock||canvas.mozRequestPointerLock||canvas.webkitRequestPointerLock;
		let r=iWin.innerWidth,l=Max(Min(a||r,r),1),x=canvas.style;
		r=iWin.innerHeight-50;
		r=Max(Min(b||r,r),1);
		if(TOKEN_LOCK_RATIO){if(l<a){r=l/a*b}else if(r<b){l=r/b*a}};
		x.width=(canvas.width=l)+'px';
		x.height=(canvas.height=r)+'px';
		if(TOKEN_WEBGL){
			x=Iframe.init;
			iWin.removeEventListener('orientationchange',x);
			iWin.removeEventListener('resize',x);
			try{
				x={antialias:true,stencil:true};
				x=iWin.g=canvas.getContext('webgl',x)||canvas.getContext('experimental-webgl',x);
				iWin.__glExts=['OES_texture_float','OES_texture_float_linear','OES_standard_derivatives','EXT_texture_filter_anisotropic','MOZ_EXT_texture_filter_anisotropic','WEBKIT_EXT_texture_filter_anisotropic','WEBGL_compressed_texture_s3tc','MOZ_WEBGL_compressed_texture_s3tc','WEBKIT_WEBGL_compressed_texture_s3tc'].map(s=>x.getExtension(s))
			}catch(noWebGL){
				iWin.a=iWin.b=iWin.c=iWin.d=iWin.g=null;
				throw noWebGL
			}
		}else{
			iWin.c=canvas.getContext('2d');
		}
	};
	//
	x=w.location.search;
	if(x.length){
		x=new iWin.URLSearchParams(x).get('n');
		if(x.length){x+='.js'}else{x='empty.js'}
	}else{
		x='empty.js'
	};
	(iWin.theScript=iDoc.getElementById('script')).src=x;
	x=null;
})(document);